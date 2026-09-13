import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

//Change the html stuff for proper styling later. 
function AccountManager() {
    const [open, setOpen] = useState(false);

    const { user } = useAuth();
    const handleClick = () => {
        setOpen(!open);
    };

    const handleSignOut = () => {
        signOut(auth);
    };

    return (
        <div className="relative flex items-stretch">
            <button
                onClick={handleClick}
                className="flex items-center px-4 py-5 text-[#ffffe3] transition-colors duration-200 hover:bg-[#6d8196]"
            >
                {user?.email}
            </button>
            {open && (
                <div className="absolute right-0 top-full z-10 w-full min-w-full bg-[#4a4a4a] shadow-md">
                    <button
                        onClick={handleSignOut}
                        className="flex h-full w-full items-center justify-center px-4 py-5 text-center text-[#ffffe3] transition-colors duration-200 hover:bg-[#6d8196]"
                    >
                        Sign out?
                    </button>
                </div>
            )}
        </div>
    );
}
export default AccountManager;
