import TableOfBooks from "@/components/TableOfBooks";
import { headers } from "next/headers"

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

const getBooks = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/books", {
    method: "GET",
    headers: Object.fromEntries(headers())
    });
    return res.json();

  } catch (error) {
    console.log("Failed to get books", error)
  }
}

export default async function SummaryPage() {


  const books  = await getBooks();

    return (
      <main className="bg-gray-300 w-full h-full">
        <main>
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
              <TableOfBooks books={books} />
            </div>
         </div>
        </main>
      </main>
    )
  }
