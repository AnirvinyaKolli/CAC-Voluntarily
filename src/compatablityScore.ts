import type { OpportunityData } from "./OpportunityData";

export function getCompatibilityScore(o : OpportunityData): number {
    const k = 0.5; 
    const distScore =  1 / ((((o.distance)/75) + 1) ** k);

    return distScore; 
}
