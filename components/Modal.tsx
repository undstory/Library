type ModalType = {
    children: any,
    modalOpen: boolean,
    setModalOpen: any,
    headerText: string
}

export function Modal ({ children, modalOpen, setModalOpen, headerText }: ModalType) {
    return (
        <>
            {
                modalOpen &&  (
            <div
                className="rounded-lg shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/4 h-max bg-gray-900 text-white z-10"
            >
                <header className="rounded-t-lg bg-white  text-gray-700 flex">
                <h2 className="pt-5 font-bold pl-10">{headerText}</h2>
                <button
                    className="
                    rounded-tr-lg ml-auto font-bold p-5 w-16 text-black"
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