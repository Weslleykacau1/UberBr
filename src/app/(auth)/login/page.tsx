'use client';
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Car, LogIn } from 'lucide-react';
import { AppContext } from '@/context/app-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, setScreen } = useContext(AppContext);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };
  
  const handleBack = () => {
    setScreen('welcome');
    router.push('/');
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-900 p-4 relative text-white">
      <button onClick={handleBack} className="absolute top-6 left-6 text-lime-400 hover:text-lime-500 p-2 rounded-full bg-gray-800"><ArrowLeft size={24} /></button>
      <Car size={60} className="text-lime-400 mb-6" />
      <h1 className="text-4xl font-bold text-white mb-2">Bem-vindo de volta</h1>
      <p className="text-gray-400 mb-8">Faça login para continuar</p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-800 border-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-lime-400" id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">Senha</label>
          <input className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-800 border-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-lime-400" id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="flex flex-col items-center justify-between">
          <button className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105" type="submit"><LogIn className="inline-block mr-2" /> Entrar</button>
          <button onClick={() => router.push('/register')} className="inline-block align-baseline font-bold text-sm text-lime-400 hover:text-lime-500 mt-4">Não tem uma conta? Cadastre-se</button>
        </div>
      </form>
       <div className="w-full max-w-sm mt-6 p-3 bg-gray-800 rounded-lg text-center">
          <p className="text-gray-400 text-xs"><span className="font-bold text-lime-400">Dica de Teste:</span><br/>Use `passageiro@teste.com` ou `motorista@teste.com` com a senha `masterpass` para acesso rápido.</p>
      </div>
    </div>
  );
}
