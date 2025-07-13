import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 p-4 bg-transparent z-10 max-w-md mx-auto">
      <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-md">
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="ghost">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
                <Sidebar />
            </SheetContent>
        </Sheet>
        <Input 
          placeholder="Para onde você quer ir?"
          className="border-none shadow-none focus-visible:ring-0 text-md h-9"
        />
      </div>
    </header>
  )
}
