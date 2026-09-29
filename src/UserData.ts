//THIS THE LIST OF EVERYTHING IN USER DATA APART FROM THE COLLECTIONS OF EVENTS

export interface UserData {
    // Created at when u login 
    uid : string
    email : string
    totalHours : number
    completedSignup : boolean

    // Stuff you get in extened sign up
    displayName : string 
    pfpChoice : number  

}
