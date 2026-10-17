import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, setDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useUserData } from "../context/UserDataContext";
import EllipseLoader from "../components/EllipsesLoading";
import type { OpportunityData } from "../OpportunityData";
import OpportunityCard from "../components/OpportunityCard";

let workType = {
    comp: "ComputerScience",
    mat: "MatthewWatching",
    health: "Healthcare",
    anim: "AnimalScience",
    cook: "Culinary"
};


function OpportunitesPage() {
    const { user , loading} = useAuth();
    const [data, setData] = useState<OpportunityData[]>([]);
    const {userData, loading: userDataLoading} = useUserData();

    useEffect(() => {
        async function getOpportunities() {
            if (!userData || !user) return;

            //Instead of filtering on ur browser it just only collects the ones with the zip code. 
            const q = query(
                collection(db, "opportunities"),
                where("zipcodes", "array-contains", userData.zip)
            )
            const querySnapshot = await getDocs(q);

            const opportunities: OpportunityData[] = [];
            querySnapshot.forEach((doc) => {
                const firebaseData = doc.data();
                const volunteer : OpportunityData = {
                    locationName: firebaseData.name || "",
                    description: "",
                    types: firebaseData.type ? [firebaseData.type] : [],
                    location: firebaseData.location || "",
                    daysAvailable: firebaseData.daysAvailable || "",
                    ageRange: firebaseData.ageRange || "",
                    id: doc.id
                };
                //changed from class to an actual ts type. 
                volunteer.description =
                    `${firebaseData.type || "Volunteer opportunity"}\n` +
                    `Location: ${firebaseData.location || "N/A"}\n` +
                    `Availability: ${firebaseData.daysAvailable || "N/A"}\n` +
                    `Age: ${firebaseData.ageRange || "N/A"}`;
                    opportunities.push(volunteer);
            });

            setData(opportunities);

             if (opportunities.length === 0 && userData.zip) {
                const zipcodeDoc = await getDoc(
                    doc(db, "zipcodesForScrapeying", userData.zip)
                );
                if (!zipcodeDoc.exists()) {
                    await setDoc(
                        doc(db, "zipcodesForScrapeying", userData.zip),
                        {
                            zip: userData.zip
                        }
                    );
                }
            }
        }

        getOpportunities();
    }, [user]);

    if (loading || userDataLoading) return <EllipseLoader></EllipseLoader>;
    if (data.length === 0) return <EllipseLoader></EllipseLoader>;

    return (
        <main className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {data.map((volunteer) => (
                    <OpportunityCard opportunity={volunteer}/>
                ))}

            </div>
        </main>
    );
}

export default OpportunitesPage;