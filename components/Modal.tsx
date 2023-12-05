type ModalType = {
    children: any,
    modalOpen: boolean,
    setModalOpen: any
}

export function Modal ({ children, modalOpen, setModalOpen }: ModalType) {
    return (
        <>
            {
                modalOpen &&  (
            <div
                className="rounded-lg shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/4 h-max bg-gray-900 text-white z-10"
            >
                <header className="rounded-t-lg bg-white  text-gray-700 flex">
                <h2 className="pt-5 font-bold pl-10">DODAJ NOWĄ POZYCJĘ</h2>
                <button
                    className="
                    rounded-tr-lg ml-auto font-bold bg-white p-5 w-16 text-black"
                    onClick={() => setModalOpen(false)}
                >
                    X
                </button>
                </header>
                        { children }
            </div>
            )
            }
        </>
    )
}