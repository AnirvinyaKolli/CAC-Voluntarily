// SOMEONE STYLE
// in future: add quiz/survey to sort the oppurtunities properly for them
// ZIP CODE?
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { profilePictures } from "../assets/ProfilePictures";


function CompleteProfile() {
    const { user } = useAuth();
    const nav = useNavigate();

    const [displayName, setDisplayName] = useState("");
    const [selectedPicture, setSelectedPicutre] = useState(0);

    const handleSubmit = async (e:React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;

        await updateDoc(doc(db, "users", user.uid), {
            displayName,
            pfpChoice: 0,
            completedSignup: true,
            zip: "00000"
        });
        console.log("Extra data finsiehd");
        nav('/dashboard');
    };

    return (
        <>
            <p>Hi! gathering more data~</p>
            <form onSubmit={handleSubmit}>
                <label>Enter display name: </label>
                <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />

                <p className="mt-4 mb-2">Pick a profile picture:</p>
                <div className="flex flex-wrap gap-3">
                    {profilePictures.map((src, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setSelectedPicutre(index)}
                            className={`h-16 w-16 overflow-hidden rounded-full transition ${
                                selectedPicture === index
                                    ? "ring-4 ring-[#6d8196] ring-offset-2"
                                    : "opacity-70 hover:opacity-100"
                            }`}
                        >
                            <img
                                src={src}
                                alt={`Avatar option ${index}`}
                                className="h-full w-full object-cover"
                            />
                        </button>
                    ))}
                </div>


                <input type="submit" className="mt-4" />
            </form>
        </>
    );
}

export default CompleteProfile;