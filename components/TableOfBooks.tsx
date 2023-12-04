"use client"

import { useEffect, useState } from "react"



type TableOfBooksProps = {
    books: any,

}

export default function TableOfBooks ({ books }: TableOfBooksProps) {

    const [ stateOfBooks, setStateOfBooks ] = useState(books)
    const [limitedBooks, setLimitedBooks] = useState(stateOfBooks)


    useEffect(() => {
        const lastAddedBooks = stateOfBooks?.slice(-5)
        setLimitedBooks(lastAddedBooks)
    }, [stateOfBooks, books])

    return (
        <section className="py-5">
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="header-for-table">
                            Tytuł
                        </th>
                        <th className="header-for-table text-lg">Autor</th>
                        <th className="header-for-table">Status</th>
                        <th className="header-for-table">Kategoria</th>
                    </tr>
                </thead>
                <tbody>
                    { limitedBooks.map((book: any) => {
                        return (
                            <tr key={book.id}>
                                <td className="row-for-table">{book.title}</td>
                                <td className="row-for-table">{book.author}</td>
                                <td className="row-for-table">{book.status}</td>
                                <td className="row-for-table">{book.category}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}
