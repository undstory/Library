export default function EntryLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div>
          <header>ENTRY NAVI</header>
          <main>{children}</main>
      </div>
    )
  }
