import NavBar from "@/app/Navbar";

export default function AuthenticationLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>
        <NavBar />
        {children}
        </section>
  }