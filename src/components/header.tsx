import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BrasilRideLogo } from "@/components/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-background border-b z-10">
      <div className="flex items-center gap-2">
        <BrasilRideLogo className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold font-headline text-primary">BrasilRide</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person smiling" />
            <AvatarFallback>BR</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuItem>Viagens</DropdownMenuItem>
          <DropdownMenuItem>Pagamento</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
