import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email + password)
        try {
            if(isSignUp){
                await createUserWithEmailAndPassword(auth, email, password)
            } else {
                await signInWithEmailAndPassword(auth, email, password)
            }
            nav('/home')
        } catch (err) {
            console.log(err);
        }
    }


    const handleEChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#4a4a4a]">
            <h1 className="mb-6 text-center text-5xl font-bold text-[#ffffe3]">
                {isSignUp ? "Sign Up:" : "Log in:"}
            </h1>
            <div className="w-full max-w-md bg-[#ffffe3] p-8">
                <h1 className="mb-4 text-xl font-bold text-[#4a4a4a]">Hi!</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-[#4a4a4a]">Enter email:</label>
                    <input
                        type="text"
                        onChange={handleEChange}
                        className="border border-[#cbcbcb] bg-white px-3 py-2 outline-none focus:border-[#6d8196] focus:ring-1 focus:ring-[#6d8196]"
                    />
                    <label className="text-sm font-medium text-[#4a4a4a]">Enter password:</label>
                    <input
                        type="password"
                        onChange={handlePChange}
                        className="border border-[#cbcbcb] bg-white px-3 py-2 outline-none focus:border-[#6d8196] focus:ring-1 focus:ring-[#6d8196]"
                    />
                    <input
                        type="submit"
                        value= {isSignUp ? "Sign Up" : "Log in"}
                        className="mt-2 cursor-pointer bg-[#6d8196] px-3 py-2 font-medium text-[#ffffe3] transition-colors hover:bg-[#8da1b6]"
                    />
                    <button
                        type="button"
                        onClick={handleSignUp}
                        className="inline-block bg-[#4a4a4a] px-3 py-1 text-[#ffffe3] transition-colors hover:bg-[#6a6a6a]"
                    >
                    {isSignUp ? "Have an account? log in" : "Sign Up"}
                </button>
                </form>
                
            </div>
        </div>
    );
}

export default LoginPage;
