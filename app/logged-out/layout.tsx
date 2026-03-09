export default function LoggedOutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">
      {children}
    </div>
  )
}
