"use client"

import { getAllBooks } from "@/app/utils/apicalls";
import { countStatus } from "@/app/utils/filters";
import TableOfBooks from "@/components/TableOfBooks";
import { useQuery } from "@tanstack/react-query";


const librarySections = [
  {
    id: 1,
    title: "Przeczytane",
    status: "Skończona"
  },
  {
    id: 2,
    title: "W trakcie",
    status: "Wstrzymane"
  },
  {
    id: 3,
    title: "W kolejce",
    status: "Czeka"
  }
]

export default  function SummaryPage() {


  const {data: booksData, isLoading, isError, isSuccess} = useQuery<any>({
    queryKey: ["allBooksSummary"],
    queryFn: () => fetch("http://localhost:3000/api/books").then((res) => res.json())
})
if(isLoading){
    return (
        <div
            className="mt-4 flex p-10 flex-col items-center bg-red-500 text-white"
        >
            Zaczekaj chwilę, muszę załadować książki
        </div>
    )
}

if(isError){
    return (
        <div
            className="mt-4 flex p-10 flex-col items-center bg-red-500 text-white"
        >
            Wystąpił błąd z ładowaniem książek, spróbuj ponownie później
        </div>
    )
}


    return (
      <main className="bg-gray-300 w-full h-full">
        <div>
          <div className="p-10 flex gap-10 flex-col  w-full">
            <div className="flex w-full gap-5">
              <div className="typical-wrapper w-full ">
                <h2 className="typical-header mb-5">Podsumowanie</h2>
              </div>
              <div className="typical-wrapper basis-1/3 w-full">
                <h2 className="typical-header mb-5">Statystyki</h2>
              </div>
            </div>
            <div className="flex justify-between gap-10">
            { librarySections.map(({ title, id, status }) => (
              <div className="typical-wrapper w-1/3" key={id}>
                <h2 className="typical-header mb-5">{ title.toUpperCase() }</h2>
                <p>{countStatus(booksData, status)}</p>
            </div>
            ))}
            </div>
            <div className="typical-wrapper">
              <h2 className="typical-header">Ostatnio dodane pozycje</h2>
              {/* {books?.length ? (
                <TableOfBooks books={books} />
              ) : (
                <p
                  className="py-8 pl-4"
                >
                  Nie dodałeś/aś jeszcze żadnej książki
                </p>
              )
            } */}
            <TableOfBooks books={booksData}/>
            </div>
         </div>
        </div>
      </main>
    )
  }
