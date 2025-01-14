import Footer from "@/components/shared/Footer/Footer"

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="flex h-screen flex-col">
        <main className="flex-1">{children}</main>
        <Footer/>
      </div>
    )
}