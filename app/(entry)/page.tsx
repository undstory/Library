import Image from "next/image";
import library from "../../public/img/library.jpg"
import Link from "next/link";


export default function Home() {
  return (
    <main className="text-orange-50 h-full">
      <div className="my-40 flex justify-center gap-10">
        <Image src={library} alt="library photo" width={500} />
        <div className="text-gray-900 flex flex-col justify-end" >
          <h1 className="text-2xl font-bold">Moja biblioteczka wita</h1>
          <p className="py-4 w-96">To jest miejsce, w którym uporządkujesz swoją biblioteczkę,
            będziesz śledził/a postęp w czytaniu,
            sprawdzisz własne statystyki
            i zmotywujesz się do czytania większej ilości książek</p>
          <button className="bg-slate-500 w-auto shadow-md text-neutral-50 p-3 self-end">
            <Link href="/signup">Przejdź dalej</Link></button>
        </div>
      </div>
    </main>
  )
}
