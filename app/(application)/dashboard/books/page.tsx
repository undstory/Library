import { getAllBooks } from '@/app/utils/apicalls';
import { ConfirmModal } from '@/components/ConfirmModal';
import { TableWithAllBooks } from '@/components/TableWithAllBooks';
import { useState } from 'react';


export default async function BooksPage() {
  const books  = await getAllBooks();


  return (
    <main className="bg-gray-300 w-full h-full p-12">
      <div className="typical-wrapper p-12">
          <TableWithAllBooks books={books} />

      </div>
    </main>
  )
}