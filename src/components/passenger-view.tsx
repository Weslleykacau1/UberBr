"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Map } from "@/components/map"
import { Car, Search, Clock, Wallet } from "lucide-react"

const rideOptions = [
  { name: 'BrasilRide X', eta: '5 min', price: 'R$ 15,90', icon: 'https://placehold.co/48x48.png', hint: 'standard car' },
  { name: 'BrasilRide Comfort', eta: '7 min', price: 'R$ 22,50', icon: 'https://placehold.co/48x48.png', hint: 'luxury car' },
  { name: 'BrasilRide Black', eta: '6 min', price: 'R$ 35,00', icon: 'https://placehold.co/48x48.png', hint: 'black suv' },
]

export function PassengerView() {
  const [destination, setDestination] = useState('')
  const [selectedRide, setSelectedRide] = useState<string | null>(null)

  return (
    <div className="h-full w-full">
      <Map />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <Card className="max-w-md mx-auto shadow-2xl">
          <CardContent className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Para onde vamos?" 
                className="pl-10 text-lg h-12"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value)
                  if (!e.target.value) {
                    setSelectedRide(null)
                  }
                }}
              />
            </div>
            
            {destination ? (
              <div className="flex flex-col gap-4 animate-in fade-in duration-300">
                <h3 className="font-semibold text-lg">Escolha sua viagem</h3>
                <ul className="space-y-2">
                  {rideOptions.map((ride) => (
                    <li key={ride.name}>
                      <button 
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all ${selectedRide === ride.name ? 'border-primary bg-primary/10' : 'border-border hover:bg-accent/10'}`}
                        onClick={() => setSelectedRide(ride.name)}
                      >
                        <div className="flex items-center gap-4">
                          <Image src={ride.icon} width={48} height={48} alt={ride.name} data-ai-hint={ride.hint} className="rounded-full" />
                          <div className="flex-grow">
                            <p className="font-bold">{ride.name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{ride.eta}</span>
                            </div>
                          </div>
                          <p className="font-bold text-lg">{ride.price}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
                <Separator />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Wallet className="w-5 h-5" />
                      <span className="font-medium">Pix</span>
                    </div>
                    <Button variant="link" size="sm">Alterar</Button>
                </div>
                <Button size="lg" className="w-full h-12 text-lg" disabled={!selectedRide}>
                  Confirmar {selectedRide || ''}
                </Button>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <p className="font-medium">Busque um destino para ver as opções.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
