
  "use client";

import AddNewBook from "@/components/AddNewBook";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";


export default function ApplicationLayout({
    children
  }: {
    children: React.ReactNode
  }) {

    const [isModal, setIsModal] = useState(false)

    const handleClick = () => {
      setIsModal(!isModal)
    }
    return (

      <div className="flex w-full h-full">
        <Sidebar handleClick={handleClick} />
        <main className="w-full min-h-screen">{children}</main>
        {isModal ? (
          <div className="bg-black text-white z-2">
          <AddNewBook onClose={() => setIsModal(false)} setIsModal={setIsModal}/>
          </div>
        ) : null}
      </div>

    )
  }

