import Image from 'next/image'
import edit from "@/public/img/edit.png"
import deleteIt from "@/public/img/delete.png"
import { useState } from 'react'

type BookType = {
    book: any
}

export function BookRow({ book}: BookType) {



    const handleDelete = async (id: any) => {

        try {
            const res = await fetch(`http://localhost:3000/api/books/${id}`, {
            method: "DELETE",
            })

            if(!res.ok){
                throw new Error(`Error status: ${res.status}`)
            }

            const result = await res.json();

            return result;
        } catch (error) {
            console.log("Hej errrrrooorrr", error)
        }
    }

    const { id, title, author, status, category, owner, dateOfStart, dateOfEnd } = book;
    return (
      <tr key={id}>
        <td
          className="row-for-table"
        >
          {title}
        </td>
        <td
          className="row-for-table"
        >
          {author}
        </td>
        <td
          className="row-for-table"
        >
          {status}
        </td>
        <td
          className="row-for-table"
        >
          {category}
        </td>
        <td
          className="row-for-table"
        >
          {owner}
        </td>
        <td
          className="row-for-table"
        >
          {dateOfStart ? dateOfStart : "Brak"}
        </td>
        <td
          className="row-for-table"
        >
          {dateOfEnd ? dateOfEnd : "Brak"}
        </td>
        <td
          className="row-for-table"
        >
          <button>
            <Image
              className="mx-auto"
              src={edit}
              alt="edit icon"
              width={21}
            />
          </button>
        </td>
        <td
          className="row-for-table"
        >
          <button
            onClick={() => handleDelete(id)}
          >
            <Image
              className="mx-auto"
              src={deleteIt}
              alt="delete icon"
              width={24}
            />
          </button>
        </td>
      </tr>
    )}