import Link from "next/link"
import logo from "../../public/img/book-bookmark-white.png"
import Image from "next/image"
import SignInSignUpButtons from "@/components/SignInSignUpButtons"

export default function EntryLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="h-screen">
        <header className="mx-auto flex justify-between p-6 bg-slate-500 text-neutral-50">
          <div className="max-w-7xl">
          <Link href={"/"} className="flex">
            <Image src={logo} alt="Library logo" height={34} />
            <h1 className="text-xl font-bold ps-2">Biblioteczka</h1>
          </Link>
          </div>
          <nav className="mx-2">
            <ul className="flex gap-4">
              <li>
                <Link href={"/"}>Home</Link>
              </li>

              <li>
                <Link href={"/contact"}>Contact</Link>
              </li>
              <li>
                <SignInSignUpButtons />
              </li>
            </ul>
          </nav>
        </header>
          {children}
        </div>
    )
  }
