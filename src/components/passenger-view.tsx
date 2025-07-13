"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Map } from "@/components/map"
import { Car, Minus, Plus, Briefcase, User, Home, MapPin } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const rideOptions = [
  {
    name: 'Econômico',
    description: 'Viagem básica e econômica',
    eta: '8-12 min',
    price: 12.50,
  },
  {
    name: 'Conforto',
    description: 'Carros mais novos e espaçosos',
    eta: '6-10 min',
    price: 18.75,
  },
]

const fareDetails = {
  base: 5.00,
  distance: 4.80,
  time: 2.70,
  total: 12.50,
}

export function PassengerView() {
  const [selectedRide, setSelectedRide] = useState(rideOptions[0].name)

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-grow relative">
        <Map />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button size="icon" className="bg-white text-gray-800 hover:bg-gray-100 rounded-lg shadow-md">
                <Plus className="w-5 h-5"/>
            </Button>
            <Button size="icon" className="bg-white text-gray-800 hover:bg-gray-100 rounded-lg shadow-md">
                <Minus className="w-5 h-5"/>
            </Button>
        </div>
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2">
             <Button size="icon" variant="default" className="rounded-full shadow-lg w-10 h-10">
                <Car className="w-5 h-5"/>
             </Button>
          </div>
      </div>
      <Card className="w-full rounded-t-2xl rounded-b-none shadow-2xl border-t">
        <CardContent className="p-4">
          <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="font-semibold text-lg hover:no-underline p-0 mb-4">
                Opções de viagem
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="space-y-3">
                  {rideOptions.map((ride) => (
                    <button
                      key={ride.name}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all flex items-center gap-4 ${
                        selectedRide === ride.name ? 'border-primary bg-primary/10' : 'border-transparent bg-secondary'
                      }`}
                      onClick={() => setSelectedRide(ride.name)}
                    >
                      <div className="bg-primary p-3 rounded-md">
                        <Car className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-bold">{ride.name}</p>
                        <p className="text-sm text-muted-foreground">{ride.description}</p>
                        <p className="text-xs text-muted-foreground">Tempo estimado: {ride.eta}</p>
                      </div>
                      <p className="font-bold text-lg">R$ {ride.price.toFixed(2).replace('.', ',')}</p>
                    </button>
                  ))}
                  {selectedRide && (
                    <div className="animate-in fade-in duration-300">
                      <Separator className="my-4" />
                      <h4 className="font-semibold mb-2">Detalhes da tarifa</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Tarifa base</span>
                          <span>R$ {fareDetails.base.toFixed(2).replace('.', ',')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Distância (3.2 km)</span>
                          <span>R$ {fareDetails.distance.toFixed(2).replace('.', ',')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tempo (12 min)</span>
                           <span>R$ {fareDetails.time.toFixed(2).replace('.', ',')}</span>
                        </div>
                         <Separator className="my-2" />
                        <div className="flex justify-between font-bold text-card-foreground">
                          <span>Total</span>
                          <span>R$ {fareDetails.total.toFixed(2).replace('.', ',')}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Button size="lg" className="w-full h-12 text-lg mt-4 font-bold">
             Solicitar {selectedRide}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
