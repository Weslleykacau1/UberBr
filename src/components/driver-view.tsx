"use client"

import { useState } from 'react'
import { Map } from "@/components/map"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Navigation, Rocket, Pause, Music, BarChart2, Star, TrendingUp } from 'lucide-react'

const stats = [
  { name: 'Ganhos Hoje', value: 'R$ 127,50', icon: TrendingUp },
  { name: 'Corridas', value: '8', icon: BarChart2 },
  { name: 'Avaliação', value: '4.92', icon: Star },
]

export function DriverView() {
  const [isOnline, setIsOnline] = useState(false)

  return (
    <div className="h-full w-full">
      <Map />

      <div className="absolute top-0 left-0 right-0 p-4">
        <Card className="max-w-md mx-auto shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-lg font-bold font-headline">{isOnline ? 'Você está online' : 'Você está offline'}</p>
              <p className="text-sm text-muted-foreground">{isOnline ? 'Aguardando passageiros...' : 'Fique online para receber viagens'}</p>
            </div>
            <Switch checked={isOnline} onCheckedChange={setIsOnline} aria-label="Ficar online/offline" />
          </CardContent>
        </Card>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <Card className="max-w-md mx-auto shadow-2xl animate-in slide-in-from-bottom-12 duration-500">
          <CardHeader>
            <CardTitle>Painel do Motorista</CardTitle>
            <CardDescription>Resumo do seu dia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              {stats.map(stat => (
                <div key={stat.name} className="flex flex-col items-center gap-1">
                  <stat.icon className="w-6 h-6 text-primary mb-1" />
                  <p className="font-bold text-xl">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.name}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-2">
              <Button variant="outline" className="flex-col h-20">
                <Navigation className="w-6 h-6 mb-1" />
                <span>Navegar</span>
              </Button>
              <Button variant="outline" className="flex-col h-20">
                <Rocket className="w-6 h-6 mb-1" />
                <span>Turbo</span>
              </Button>
              <Button variant="outline" className="flex-col h-20">
                <Pause className="w-6 h-6 mb-1" />
                <span>Pausar</span>
              </Button>
              <Button variant="outline" className="flex-col h-20">
                <Music className="w-6 h-6 mb-1" />
                <span>Playlist</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
