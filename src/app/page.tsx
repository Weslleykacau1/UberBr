"use client"

import { Header } from '@/components/header'
import { PassengerView } from '@/components/passenger-view'
import { DriverView } from '@/components/driver-view'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Car } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background dark:bg-zinc-950">
      <Header />
      <main className="flex-grow flex flex-col">
        <Tabs defaultValue="passenger" className="w-full flex-grow flex flex-col">
          <div className="flex justify-center py-2 bg-background dark:bg-zinc-950 border-b">
            <TabsList className="grid w-full max-w-sm grid-cols-2">
              <TabsTrigger value="passenger">
                <Users className="w-4 h-4 mr-2" />
                Passageiro
              </TabsTrigger>
              <TabsTrigger value="driver">
                <Car className="w-4 h-4 mr-2" />
                Motorista
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="passenger" className="flex-grow relative mt-0">
            <PassengerView />
          </TabsContent>
          <TabsContent value="driver" className="flex-grow relative mt-0">
            <DriverView />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
