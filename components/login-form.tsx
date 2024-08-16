"use client"
import {FormEvent, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!email || !password) {
            setError("Please provide all required fields");
            return;
        }

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });

            const message = await response.json();


            if (!response.ok) {
                setError(message);
                return;
            }
            router.push("/");

        } catch (error) {
            setError("An error occurred during login");
        }

    }

    return (
        <>
            <div
                className={"max-w-96 mx-auto rounded-md p-8 flex flex-col gap-8 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-transparent"}>
                <div className={"flex flex-col justify-center items-center gap-2"}>
                    <h1 className={"bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent text-3xl font-bold"}>Welcome
                        to Auth X</h1>
                    <h2 className={"bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent]"}>Login
                        to use the best auth system</h2>
                </div>
                <div>
                    <form className={"flex flex-col gap-3"}>

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
                                className={"bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent text-xs"}>Password</label>
                            <input
                                type="password"
                                className={"border-2 rounded-md focus:outline-emerald-9500 p-1 text-sm text-[#2f3037] bg-[#e8f0fe]"}
                                placeholder={"Enter your password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className={""}>
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
                <div className={"text-gray-300 text-sm flex justify-center gap-2"}>
                    <p> Don&apos;t have an account?</p>
                    <Link href={"/signup"} className={"hover:underline text-blue-400"}>Sign Up</Link>
                </div>
            </div>
        </>
    )
}