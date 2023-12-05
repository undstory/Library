"use client"

import { useState } from 'react'
import { BookRow } from './BookRow'

type TableWithAllBooksType = {
    books: any,

}

export function TableWithAllBooks ({ books  }: TableWithAllBooksType) {


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
            { books.map((book: any) => {
                const { id } = book;
                return (
                  <BookRow book={book} key={id} />
                )
            })}
        </tbody>
    </table>
    )
}