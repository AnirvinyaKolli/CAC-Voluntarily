export function getCompatibilityScore(distance : number): number {
  
   const distScore = getDistanceScore(distance);
   const distWeight = 1;


   const intrestScore = 0;
   const intrestWeight = 1;
  
   const timeScore = 0;
   const timeWeight = 1;
  


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

