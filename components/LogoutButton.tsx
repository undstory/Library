"use client"
import { signOut, useSession } from "next-auth/react";


export default function LogoutButton(){

    const { data: session } = useSession();
    console.log(session?.user, session)

    return (
        <>
        { session && session.user && (

        <div>
            <button onClick={() => signOut({ callbackUrl: 'http://localhost:8000' })}>Wyloguj się</button>
        </div>
    )}
    </>
    )
}