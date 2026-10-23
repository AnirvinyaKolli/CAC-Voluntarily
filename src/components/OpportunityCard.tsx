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
    <article className="flex h-full flex-col rounded-2xl border border-[#020079]/10 bg-white p-5 shadow-md sm:p-6">
      <div className="flex min-h-24 items-start justify-between gap-3 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold leading-snug text-gray-900">
          {opportunity.locationName}
        </h2>
        <CompatibilityDial score={compatibilityPercent} />
      </div>
      <section className="min-h-28 border-b border-gray-100 py-4">
        <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-[#020079]">About</h3>
        <p className="line-clamp-4 whitespace-pre-line text-sm leading-relaxed text-gray-600">
          {opportunity.description || "No additional details provided."}
        </p>
      </section>
      <section className="grid min-h-36 grid-cols-2 gap-x-4 gap-y-3 border-b border-gray-100 py-4">
        <div>
          <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-[#020079]">Location</h3>
          <p className="text-sm text-gray-700">{opportunity.location || "Not specified"}</p>
        </div>
        <div>
          <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-[#020079]">Availability</h3>
          <p className="text-sm text-gray-700">{opportunity.daysAvailable || "Not specified"}</p>
        </div>
        <div className="col-span-2">
          <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-[#020079]">Age range</h3>
          <p className="text-sm text-gray-700">{opportunity.ageRange || "Not specified"}</p>
        </div>
      </section>
      <section className="min-h-24 py-4">
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#020079]">Work types</h3>
        <div className="flex flex-wrap items-start gap-2">
          {opportunity.types.length ? opportunity.types.map((type: string) => (
            <span key={type} className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-800">
              {type}
            </span>
          )) : <span className="text-sm text-gray-500">Not specified</span>}
        </div>
      </section>

      <div className="mt-auto pt-2">
        <button
          onClick={handleSignUp}
          disabled={status === "saving"}
          className="w-full rounded-lg bg-[#020079] px-4 py-2 text-[#ffffe3] transition-colors duration-200 hover:bg-[#0021f3] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "saving" && "Signing up..."}
          {status === "error" && "Error, try again"}
          {status === "idle" && "Sign up"}
        </button>
      </div>
    </article>
  );
}

export default OpportunityCard;
