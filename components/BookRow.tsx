"use client"
import Image from 'next/image'
import edit from "@/public/img/edit.png"
import deleteIt from "@/public/img/delete.png"
import { FormEventHandler, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Modal from './Modal'
import { fromIso } from '@/app/utils/dates'

type BookType = {
    book: any
}

const headerText = {
  delete: "Usuń książkę",
  edit: "Edytuj książkę"
}

enum Status {
  DONE = "Skończona",
  READING = "W trakcie",
  WAITING = "Czeka",
  ON_HOLD = "Wstrzymane"
}

enum Category {
  CLASSIC ="Klasyka",
  FANTASY = "Fantasy",
  CRIME = "Kryminał",
  ROMANCE = "Romans"
}

enum Owner {
  OWN ="Własność",
  FROM_SOMEONE = "Od kogoś",
  LIBRARY = "Z biblioteki",
}

export default function BookRow({ book}: BookType) {

  const { title, author, category, status, owner, dateOfStart, dateOfEnd, id } = book;

  const startDateString =  fromIso(dateOfStart)
  const endDateString =  fromIso(dateOfEnd)

  const refactorBook = {
    title,
    author,
    category,
    status,
    owner,
    dateOfStart: startDateString,
    dateOfEnd: endDateString
  }

  const [ modalDelete, setModalDelete] = useState(false);
  const [ modalEdit, setModalEdit ] = useState(false);
  const [ bookToEdit, setBookToEdit] = useState(refactorBook);
  const [error, setError] = useState("");

    const handleDelete = async (id: any) => {

        // try {
        //     const res = await fetch(`http://localhost:3000/api/books/${id}`, {
        //     method: "DELETE",
        //     })

        //     if(!res.ok){
        //         throw new Error(`Error status: ${res.status}`)
        //     }

        //     const result = await res.json();
        //     setModalDelete(false)
        //     return result;
        // } catch (error) {
        //     console.log("Hej errrrrooorrr", error)
        // }
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
  mutation2.mutate(bookToEdit)
  // try {
  //     const res = await fetch(`http://localhost:3000/api/books/${book.id}`, {
  //         method: "PUT",
  //         headers: {
  //             "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify(bookToEdit)
  //     });
  //     // console.log(bookToEdit)
  //     // console.log(res)
  //     const data = await res.json();


  //     console.log(data)

  //       setModalEdit(false)
  //       return data;


  // } catch(error) {
  //     console.log(error)
  //     setError("Coś poszło bardzo nie tak")
  // }
}

const client = useQueryClient();
const mutation: any = useMutation({
    mutationFn: () => {
      const res = fetch(`http://localhost:3000/api/books/${id}`, {
        method: "DELETE",
        })
        return res;
    },
    onSuccess: () => {
        client.invalidateQueries({queryKey: ['allBooks']}),
        client.invalidateQueries({queryKey: ['allBooksSummary']})
    }
})
const mutation2: any = useMutation({
  mutationFn: () => {
    const res = fetch(`http://localhost:3000/api/books/${book.id}`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(bookToEdit)
          });
      return res;
  },
  onSuccess: () => {
      client.invalidateQueries({queryKey: ['allBooks']}),
      client.invalidateQueries({queryKey: ['allBooksSummary']})
  }
})


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
          {refactorBook.dateOfStart ? refactorBook.dateOfStart : "Brak"}
        </td>
        <td
          className="row-for-table"
        >
          {refactorBook.dateOfEnd ? refactorBook.dateOfEnd : "Brak"}
        </td>
        <td
          className="row-for-table"
        >
          <button
            onClick={() => setModalEdit(true)}
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
            onClick={() => setModalDelete(true)}
          >
            <Image
              className="mx-auto"
              src={deleteIt}
              alt="delete icon"
              width={24}
            />
          </button>
      <Modal setModalOpen={setModalEdit} modalOpen={modalEdit} headerText={headerText.edit}>
        <div className='p-10'>
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
                    Title
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
                    Author
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
                                <option hidden selected>Wybierz opcję...</option>
                                <option value={Status.DONE}>Przeczytane</option>
                                <option value={Status.READING}>W trakcie</option>
                                <option value={Status.WAITING}>W kolejce</option>
                                <option value={Status.ON_HOLD}>Wstrzymane</option>
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
                                <option value={Category.CLASSIC}>Klasyka</option>
                                <option value={Category.FANTASY}>Fantasy</option>
                                <option value={Category.CRIME}>Kryminał</option>
                                <option value={Category.ROMANCE}>Romance</option>
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
                                <option value={Owner.OWN}>Moja</option>
                                <option value={Owner.FROM_SOMEONE}>Pożyczona</option>
                                <option value={Owner.LIBRARY}>Z biblioteki</option>
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
                <div className='flex justify-center items-center gap-4'>
                  <button
                      type="button"
                      className="bg-gray-300 text-black px-8 py-2"
                      onClick={() => setModalEdit(false)}
                  >
                      Anuluj
                  </button>
                  <button
                      type="submit"
                      className="bg-slate-500 px-8 py-2"

                  >
                      Zmień
                  </button>
                </div>

            </form>
            </div>
      </Modal>
      <Modal setModalOpen={setModalDelete} modalOpen={modalDelete} headerText={headerText.delete}>
        <div
          className='py-10'
        >
          <div className='pb-4'>
            <p>Czy na pewno chcesz usunąć tą książkę?</p>
          </div>
          <div className='flex gap-4 justify-center items-center'>
            <button
              className='bg-gray-300 text-black px-8 py-2'
              onClick={() => setModalDelete(false)}
            >
              Nie
            </button>
            <button
            className='bg-red-500 text-white px-8 py-2'
              onClick={() => mutation.mutate(id)}
            >
              Tak
            </button>
          </div>
        </div>
      </Modal>
        </td>
      </tr>

    )}