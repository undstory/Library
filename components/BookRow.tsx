import Image from 'next/image'
import edit from "@/public/img/edit.png"
import deleteIt from "@/public/img/delete.png"
import { useState } from 'react'

type BookType = {
    book: any
}

const headerText = {
  delete: "Usuń książkę",
  edit: "Edytuj książkę"
}

export function BookRow({ book}: BookType) {


  useEffect(() => {
    console.log(bookToEdit)
  }, [bookToEdit])

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

    const handleChange = (e: any) => {
      const value = e.target.value;
      const name = e.target.name;
      setBookToEdit((prevState: any) => ({
          ...prevState,
          [name]: value
      }))
  }

  const handleEditSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch(`http://localhost:3000/api/books/${bookToEdit.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookToEdit)
        });
        if(res.ok){
            setOpenModalEdit(false)
        } else {
            setError("Coś poszło bardzo zle")
        }
    } catch(error) {
        console.log(error)
        setError("Coś poszło bardzo nie tak")
    }
}

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
          <button
            onClick={() => setOpenModalEdit(true)}
          >
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