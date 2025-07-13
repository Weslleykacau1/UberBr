"use client"

import { useState } from 'react'
import { Map } from "@/components/map"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, BarChart2, Wallet, User, Star, Car, DollarSign, Navigation, Zap, Pause, ListMusic, MapPin } from 'lucide-react'

const stats = [
  { name: 'Ganhos', value: 'R$ 156,50', icon: DollarSign, subtext: "Hoje" },
  { name: 'Corridas', value: '8', icon: Car, subtext: "Hoje" },
]

const navItems = [
  { name: 'Início', icon: Home },
  { name: 'Estatísticas', icon: BarChart2 },
  { name: 'Carteira', icon: Wallet },
  { name: 'Perfil', icon: User },
]

const quickActions = [
    { name: 'Navegação', icon: Navigation, color: 'bg-blue-500/20 text-blue-400' },
    { name: 'Turbo', icon: Zap, color: 'bg-yellow-500/20 text-yellow-400' },
    { name: 'Pausar', icon: Pause, color: 'bg-red-500/20 text-red-400' },
    { name: 'Playlist', icon: ListMusic, color: 'bg-gray-500/20 text-gray-400' },
]


export function DriverView({ toggleView }: { toggleView: () => void }) {
  const [isOnline, setIsOnline] = useState(true)

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto bg-background text-foreground">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border-2 border-primary">
            <AvatarImage src="https://placehold.co/48x48.png" data-ai-hint="smiling man" />
            <AvatarFallback>CS</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-lg">Olá, Carlos Silva</p>
            <div className="flex items-center gap-1 text-sm text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span>4.8</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <Switch checked={isOnline} onCheckedChange={setIsOnline} id="online-switch" />
            <label htmlFor="online-switch" className={`text-sm font-medium ${isOnline ? 'text-primary' : 'text-muted-foreground'}`}>
                Online
            </label>
        </div>
      </header>

      {/* Stats */}
      <section className="px-4 grid grid-cols-2 gap-4">
        {stats.map(stat => (
          <div key={stat.name} className="bg-secondary p-4 rounded-lg flex items-center gap-4">
            <div className="bg-background/50 p-3 rounded-full">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.subtext}</p>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.name}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Bottom Nav */}
      <nav className="px-4 mt-4 mb-2">
        <div className="bg-secondary rounded-xl p-2 flex justify-around items-center">
            {navItems.map((item, index) => (
                <Button key={item.name} variant="ghost" className={`flex flex-col h-auto p-2 ${index === 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                    <item.icon className="w-6 h-6 mb-1" />
                    <span className="text-xs">{item.name}</span>
                </Button>
            ))}
        </div>
      </nav>

      {/* Map Area */}
      <main className="flex-grow flex flex-col m-4 rounded-xl overflow-hidden relative">
          <Map />
          <div className="absolute top-4 left-4">
             <Button variant="secondary" className="rounded-full shadow-lg">
                <MapPin className="w-4 h-4 mr-2 fill-green-500 text-green-500"/>
                Online
             </Button>
          </div>
          <div className="absolute top-4 right-4">
            <Button size="icon" className="rounded-full bg-red-500 hover:bg-red-600 shadow-lg w-12 h-12">
                 <Star className="w-6 h-6 fill-white text-white"/>
            </Button>
          </div>
      </main>

      {/* Quick Actions */}
      <footer className="p-4 pt-0">
          <h3 className="font-semibold mb-2 px-2">Ações Rápidas</h3>
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map(action => (
                <Button key={action.name} variant="secondary" className={`flex-col h-20 text-xs ${action.color}`}>
                    <action.icon className="w-6 h-6 mb-1" />
                    <span>{action.name}</span>
                </Button>
            ))}
          </div>
      </footer>
       <button onClick={toggleView} className="text-primary p-4">
            Voltar para Passageiro
       </button>
    </div>
  )
}
