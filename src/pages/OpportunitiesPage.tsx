import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, setDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useUserData } from "../context/UserDataContext";
import EllipseLoader from "../components/EllipsesLoading";
import type { OpportunityData } from "../OpportunityData";
import OpportunityCard from "../components/OpportunityCard";
import { distanceInKm } from "../data/nearbyZipCodes";
import { getCompatibilityScore } from "../compatablityScore";
import blueBackground from "../assets/blueBg.jpg";

function OpportunitesPage() {
    const { user , loading} = useAuth();
    const [data, setData] = useState<OpportunityData[]>([]);
    const [opportunitiesLoading, setOpportunitiesLoading] = useState(true);
    const {userData, loading: userDataLoading} = useUserData();

    useEffect(() => {
        async function getOpportunities() {
            if (!userData || !user) {
                setOpportunitiesLoading(false);
                return;
            }

            setOpportunitiesLoading(true);
            const userZip = userData.zip.trim().padStart(5, "0");
            const unavailableIds = new Set([
                ...(userData.opportunitiesSignedUp ?? []),
                ...(userData.opportunitiesCompleted ?? []).map((event) =>
                    typeof event === "string" ? event : event.opportunityId
                ),
            ]);
            const opportunities: OpportunityData[] = [];

            const querySnapshot = await getDocs(query(
                collection(db, "opportunities"),
                where("zipcodes", "array-contains", userZip)
            ));
            if (querySnapshot.empty) {
                const queuedZip = doc(db, "zipcodesForScrapeying", userZip);
                    if (!(await getDoc(queuedZip)).exists()) {
                        await setDoc(queuedZip, { zip: userZip, status: "queued" });
                    } else if ((await getDoc(queuedZip)).data()?.status === "available") {
                        setData([]); // If the zip code is available but empty, no opps exist
                        return; 
                    }
            }

            querySnapshot.forEach((opportunityDoc) => {
                if (unavailableIds.has(opportunityDoc.id)) return;

                const firebaseData = opportunityDoc.data();
                const opportunityZip: string = firebaseData.locationZipcode;;
                const distance = distanceInKm(userZip, opportunityZip);
                console.log('Opportunity zip:', opportunityZip, 'User zip:', userZip, 'Distance:', distance);
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
                    compatibilityScore: getCompatibilityScore(distance),
                });
            });
            setData([...new Map(opportunities.map((opportunity) => [opportunity.id, opportunity])).values()]
                .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
            );
            setOpportunitiesLoading(false);
        }
        getOpportunities();
    }, [user, userData]);

    if (loading || userDataLoading) {
        return <EllipseLoader></EllipseLoader>;
    }
    if (opportunitiesLoading) {
        return <EllipseLoader></EllipseLoader>;
    }

    if (data.length === 0) {
        return (
            <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-gray-100 px-6 text-center">
                <img src={blueBackground} alt="" aria-hidden="true" className="fixed inset-0 -z-10 h-screen w-screen object-cover saturate-75 opacity-30" />
                <p className="text-lg text-[#020079]">No opportunities are available for your area right now.</p>
            </main>
        );
    }

    return (
        <main className="relative isolate min-h-screen overflow-hidden bg-gray-100 p-6 sm:p-8 lg:p-10">
            <img src={blueBackground} alt="" aria-hidden="true" className="fixed inset-0 -z-10 h-screen w-screen object-cover saturate-75 opacity-30" />
            <h1 className="mx-auto mb-7 max-w-7xl text-center text-3xl font-bold text-[#020079] sm:text-4xl">
                Volunteer Opportunities Near You
            </h1>
            <div className="mx-auto max-w-7xl rounded-3xl bg-gray-200/95 p-5 shadow-sm sm:p-8 lg:p-10">
                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

                    {data.map((volunteer) => (
                        <OpportunityCard key={volunteer.id} opportunity={volunteer}/>
                    ))}

                </div>
            </div>
        </main>
    );
}

export default OpportunitesPage;
