'use client';

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

export default function SignUpPage() {

    const router = useRouter();

    const [userInfo, setuserInfo] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("")

    const { name, email, password } = userInfo;

    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { name, value } = target;
        setuserInfo({ ...userInfo, [name]: value});
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/user", {
            method: "POST",
            body: JSON.stringify(userInfo),
        }).then((res) => res.json());

        if(res?.error) return setError(res.error);
        router.replace("/auth/signin");
    }

    return (
        <div className="bg-neutral-50 text-gray-900 w-1/4 shadow-lg m-auto flex flex-col py-4 px-8 my-10">
            <h1 className='text-center font-bold text-xl p-6'>Zarejestruj się</h1>
            <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit}
            >
                      { error ? (

                    <div
                        className="px-5 py-2 text-white bg-red-500 rounded-md"
                    >
                        {error}
                    </div>

            ) : null}
                <label
                    className="flex flex-col gap-3"
                    htmlFor="name"
                    >
                        Login/Imię
                    <input
                        type="text"
                        className="h-10 bg-gray-300 pl-2"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </label>
                <label
                    className="flex flex-col gap-3"
                    htmlFor="email"
                >
                    Email
                    <input
                        type="email"
                        className="h-10 bg-gray-300 pl-2"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </label>
                <label
                    className="flex flex-col gap-3"
                    htmlFor="password"
                >
                    Podaj hasło
                    <input
                        type="password"
                        className="h-10 bg-gray-300 pl-2"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </label>
                <button
                    type="submit"
                    className="self-end mt-2 mb-4 text-neutral-50 bg-gray-900 p-4">
                        Utwórz konto
                </button>
            </form>
            <p>Masz już konto w serwisie Biblioteczka?</p>
            <Link href="/auth/signin" className="font-bold">Zaloguj się tutaj</Link>

        </div>
    )
  }