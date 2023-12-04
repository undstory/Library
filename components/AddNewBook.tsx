"use client";

import NewBookForm from "./NewBookForm";

interface Props {
    onClose: any,
    setIsModal: any
}

export default function AddNewBook({ onClose, setIsModal} : Props){

    const handleCloseClick = () => {
        onClose();
    }
    return (
        <div className="rounded-lg shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/4 h-max bg-gray-900 text-white z-10">
            <header className="rounded-t-lg bg-slate-500 flex">
                <h2 className="pt-5 pl-10">Dodaj nową pozycję</h2>
                <button
                    className="
                    rounded-tr-lg ml-auto font-bold bg-white p-5 w-16 text-black"
                    onClick={handleCloseClick}>X</button>
            </header>
            <NewBookForm setIsModal={setIsModal}/>
        </div>
    )
}