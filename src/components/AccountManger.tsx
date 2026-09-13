import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

//Change the html stuff for proper styling later. 
function AccountManager(){
    const [open, setOpen] = useState(false); 

    const {user, } = useAuth(); 
    const handleClick =  () => {
        setOpen(!open);
    }

    
    const handleSignOut = () => {
        signOut(auth); 
    }

    return (
        <div>
            <button onClick= {handleClick}>{user?.email}</button>
            {open && 
                <button onClick = {handleSignOut}> Sign out?</button>
            }
        </div>
    );
}
export default AccountManager;