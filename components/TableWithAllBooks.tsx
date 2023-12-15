"use client";
import { QueryClient, useIsFetching, useQuery } from "@tanstack/react-query"
import BookRow  from './BookRow'
import { getAllBooks } from "@/app/utils/apicalls";



// type TableWithAllBooksType = {
//     books: any,

// }

export default function TableWithAllBooks () {
    const queryClient = new QueryClient()
    const isFetching = useIsFetching();
    const {data: booksData, isLoading, isError, isSuccess} = useQuery({
        queryKey: ["allBooks"],
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
                Wsytąpił błąd z ładowaniem książek, spróbuj ponownie później
            </div>
        )
    }


    return (
        <table className="min-w-full">
        <thead>
            <tr>
                <th className="header-for-table">
                    Tytuł
                </th>
                <th className="header-for-table text-lg">Autor</th>
                <th className="header-for-table">Status</th>
                <th className="header-for-table">Kategoria</th>
                <th className="header-for-table">Właściciel</th>
                <th className="header-for-table">Start</th>
                <th className="header-for-table">Koniec</th>
                <th className="header-for-table">Edycja</th>
                <th className="header-for-table">Usuń</th>
            </tr>
        </thead>
        <tbody>
            {booksData?.map((book: any) => {
                const { id } = book;
                return (
                  <BookRow book={book} key={id} />
                )
            })}
        </tbody>
    </table>
    )
}