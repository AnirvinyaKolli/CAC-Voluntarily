import type { Timestamp } from "firebase/firestore";

//THIS THE LIST OF EVERYTHING IN USER DATA APART FROM THE COLLECTIONS OF EVENTS
export interface CompletedOpportunity {
    opportunityId: string;
    completedAt: Date | Timestamp;
    hours: number;
}
export interface UserData {
    // Created at when u login 
    uid : string
    email : string
    totalHours : number
    completedSignup : boolean

    // Stuff you get in extened sign up
    displayName : string 
    pfpChoice : number  
    zip : string
    /** Completion records used to build activity statistics over time. */
    opportunitiesCompleted: CompletedOpportunity[]
    opportunitiesSignedUp : string[]

}
