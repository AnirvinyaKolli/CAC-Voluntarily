import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#4a4a4a]">
            <h1 className="mb-6 text-center text-5xl font-bold text-[#ffffe3]">
                {isSignUp ? "Sign Up:" : "Log in:"}
            </h1>
            <div className="w-full max-w-md bg-[#ffffe3] p-8 shadow-lg">
                {isSignUp ? <SignUp /> : <SignIn />}
                <button
                    onClick={handleSignUp}
                    className="inline-block bg-[#4a4a4a] px-3 py-1 text-[#ffffe3] transition-colors hover:bg-[#4a4a4a]"
                >
                    {isSignUp ? "Have an account? log in" : "Sign Up"}
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
