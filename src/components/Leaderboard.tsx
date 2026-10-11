//made this to add if we have time or feel like adding a display. idk 

import { useEffect, useState } from "react";
import type { UserData } from "../UserData";
import { db } from "../firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { profilePictures } from "../assets/ProfilePictures";

function Leaderboard() {
    const [leaders, setLeaders] = useState<UserData[]>([]);

    useEffect(() => {
        const fetchLeaders = async () => {
            const leadersSnap = await getDocs(
                query(
                    collection(db, "users"),
                    orderBy("totalHours", "desc"),
                    limit(3)
                )
            );
            setLeaders(
                leadersSnap.docs.map((d) => ({
                    uid: d.id,
                    email: d.data().email,
                    totalHours: d.data().totalHours,
                    completedSignup: d.data().completedSignup,
                    displayName: d.data().displayName,
                    pfpChoice: d.data().pfpChoice,
                    zip: d.data().zip
                }))
            );
        };
        fetchLeaders();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
            <ul className="w-full max-w-md space-y-4">
                {leaders.map((leader, index) => (
                    <li
                        key={leader.uid}
                        className="flex items-center gap-4 rounded-lg bg-gray-100 p-4 shadow-md"
                    >
                        <span className="text-lg font-semibold text-gray-900">{index + 1}.</span>
                        <img
                            src={leader.pfpChoice ? profilePictures[leader.pfpChoice] : profilePictures[0]}
                            alt="Profile"
                            className="h-10 w-10 rounded-full"
                        />
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold text-gray-900">{leader.displayName}</span>
                            <span className="text-sm text-gray-600">{leader.totalHours} hours</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Leaderboard;