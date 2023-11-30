"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {

    const router = useRouter();
    const [userInfo, setuserInfo] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState<string | null | undefined>("")

    const { email, password } = userInfo;

    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { name, value } = target;
        setuserInfo({ ...userInfo, [name]: value});
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();


            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            });
            if(res?.ok){
                router.replace("/summary");
            } else {
                   setError(res?.error);
            }


    }

    return (
        <div className="bg-neutral-50 text-gray-900 w-1/4 shadow-lg m-auto flex flex-col py-4 px-8 my-10">
        <h1 className='text-center font-bold text-xl p-6'>Zaloguj się</h1>
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
        >
            { error ? (
                <div className="mb-4">
                    <div
                        className="px-5 py-2 text-white bg-red-500 rounded-md"
                    >
                        {error}
                    </div>
                </div>
            ) : null}
            <label
                className="flex flex-col gap-3"
                htmlFor="email"
            >Podaj email
                <input
                    type="email"
                    className="h-10 bg-gray-300 pl-2"
                    value={email}
                    name="email"
                    onChange={handleChange}
                />
            </label>
            <label
                className="flex flex-col gap-3"
                htmlFor="password"
            >Podaj hasło
                <input
                    type="password"
                    className="h-10 bg-gray-300 pl-2"
                    value={password}
                    name="password"
                    onChange={handleChange}
                />
            </label>
            <button type="submit" className="self-end mt-2 mb-4 text-neutral-50 bg-gray-900 p-4">Zaloguj się</button>
        </form>
        <p>Nie masz jeszcze konta w serwisie Biblioteczka?</p>
        <Link href="/sign-up" className="font-bold">Zarejestruj się tutaj</Link>
    </div>
    )
  }