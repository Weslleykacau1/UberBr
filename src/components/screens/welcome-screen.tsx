'use client';
import { useContext } from 'react';
import { Car, User } from 'lucide-react';
import { AppContext } from '@/context/app-context';

export default function WelcomeScreen() {
    const { setScreen } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-900 p-4 text-white">
      <Car size={60} className="text-lime-400 mb-6" />
      <h1 className="text-4xl font-bold text-center mb-4">Onde a sua viagem começa</h1>
      <p className="text-gray-400 text-center mb-12">Escolha como você quer entrar.</p>
      <div className="w-full max-w-sm space-y-4">
        <button onClick={() => setScreen('login')} className="w-full bg-lime-400 text-gray-900 font-bold py-4 px-4 rounded-lg flex items-center justify-center text-lg hover:bg-lime-500 transition-transform transform hover:scale-105"><User className="mr-3" /> Entrar como Passageiro</button>
        <button onClick={() => setScreen('login')} className="w-full bg-gray-800 border-2 border-lime-400 text-lime-400 font-bold py-4 px-4 rounded-lg flex items-center justify-center text-lg hover:bg-gray-700 transition-transform transform hover:scale-105"><Car className="mr-3" /> Entrar como Motorista</button>
      </div>
      <div className="absolute bottom-10"><p className="text-gray-500"><button onClick={() => setScreen('login')} className="font-bold text-gray-500 hover:text-lime-400">Acesso Admin</button>{' | '}<button onClick={() => setScreen('register')} className="font-bold text-lime-400 hover:text-lime-500">Cadastre-se</button></p></div>
    </div>
  );
}
