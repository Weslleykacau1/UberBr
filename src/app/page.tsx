import { PassengerView } from '@/components/passenger-view'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background max-w-md mx-auto">
      <Header />
      <main className="flex-grow relative">
        <PassengerView />
      </main>
      <Footer />
    </div>
  )
}
