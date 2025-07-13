import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Star, Ticket, Users, ShieldAlert, HelpCircle, Settings, User, Car, LogOut, ChevronRight } from "lucide-react"

const menuItems = [
    { icon: Ticket, text: "Promoções", subtext: "Cupons e descontos" },
    { icon: Users, text: "Indicar Amigos", subtext: "Ganhe créditos indicando" },
    { icon: ShieldAlert, text: "Contatos de Emergência", subtext: "Configure seus contatos" },
    { icon: HelpCircle, text: "Ajuda e Suporte", subtext: "Central de ajuda" },
    { icon: Settings, text: "Configurações", subtext: "Preferências do app" },
]

const accountItems = [
    { icon: User, text: "Perfil", subtext: "Editar informações pessoais" },
]

export function Sidebar({ toggleView }: { toggleView: () => void }) {
    return (
        <div className="flex flex-col h-full bg-secondary">
            <div className="bg-primary text-primary-foreground p-4">
                <div className="flex items-center gap-4">
                    <Avatar className="w-14 h-14 border-2 border-primary-foreground/50">
                        <AvatarImage src="https://placehold.co/56x56.png" data-ai-hint="smiling woman" />
                        <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-lg font-semibold">Ana Silva</h2>
                        <div className="flex items-center text-sm gap-2">
                           <div className="flex items-center gap-1">
                             <Star className="w-4 h-4 fill-current text-yellow-300" />
                             <span>4,9</span>
                           </div>
                           <span className="text-xs">127 viagens</span>
                        </div>
                    </div>
                </div>
                <p className="text-sm mt-2 opacity-80">ana.silva@email.com</p>
            </div>
            <nav className="flex-grow p-4 overflow-y-auto">
                <ul className="space-y-2">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <a href="#" className="flex items-center gap-4 p-2 rounded-lg hover:bg-background/50">
                                <div className="p-2 bg-background/50 rounded-lg">
                                    <item.icon className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-medium text-sm">{item.text}</p>
                                    <p className="text-xs text-muted-foreground">{item.subtext}</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            </a>
                        </li>
                    ))}
                </ul>
                <Separator className="my-4" />
                <ul className="space-y-2">
                    {accountItems.map((item, index) => (
                        <li key={index}>
                            <a href="#" className="flex items-center gap-4 p-2 rounded-lg hover:bg-background/50">
                                <div className="p-2 bg-background/50 rounded-lg">
                                    <item.icon className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-medium text-sm">{item.text}</p>
                                    <p className="text-xs text-muted-foreground">{item.subtext}</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            </a>
                        </li>
                    ))}
                     <li>
                        <button onClick={toggleView} className="w-full flex items-center gap-4 p-2 rounded-lg hover:bg-background/50">
                            <div className="p-2 bg-background/50 rounded-lg">
                                <Car className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-grow text-left">
                                <p className="font-medium text-sm">Modo Motorista</p>
                                <p className="text-xs text-muted-foreground">Alternar para motorista</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </button>
                    </li>
                </ul>
                <Separator className="my-4" />
                <ul>
                    <li>
                        <a href="#" className="flex items-center gap-4 p-2 rounded-lg hover:bg-red-900/20">
                            <div className="p-2 bg-red-900/20 rounded-lg">
                                <LogOut className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="flex-grow">
                                <p className="font-medium text-sm text-red-500">Sair</p>
                                <p className="text-xs text-muted-foreground">Fazer logout da conta</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="p-4 border-t">
                <p className="text-center text-xs text-muted-foreground">BrasilRide v1.0.0</p>
            </div>
        </div>
    )
}
