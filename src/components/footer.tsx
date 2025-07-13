import { Button } from "@/components/ui/button"
import { Home, Car, Wallet, User } from 'lucide-react'

const navItems = [
  { name: 'Início', icon: Home },
  { name: 'Viagens', icon: Car },
  { name: 'Carteira', icon: Wallet },
  { name: 'Perfil', icon: User },
]

export function Footer() {
  return (
    <footer className="bg-secondary border-t">
      <nav className="p-2 flex justify-around items-center">
        {navItems.map((item, index) => (
          <Button key={item.name} variant="ghost" className={`flex flex-col h-auto p-2 rounded-lg ${index === 0 ? 'text-primary' : 'text-muted-foreground'}`}>
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.name}</span>
          </Button>
        ))}
      </nav>
    </footer>
  )
}
