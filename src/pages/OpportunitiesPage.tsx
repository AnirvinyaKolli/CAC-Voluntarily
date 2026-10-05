import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
let workType = {
    comp: "ComputerScience",
    mat: "MatthewWatching",
    health: "Healthcare",
    anim: "AnimalScience",
    cook: "Culinary"};

class volunteerData {
    public locationName = "";
    public description = "";
    public types: string[] = [];
    public location = "";
    public daysAvailable = "";
    public ageRange = "";
}

function Dashboard() {
    const { user } = useAuth();
    const [data, setData] = useState<volunteerData[]>([]);
    useEffect(() => {
        async function getOpportunities() {
            try {
                if (!user) return;
                const userSnapshot = await getDoc(
                    doc(db, "users", user.uid)
                );
                if (!userSnapshot.exists()) return;
                const userData = userSnapshot.data();
                const userZip = userData.zip;
                const querySnapshot = await getDocs(
                    collection(db, "opportunities")
                );
                const opportunities: volunteerData[] = [];
                querySnapshot.forEach((doc) => {
                    const firebaseData = doc.data();
                    const zipcodes = firebaseData.zipcodes || [];
                    if (!zipcodes.includes(userZip)) {
                        return;
                    }
                    const volunteer = new volunteerData();
                    volunteer.locationName = firebaseData.name || "";
                    volunteer.types = firebaseData.type
                        ? [firebaseData.type]
                        : [];
                    volunteer.location = firebaseData.location || "";
                    volunteer.daysAvailable = firebaseData.daysAvailable || "";
                    volunteer.ageRange = firebaseData.ageRange || "";
                    volunteer.description =
                        `${firebaseData.type || "Volunteer opportunity"}\n` +
                        `Location: ${firebaseData.location || "N/A"}\n` +
                        `Availability: ${firebaseData.daysAvailable || "N/A"}\n` +
                        `Age: ${firebaseData.ageRange || "N/A"}`;

                    opportunities.push(volunteer);
                });
                setData(opportunities);
            } catch (error) {
                console.error("Error getting opportunities:", error);
            }
        }

        getOpportunities();
    }, [user]);

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