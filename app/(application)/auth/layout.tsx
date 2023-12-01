import Link from "next/link"

export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="bg-slate-500 text-orange-50 h-screen">
        <header className="flex justify-end mx-auto p-6">
          <button><Link href="/">Wróć do strony głównej</Link></button>
        </header>
        <main>
        {children}
        </main>
      </div>
    )
  }