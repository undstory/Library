import Image from 'next/image'
import edit from "@/public/img/edit.png"
import deleteIt from "@/public/img/delete.png"
import { FormEventHandler, useEffect, useState } from 'react'
import { Modal } from './Modal'

type BookType = {
    book: any
}

const headerText = {
  delete: "Usuń książkę",
  edit: "Edytuj książkę"
}

export function BookRow({ book}: BookType) {

  const { id, title, author, status, category, owner, dateOfStart, dateOfEnd } = book;

  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [bookToEdit, setBookToEdit] = useState(book)
  const [error, setError] = useState("");

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
        <Modal
          modalOpen={openModalDelete}
          setModalOpen={setOpenModalDelete}
          headerText={headerText.delete}
        >
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
        <Modal modalOpen={openModalEdit} headerText={headerText.edit} setModalOpen={setOpenModalEdit}>
        <div className="p-10">
          { error ? (
                <div className="mb-8">
                    <div
                        className="px-5 py-2 text-white bg-red-500 rounded-md"
                    >
                        {error}
                    </div>
                </div>
            ) : null}
            <form
              className="flex flex-col gap-8"
              onSubmit={handleEditSubmit}
            >
                <label
                    htmlFor="title"
                    className="flex gap-5 items-center"
                >
                    Tytuł
                    <input
                        className="w-full p-2 text-black rounded"
                        id="title"
                        name="title"
                        type="text"
                        onChange={handleChange}
                        required={true}
                        value={bookToEdit.title}
                        placeholder="Wpisz tytuł"
                    />
                </label>
                <label
                    htmlFor="author"
                    className="flex gap-5 items-center"
                >
                    Autor
                    <input
                        className="w-full p-2 rounded text-black"
                        id="author"
                        name="author"
                        type="text"
                        onChange={handleChange}
                        required={true}
                        value={bookToEdit.author}
                        placeholder="Wpisz autora"
                    />
                </label>
                <div className="flex flex-row w-full ">
                    <div className="flex flex-col w-full gap-8">
                        <label
                            htmlFor="status"
                            className="flex gap-5 items-center"
                        >
                            Status
                            <select
                                id="status"
                                name="status"
                                className="text-black p-2 rounded w-1/2"
                                onChange={handleChange}
                                required={true}
                            >
                                <option hidden>Wybierz opcję...</option>
                                <option value={bookToEdit.status.DONE}>Przeczytane</option>
                                <option value={bookToEdit.status.READING}>W trakcie</option>
                                <option value={bookToEdit.status.WAITING}>W kolejce</option>
                                <option value={bookToEdit.status.ON_HOLD}>Wstrzymane</option>
                            </select>
                        </label>
                        <label
                            htmlFor="category"
                            className="flex gap-5 items-center"
                        >
                            Kategoria
                            <select
                                id="category"
                                name="category"
                                className="text-black p-2 rounded w-1/2"
                                onChange={handleChange}
                                required={true}
                            >
                                <option hidden selected>Wybierz opcję...</option>
                                <option value={bookToEdit.category.CLASSIC}>Klasyka</option>
                                <option value={bookToEdit.category.FANTASY}>Fantasy</option>
                                <option value={bookToEdit.category.CRIME}>Kryminał</option>
                                <option value={bookToEdit.category.ROMANCE}>Romance</option>
                            </select>
                        </label>
                        <label
                            htmlFor="owner"
                            className="flex gap-5 items-center"
                        >
                            Właściciel
                            <select
                                id="owner"
                                name="owner"
                                className="text-black p-2 rounded w-1/2"
                                onChange={handleChange}
                                required={true}
                            >
                                <option hidden selected>Wybierz opcję...</option>
                                <option value={owner.OWN}>Moja</option>
                                <option value={owner.FROM_SOMEONE}>Pożyczona</option>
                                <option value={owner.LIBRARY}>Z biblioteki</option>
                            </select>
                        </label>
                    </div>
                    <div className="flex flex-col w-full gap-5">
                        <label
                            htmlFor="dateOfStart"
                            className="flex gap-5 items-center"
                        >
                            Data rozpoczęcia
                            <input
                                className="w-full p-2 rounded text-black"
                                id="dateOfStart"
                                name="dateOfStart"
                                type="date"
                                onChange={handleChange}
                                disabled={bookToEdit.status === "Waiting" ? true : false}
                                required={bookToEdit.status === "Done" || bookToEdit.status === "Reading"  ? true : false}
                                value={bookToEdit.dateOfStart}
                            />
                        </label>
                        <label
                            htmlFor="dateOfEnd"
                            className="flex gap-5 items-center"
                        >
                            Data zakończenia
                            <input
                                className="w-full p-2 rounded text-black"
                                id="dateOfEnd"
                                name="dateOfEnd"
                                type="date"
                                onChange={handleChange}
                                disabled={bookToEdit.status !== "Done" ? false : true}
                                required={bookToEdit.status === "Done" ? true : false}
                                value={bookToEdit.dateOfEnd}
                            />
                        </label>
                    </div>
                </div>
                <div
                  className='p-10 flex gap-8 justify-center'
                >
                  <button
                    className='bg-gray-300 px-4 py-2 w-24 text-gray-700'
                    onClick={() => setOpenModalEdit(false)}
                  >
                    Anuluj
                  </button>
                  <button
                      type="submit"
                      className="bg-slate-500 px-4 py-2 w-24"
                      // disabled={isValid ? false : true }
                  >
                      Edytuj
                  </button>
                </div>
            </form>
        </div>

        </Modal>
      </tr>
    )}