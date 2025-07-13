'use client';
import { useContext } from 'react';
import { Car, User } from 'lucide-react';
import { AppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';

export default function WelcomeScreen() {
    const { setScreen } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center justify-center h-full bg-primary p-4 text-primary-foreground">
      <Car size={60} className="mb-6" />
      <h1 className="text-4xl font-bold text-center mb-4">Onde a sua viagem começa</h1>
      <p className="opacity-80 text-center mb-12">Escolha como você quer entrar.</p>
      <div className="w-full max-w-sm space-y-4">
        <Button onClick={() => setScreen('login')} className="w-full bg-primary-foreground text-primary font-bold py-4 h-auto text-lg hover:bg-white/90 transition-transform transform hover:scale-105"><User className="mr-3" /> Entrar como Passageiro</Button>
        <Button onClick={() => setScreen('login')} variant="outline" className="w-full border-2 border-primary-foreground text-primary-foreground font-bold py-4 h-auto text-lg hover:bg-primary-foreground/10 transition-transform transform hover:scale-105"><Car className="mr-3" /> Entrar como Motorista</Button>
      </div>
      <div className="absolute bottom-10 text-center">
        <p className="text-sm opacity-80">
            <button onClick={() => setScreen('login')} className="font-bold hover:underline">Acesso Admin</button>
            {' | '}
            <button onClick={() => setScreen('register')} className="font-bold hover:underline">Cadastre-se</button>
        </p>
      </div>
    </div>
  );
}
