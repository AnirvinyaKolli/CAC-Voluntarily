import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

interface UserDataContextType {
    userData : any | null // ts is 'any' rn cuz i dont know what type the doc or whatever it is is called.  
    loading : boolean;
}

const UserDataContext = createContext<UserDataContextType>({
    userData : null, 
    loading : true
})
export function  UserDataProvider({children} : {children :ReactNode}) {
    const {user,} = useAuth(); 
    const [userData, setProfile] = useState<any | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
          setProfile(null);
          setLoading(false);
          return;
        }
        const cUser = user; 
 
        async function fetchProfile() {
            setLoading(true);
            const snap = await getDoc(doc(db, "users", cUser.uid));
            setProfile(snap.exists() ? snap.data() : null);
            setLoading(false);
        }
        fetchProfile(); 
        
    },[user]
    );
    return (
        <UserDataContext.Provider value={{ userData, loading }}>
          {children}
        </UserDataContext.Provider>
    );
}

export function useUserData() {
    return useContext(UserDataContext);
}