'use client';
import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Car, LogIn } from 'lucide-react';
import { AppContext } from '@/context/app-context';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { handleLogin, setScreen } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password, rememberMe);
  };
  
  const handleBack = () => {
    setScreen('welcome');
    router.push('/');
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-primary text-primary-foreground p-4 relative">
      <button onClick={handleBack} className="absolute top-6 left-6 text-primary-foreground p-2 rounded-full hover:bg-black/10"><ArrowLeft size={24} /></button>
      <Car size={60} className="mb-6" />
      <h1 className="text-4xl font-bold mb-2">Bem-vindo de volta</h1>
      <p className="opacity-80 mb-8">Faça login para continuar</p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 opacity-80" htmlFor="email">Email</label>
          <input className="shadow appearance-none border rounded w-full py-3 px-4 bg-primary-foreground/10 border-primary-foreground/20 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-primary-foreground" id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 opacity-80" htmlFor="password">Senha</label>
          <input className="shadow appearance-none border rounded w-full py-3 px-4 bg-primary-foreground/10 border-primary-foreground/20 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-primary-foreground" id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="flex items-center space-x-2 mb-6">
            <Checkbox id="remember-me" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked as boolean)} className="border-primary-foreground data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary" />
            <Label htmlFor="remember-me" className="font-normal opacity-80">Lembrar login</Label>
        </div>
        <div className="flex flex-col items-center justify-between">
          <button className="w-full bg-primary-foreground hover:bg-white/90 text-primary font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105" type="submit"><LogIn className="inline-block mr-2" /> Entrar</button>
          <button onClick={() => router.push('/register')} className="inline-block align-baseline font-bold text-sm hover:underline mt-4">Não tem uma conta? Cadastre-se</button>
        </div>
      </form>
       <div className="w-full max-w-sm mt-6 p-3 bg-black/20 rounded-lg text-center">
          <p className="text-xs opacity-80"><span className="font-bold">Dica de Teste:</span><br/>Use `passageiro@teste.com` ou `motorista@teste.com` com a senha `masterpass` para acesso rápido.</p>
      </div>
    </div>
  );
}
