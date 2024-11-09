import Navbar from "@/components/Navbar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    
      <main>
        <Navbar/>
        {children}
      </main>
    
  )
}

