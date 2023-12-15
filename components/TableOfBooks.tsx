/* eslint-disable react-hooks/rules-of-hooks */
"use client"


type TableOfBooksType = {
    books: any
}


export default function TableOfBooks ({ books }: TableOfBooksType) {


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
                    { books?.map((book: any) => {
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
