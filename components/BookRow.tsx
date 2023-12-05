import Image from 'next/image'
import edit from "@/public/img/edit.png"
import deleteIt from "@/public/img/delete.png"
import { useState } from 'react'
import { Modal } from './Modal'

type BookType = {
    book: any
}

export function BookRow({ book}: BookType) {

  const [modalOpen, setModalOpen] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)


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
            // onClick={() => handleDelete(id)}
            onClick={() => setOpenModalDelete(true)}
          >
            <Image
              className="mx-auto"
              src={deleteIt}
              alt="delete icon"
              width={24}
            />
          </button>
        </td>
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <div
            className='px-12 pt-12 flex justify-center flex-col items-center'
          >
          <h1
          >
            Czy jesteś pewny, że chcesz usunąć tą pozycję?
          </h1>
          <div
            className='p-10 flex gap-8'
          >
            <button
              className='bg-gray-300 px-4 py-2 w-24 text-gray-700'
              onClick={() => setOpenModalDelete(false)}
            >Nie</button>
            <button
              className='bg-red-500 px-4 py-2 w-24'
              onClick={() => handleDelete(id)}
            >
              Tak
            </button>
          </div>
          </div>
        </Modal>
      </tr>
    )}