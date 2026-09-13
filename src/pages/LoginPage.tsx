import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
function LoginPage(){
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignUp = () => {    
        setIsSignUp(!isSignUp);
    }
    
    return (
        <>
        {isSignUp ? <SignUp/> : <SignIn/>}
        <button onClick={handleSignUp}>
            {isSignUp ? "Have an account? log in" : "Sign Up"}
        </button>
        </>
    );
    
}

export default LoginPage; 
