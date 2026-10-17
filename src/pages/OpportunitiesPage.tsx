import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, setDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useUserData } from "../context/UserDataContext";
import EllipseLoader from "../components/EllipsesLoading";
import type { OpportunityData } from "../OpportunityData";
import OpportunityCard from "../components/OpportunityCard";
import { distanceInKm } from "../data/nearbyZipCodes";

function OpportunitesPage() {
    const { user , loading} = useAuth();
    const [data, setData] = useState<OpportunityData[]>([]);
    const {userData, loading: userDataLoading} = useUserData();

    useEffect(() => {
        async function getOpportunities() {
            if (!userData || !user) return;

            const userZip = userData.zip.trim().padStart(5, "0");
            const signedUpIds = new Set(userData.opportunitiesSignedUp ?? []);
            const opportunities: OpportunityData[] = [];

            const querySnapshot = await getDocs(query(
                collection(db, "opportunities"),
            where("zipcodes", "array-contains", userZip)
            ));
            if (querySnapshot.empty) {
            const queuedZip = doc(db, "zipcodesForScrapeying", userZip);
                if (!(await getDoc(queuedZip)).exists()) {
                await setDoc(queuedZip, { zip: userZip });
                }
            }

            querySnapshot.forEach((opportunityDoc) => {
                if (signedUpIds.has(opportunityDoc.id)) return;

                const firebaseData = opportunityDoc.data();
                const opportunityZips: string[] = Array.isArray(firebaseData.zipcodes)
                    ? firebaseData.zipcodes
                    : [userZip];
                const distance = Math.min(
                    ...opportunityZips.map((zip) => distanceInKm(userZip, String(zip).trim().padStart(5, "0")))
                );
                opportunities.push({
                    locationName: firebaseData.name || "",
                    description:
                        `${firebaseData.type || "Volunteer opportunity"}\n` +
                        `Location: ${firebaseData.location || "N/A"}\n` +
                        `Availability: ${firebaseData.daysAvailable || "N/A"}\n` +
                        `Age: ${firebaseData.ageRange || "N/A"}`,
                        types: firebaseData.type ? [firebaseData.type] : [],
                    location: firebaseData.location || "",
                    daysAvailable: firebaseData.daysAvailable || "",
                    ageRange: firebaseData.ageRange || "",
                    id: opportunityDoc.id,
                    distance: distance,
                });
            });
        setData([...new Map(opportunities.map((opportunity) => [opportunity.id, opportunity])).values()]);
    }

    getOpportunities();
}, [user, userData]);

    if (loading || userDataLoading) {
        return <EllipseLoader></EllipseLoader>;
    }
    if (data.length === 0) {
        return <EllipseLoader></EllipseLoader>;
    }

    return (
        <main className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {data.map((volunteer) => (
                    <OpportunityCard key={volunteer.id} opportunity={volunteer}/>
                ))}

            </div>
        </main>
    );
}

export default OpportunitesPage;
