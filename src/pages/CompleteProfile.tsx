// SOMEONE STYLE
// in future: add quiz/survey to sort the oppurtunities properly for them
// ZIP CODE?
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { profilePictures } from "../assets/ProfilePictures";

const INTEREST_AREAS = [
    "Teaching",
    "Mentoring",
    "Cleanup",
    "Environmental Conservation",
    "Food",
    "Animal Care",
    "Community Support",
    "Health",
    "Arts and Culture",
    "Fundraising",
    "Administrative",
    "Event Support",
    "Advocacy",
    "Other",
];


function CompleteProfile() {
    const { user } = useAuth();
    const nav = useNavigate();

    const [displayName, setDisplayName] = useState("");
    const [selectedPicture, setSelectedPicutre] = useState(0);
    const [zipCode, setZipCode] = useState("");
    const [interestAreas, setInterestAreas] = useState<string[]>([]);

    const toggleInterest = (interest: string) => {
        setInterestAreas((selected) =>
            selected.includes(interest)
                ? selected.filter((area) => area !== interest)
                : [...selected, interest]
        );
    };

    const handleSubmit = async (e:React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;

        await updateDoc(doc(db, "users", user.uid), {
            displayName,
            pfpChoice: selectedPicture,
            completedSignup: true,
            zip: zipCode,
            interestAreas,
        });
        nav('/dashboard');
    };

    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[url(src/assets/blueBg.jpg)] bg-cover bg-center px-4 py-10">
            <h1 className="mb-2 text-center text-4xl font-bold text-[#020079] sm:text-5xl">
                Complete your profile
            </h1>
            <p className="mb-6 text-center text-sm text-[#020079] sm:text-base">
                Tell us a little about yourself to find volunteer opportunities near you.
            </p>
            <form onSubmit={handleSubmit} className="w-full max-w-5xl">
                <div className="grid items-stretch gap-5 md:grid-cols-2">
                <section className="h-full rounded-2xl border border-white/70 bg-white/90 p-6 shadow-xl backdrop-blur-sm sm:p-8">
                <div className="flex flex-col gap-2">
                    <label htmlFor="displayName" className="text-sm font-medium text-[#020079]">
                        Display name
                    </label>
                    <input
                        id="displayName"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        autoComplete="nickname"
                        required
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#6d8196] focus:ring-1 focus:ring-[#6d8196]"
                    />
                </div>
                <div className="mt-4 flex flex-col gap-2">
                    <label htmlFor="zipCode" className="text-sm font-medium text-[#020079]">
                        ZIP code
                    </label>
                    <input
                        id="zipCode"
                        type="text"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="e.g. 07834"
                        maxLength={5}
                        pattern="[0-9]{5}"
                        required
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#6d8196] focus:ring-1 focus:ring-[#6d8196]"
                    />
                </div>
                <fieldset className="mt-5">
                    <legend className="mb-3 text-sm font-medium text-[#020079]">
                        Choose a profile picture
                    </legend>
                    <div className="flex flex-wrap gap-3">
                        {profilePictures.map((src, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setSelectedPicutre(index)}
                                aria-label={`Choose profile picture ${index + 1}`}
                                aria-pressed={selectedPicture === index}
                                className={`h-16 w-16 overflow-hidden rounded-full transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#020079]/50 focus-visible:ring-offset-2 ${
                                    selectedPicture === index
                                        ? "ring-4 ring-[#020079] ring-offset-2"
                                        : "opacity-75 hover:opacity-100"
                                }`}
                            >
                                <img
                                    src={src}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </fieldset>
                </section>

                <section className="h-full rounded-2xl border border-white/70 bg-white/90 p-6 shadow-xl backdrop-blur-sm sm:p-8">
                    <fieldset>
                        <legend className="text-lg font-semibold text-[#020079]">
                            Pick your interest areas
                        </legend>
                        <p className="mb-4 mt-1 text-sm text-gray-600">
                            Select the kinds of volunteering you’re interested in.
                        </p>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {INTEREST_AREAS.map((interest) => {
                                const checked = interestAreas.includes(interest);
                                return (
                                    <label
                                        key={interest}
                                        className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                                            checked
                                                ? "border-[#020079] bg-[#020079]/5 text-[#020079]"
                                                : "border-gray-200 bg-white text-gray-700 hover:border-[#6d8196]"
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => toggleInterest(interest)}
                                            className="h-4 w-4 accent-[#020079]"
                                        />
                                        {interest}
                                    </label>
                                );
                            })}
                        </div>
                    </fieldset>
                </section>
                </div>
                <button
                    type="submit"
                    className="mx-auto mt-6 block w-full max-w-md cursor-pointer rounded-full bg-[#020079] px-4 py-2.5 font-medium text-[#ffffe3] transition-colors hover:bg-[#4300ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#020079] focus-visible:ring-offset-2"
                >
                    Save profile
                </button>
            </form>
        </main>
    );
}

export default CompleteProfile;
