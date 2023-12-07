import { getAllBooks } from '@/app/utils/apicalls';
import { TableWithAllBooks } from '@/components/TableWithAllBooks';



export default async function BooksPage() {
  const books  = await getAllBooks();


  return (
    <main className="bg-gray-300 w-full h-full p-12">
      <div className="typical-wrapper p-12">
          {books?.length ? (
            <TableWithAllBooks books={books} />
          ) : (
            <p
            className="py-8 pl-4"
          >
            Nie dodałeś/aś jeszcze żadnej książki
          </p>
          )

          }

      </div>
    </main>
  )
}