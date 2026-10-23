import type { OpportunityData } from "./OpportunityData";
import type { UserData } from "./UserData";


export function getCompatibilityScore(o : OpportunityData, u: UserData): number {
   const distScore = getDistanceScore(o.distance);
   const distWeight = 0.75;

   
   const intrestScore = getInterestScore(o.types, u.interestAreas ?? []);
   const intrestWeight = 0.25;
  
   const timeScore = 0;
   const timeWeight = 0;
  


   return (distScore * distWeight) + (intrestScore * intrestWeight) + (timeWeight * timeScore);
}
export function normalize(value: number, min: number, max: number): number {
 if (max === min) return 0;
 const n = (value - min) / (max - min);
 return Math.min(1, Math.max(0, n));
}


function getDistanceScore(distance: number): number {
   const k = 2;
   const d = normalize(distance, 0, 50);
   return 1 - d ** k;
}

function getInterestScore(opportunityTypes: string[], userInterests: string[]): number {
  if (opportunityTypes.length === 0 || userInterests.length === 0) return 0;

  const a = new Set(opportunityTypes.map(t => t.toLowerCase()));
  const b = new Set(userInterests.map(i => i.toLowerCase()));

  let shared = 0;
  for (const t of a) if (b.has(t)) shared++;

  const union = a.size + b.size - shared;
  return shared / union;
}