import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, setDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useUserData } from "../context/UserDataContext";
import EllipseLoader from "../components/EllipsesLoading";
import type { OpportunityData } from "../OpportunityData";

let workType = {
    comp: "ComputerScience",
    mat: "MatthewWatching",
    health: "Healthcare",
    anim: "AnimalScience",
    cook: "Culinary"
};


function Dashboard() {
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
                    ageRange: firebaseData.ageRange || ""
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
                    <article
                        key={volunteer.locationName}
                        className="rounded-lg bg-white p-5 shadow-md"
                    >
                        <h2 className="mb-3 text-xl font-bold text-gray-900">
                            {volunteer.locationName}
                        </h2>

                        <p className="whitespace-pre-line text-gray-600">
                            {volunteer.description}
                        </p>

                        <div className="mt-4">
                            <h3 className="mb-2 text-sm font-semibold text-gray-700">Work types</h3>
                            <div className="flex flex-wrap gap-2">
                                {volunteer.types.map((type) => (
                                    <span
                                        key={type}
                                        className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}

            </div>
        </main>
    );
}

export default Dashboard;