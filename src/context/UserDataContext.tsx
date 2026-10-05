import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import type { UserData } from "../UserData";

interface UserDataContextType {
    userData: UserData | null;
    loading: boolean;
}

const UserDataContext = createContext<UserDataContextType>({
    userData: null,
    loading: true,
});

export function UserDataProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setUserData(null);
            setLoading(false);
            return;
        }

        setUserData(null);
        setLoading(true);

        const unsubscribe = onSnapshot(
            doc(db, "users", user.uid),
            (snap) => {
                setUserData(snap.exists() ? (snap.data() as UserData) : null);
                setLoading(false);
            },
            (error) => {
                console.error("User listener failed:", error);
                setUserData(null);
                setLoading(false);
            }
        );

        return unsubscribe;
    }, [user]);

    return (
        <UserDataContext.Provider value={{ userData, loading }}>
            {children}
        </UserDataContext.Provider>
    );
}

export function useUserData() {
    return useContext(UserDataContext);
}