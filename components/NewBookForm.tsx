"use client";

import { useSession } from "next-auth/react";
import { FormEventHandler, useEffect, useState } from "react";

enum Status {
    DONE = "Done",
    READING = "Reading",
    WAITING = "Waiting",
    ON_HOLD = "On_hold"
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

 type BookData = {
     title: string;
     author: string;
     status: Status | string;
     category: Category | string;
     owner: Owner | string;
     dateOfStart: string;
     dateOfEnd: string;
 }

 type NewBookForm = {
    setIsModal: any
 }


export default function NewBookForm({setIsModal}: NewBookForm) {


    const startingBookData: BookData = {
        title: "",
        author: "",
        status: "",
        category: "",
        owner: "",
        dateOfEnd: "",
        dateOfStart:"",
    }

    const [ formData, setFormData] = useState<BookData>(startingBookData);
    const [error, setError] = useState("");
    const [isValid, setIsValid] = useState(false);

    const handleChange = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3000/api/book', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            console.log(res)
            if(res.ok){
                console.log("Data added")

                setIsModal(false)
            } else {
                setError("Coś poszło bardzo zle")
            }
        } catch(error) {
            console.log(error)
            setError("Coś poszło bardzo nie tak")
        }
    }



    return (
         <div
            className="p-10"
         >
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
                onSubmit={handleSubmit}
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
                        value={formData.title}
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
                        value={formData.author}
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
                                disabled={formData.status === "Waiting" ? true : false}
                                required={formData.status === "Done" || formData.status === "Reading"  ? true : false}
                                value={formData.dateOfStart}
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
                                disabled={formData.status === "Done" ? false : true}
                                required={formData.status === "Done" ? true : false}
                                value={formData.dateOfEnd}
                            />
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-slate-500 py-5 w-1/4 mx-auto my-5"
                    // disabled={isValid ? false : true }
                >
                    Dodaj
                </button>
            </form>
         </div>
    )


};
