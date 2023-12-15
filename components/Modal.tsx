type ModalProps = {
    children: any
    setModalOpen: any
    modalOpen: any
    headerText: string
}


export default function Modal({ children, setModalOpen, modalOpen, headerText}: ModalProps) {
    return (
        <>
        { modalOpen && (
        <div className="rounded-lg shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/4 h-max bg-gray-900 text-white z-10">
            <header className="rounded-t-lg bg-white font-bold text-black flex">
                <h2 className="pt-5 pl-10">{ headerText.toUpperCase() }</h2>
                <button
                    className="
                    rounded-tr-lg ml-auto font-bold bg-white p-5 w-16 text-black"
                    onClick={() => setModalOpen(false)}>X</button>
            </header>
            <div>
                { children }
            </div>
        </div>
        )}
        </>
    )
}