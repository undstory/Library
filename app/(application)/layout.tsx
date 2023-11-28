export default function AppLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div>
          <aside>SIDEBAR</aside>
          <main>{children}</main>
      </div>
    )
  }
