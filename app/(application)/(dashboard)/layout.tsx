
  "use client";

import Sidebar from "@/components/Sidebar";

export default function ApplicationLayout({
    children
  }: {
    children: React.ReactNode
  }) {
    return (

      <div className="flex w-full h-full">
        <Sidebar />
        <main className="w-full min-h-screen">{children}</main>
      </div>

    )
  }
