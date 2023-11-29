import Image from "next/image";
import Link from "next/link";

export default function SignInSignUpButtons() {

    const isSignedIn = false;

    return (
        <div className="flex gap-4">
            {isSignedIn ? (
                <Link href={"/dashboard/library"}>Moja biblioteczka</Link>
            ) : (
                <div className="flex gap-4">
                    <Link href={"/signup"}>Zarejestruj się </Link>
                    <Link href={"/signin"}>Zaloguj się</Link>
                </div>
            )}
        </div>
    );
}