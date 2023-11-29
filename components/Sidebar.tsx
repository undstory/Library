"use client"

import Image from "next/image";
import Link from "next/link";
import logo from "public/img/book-bookmark-white.png"
import LogoutButton from "./LogoutButton";


export default function Sidebar() {


    return (
        <aside className="flex flex-col bg-slate-500 basis-1/4 min-h-screen text-gray-100">
            <div className="bg-gray-900 py-5 flex items-center justify-center">

            <Image src={logo} alt="Library logo" height={34} />

            <h2 className="text-white pl-4">Moja biblioteka</h2>
          </div>
            <div className="flex flex-col justify-between">
            <nav className="pt-10 px-8 text-l">
                <h3 className="typical-header mb-5">KSIĄŻKI</h3>
                <ul className="flex flex-col gap-4">
                    <li><Link href="/summary">Podsumowanie</Link></li>
                    <li><Link href="/books">Moje książki</Link></li>
                    <li><button onClick={() => console.log("Hello3")}>Dodaj nową pozycję</button></li>
                </ul>
            </nav>
            <nav className="pt-10 px-8 text-l">
                <h3 className="typical-header mb-5">UŻYTKOWNIK</h3>
                <ul className="flex flex-col gap-4">
                    <li><Link href="/profile">Mój profil</Link></li>
                    <li><Link href="/statistics">Statystyki</Link></li>
                </ul>
            </nav>
            </div>
            <footer className="flex py-5 mt-auto items-center justify-center bg-gray-900 text-gray-100">
                <LogoutButton />
            </footer>
        </aside>
    )
}