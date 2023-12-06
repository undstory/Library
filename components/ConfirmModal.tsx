export function ConfirmModal () {
    return (
        <div className="rounded-lg shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/4 h-max bg-gray-900 text-white z-10">
            <h2>Czy na pewno chcesz usunąć tą pozycję</h2>
            <button>Nie</button>
            <button>Tak</button>
        </div>
    )
}