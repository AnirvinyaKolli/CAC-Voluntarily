import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

function SignUp() {

    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email + password)
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            nav('/home')
        } catch (err) {
            console.log("OH NO!")
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
        <>
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
                    value="Sign Up"
                    className="mt-2 cursor-pointer bg-[#6d8196] px-3 py-2 font-medium text-[#ffffe3] transition-colors hover:bg-[#4a4a4a]"
                />
            </form>
        </>
    );

}

export default SignUp;
