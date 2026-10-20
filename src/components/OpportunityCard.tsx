import { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { type OpportunityData } from "../OpportunityData";
import CompatibilityDial from "./CompatibilityDial";

interface OpportunityCardProps {
  opportunity: OpportunityData;
}

function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const { user } = useAuth();
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const compatibilityPercent = Math.round(opportunity.compatibilityScore * 100);
  console.log('Compatibility percent for opportunity', opportunity.id, ':', compatibilityPercent);
  const handleSignUp = async () => {
    if (!user) return;
    setStatus("saving");
    try {
      await updateDoc(doc(db, "users", user.uid), {
        opportunitiesSignedUp: arrayUnion(opportunity.id),
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <article className="flex h-full flex-col rounded-lg bg-white p-5 shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-900">
          {opportunity.locationName}
        </h2>
        <CompatibilityDial score={compatibilityPercent} />
      </div>
      <p className="whitespace-pre-line text-gray-600">
        {opportunity.description}
      </p>
      <div className="mt-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-700">Work types</h3>
        <div className="flex flex-wrap gap-2">
          {opportunity.types.map((type: string) => (
            <span
              key={type}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={handleSignUp}
        disabled={status === "saving"}
        className="mt-auto w-full rounded-lg bg-[#020079] px-4 py-2 text-[#ffffe3] transition-colors duration-200 hover:bg-[#0021f3] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "saving" && "Signing up..."}
        {status === "error" && "Error, try again"}
        {status === "idle" && "Sign up"}
      </button>
    </article>
  );
}

export default OpportunityCard;
