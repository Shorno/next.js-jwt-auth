"use client"
import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function SignupForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            const response = await fetch("http://localhost:3000/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    username,
                    password,
                })
            })


            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert("User registered successfully");
                setName("");
                setEmail("");
                setUsername("");
                setPassword("");
                setConfirmPassword("");
                setError("");
            } else {
                setError(data.error || "An error occurred during signup");
            }
        } catch (error) {
            console.error("An error occurred during signup", error);
        }
    }


    return (
        <>
            <div
                className={"max-w-96 mx-auto rounded-md p-8 flex flex-col gap-8 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-transparent"}>
                <div className={"flex flex-col justify-center items-center gap-2"}>
                    <h1 className={"bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent text-3xl font-bold"}>Create
                        new account</h1>
                    <h2 className={"bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent]"}>Build
                        Web Authentication Faster</h2>
                </div>
                <div>
                    <form className={"flex flex-col gap-3"}>
                        <div className={"flex flex-col gap-1"}>
                            <label
                                className={"bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent text-xs"}>Name</label>
                            <input
                                type="text"
                                className={"border-2 rounded-md focus:outline-emerald-950 p-1 text-sm text-[#2f3037] bg-[#e8f0fe]"}
                                placeholder={"Enter your full name"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className={"flex flex-col gap-1"}>
                            <label
                                className={"bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent] text-xs"}>Email</label>
                            <input
                                type="email"
                                className={"border-2 rounded-md focus:outline-emerald-950 p-1 text-sm text-[#2f3037] bg-[#e8f0fe]"}
                                placeholder={"Enter your email"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={"flex flex-col gap-1"}>
                            <label
                                className={"bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent] text-xs"}>Username</label>
                            <input
                                type="text"
                                className={"border-2 rounded-md focus:outline-emerald-950 p-1 text-sm text-[#2f3037] bg-[#e8f0fe]"}
                                placeholder={"Enter your email"}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className={"flex flex-col gap-1"}>
                            <label
                                className={"bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent text-xs"}>Password</label>
                            <input
                                type="password"
                                className={"border-2 rounded-md focus:outline-emerald-9500 p-1 text-sm text-[#2f3037] bg-[#e8f0fe]"}
                                placeholder={"Enter your full name"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={"flex flex-col gap-1"}>
                            <label
                                className={"bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent text-xs"}>Confirm
                                Password</label>
                            <input
                                type="password"
                                className={"border-2 rounded-md focus:outline-emerald-950 p-1 text-sm text-[#2f3037] bg-[#e8f0fe]"}
                                placeholder={"Enter your full name"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className={"h-4"}>
                            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                        </div>
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className={"bg-gradient-to-r from-green-400 to-emerald-500 text-sm text-gray-100 font-semibold py-3 rounded-md mt-5 hover:from-green-500 hover:to-emerald-600"}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className={"text-gray-400 text-sm flex justify-center gap-2"}>
                    <p>Already have an account?</p>
                    <Link href={"/login"} className={"hover:underline text-blue-400"}>Login </Link>
                </div>
            </div>
        </>
    )
}