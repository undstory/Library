import { getAllBooks } from "@/app/utils/apicalls";
import TableOfBooks from "@/components/TableOfBooks";


const librarySections = [
  {
    id: 1,
    title: "Przeczytane"
  },
  {
    id: 2,
    title: "W trakcie"
  },
  {
    id: 3,
    title: "W kolejce"
  }
]

export default async function SummaryPage() {

  const books  = await getAllBooks();

    return (
      <main className="bg-gray-300 w-full h-full">
        <div>
          <div className="p-10 flex gap-10 flex-col  w-full">
            <div className="flex w-full gap-5">
              <div className="typical-wrapper w-full ">
                <h2 className="typical-header mb-5">Podsumowanie</h2>
              </div>
              <div className="typical-wrapper basis-1/3 w-full">
                <h2 className="typical-header mb-5">Statystyki</h2>
              </div>
            </div>
            <div className="flex justify-between gap-10">
            { librarySections.map(({ title, id }) => (
              <div className="typical-wrapper w-1/3" key={id}>
                <h2 className="typical-header mb-5">{ title.toUpperCase() }</h2>
            </div>
            ))}
            </div>
            <div className="typical-wrapper">
              <h2 className="typical-header">Ostatnio dodane pozycje</h2>
              {books?.length ? (
                <TableOfBooks books={books} />
              ) : (
                <p
                  className="py-8 pl-4"
                >
                  Nie dodałeś/aś jeszcze żadnej książki
                </p>
              )
            }
            </div>
         </div>
        </div>
      </main>
    )
  }
