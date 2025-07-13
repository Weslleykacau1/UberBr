'use client';
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, UserPlus, Upload } from 'lucide-react';
import { AppContext } from '@/context/app-context';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('passenger');
    const [passengerIdUrl, setPassengerIdUrl] = useState('');
    const { handleRegister, setScreen } = useContext(AppContext);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => { 
        e.preventDefault(); 
        handleRegister({ email, password, name, role, passengerIdUrl }); 
    };
    
    const handleBack = () => {
        setScreen('welcome');
        router.push('/');
    }

    return (
        <div className="flex flex-col items-center justify-center h-full bg-primary text-primary-foreground p-4 relative">
            <button onClick={handleBack} className="absolute top-6 left-6 text-primary-foreground p-2 rounded-full hover:bg-black/10"><ArrowLeft size={24} /></button>
            <UserPlus size={60} className="mb-6" />
            <h1 className="text-4xl font-bold mb-2">Crie sua Conta</h1>
            <p className="opacity-80 mb-8">Rápido e fácil</p>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 opacity-80" htmlFor="name">Nome</label>
                    <input className="shadow appearance-none border rounded w-full py-3 px-4 bg-primary-foreground/10 border-primary-foreground/20 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-primary-foreground" id="name" type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 opacity-80" htmlFor="email">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-3 px-4 bg-primary-foreground/10 border-primary-foreground/20 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-primary-foreground" id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 opacity-80" htmlFor="password">Senha</label>
                    <input className="shadow appearance-none border rounded w-full py-3 px-4 bg-primary-foreground/10 border-primary-foreground/20 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-primary-foreground" id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 opacity-80">Eu sou</label>
                    <div className="flex rounded-lg bg-black/20 p-1">
                        <button type="button" onClick={() => setRole('passenger')} className={`w-1/2 py-2 rounded-md font-semibold transition-colors ${role === 'passenger' ? 'bg-primary-foreground text-primary' : 'text-white'}`}>Passageiro</button>
                        <button type="button" onClick={() => setRole('driver')} className={`w-1/2 py-2 rounded-md font-semibold transition-colors ${role === 'driver' ? 'bg-primary-foreground text-primary' : 'text-white'}`}>Motorista</button>
                    </div>
                </div>

                {role === 'passenger' && (
                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2 opacity-80" htmlFor="passengerId">Documento de Identidade (ID)</label>
                        <p className="text-xs opacity-70 mb-2">Para sua segurança, precisamos verificar sua identidade. Você deve ter mais de 18 anos.</p>
                        <div className="flex items-center bg-primary-foreground/10 border-primary-foreground/20 border rounded py-3 px-4">
                            <Upload className="opacity-80 mr-2" size={16}/>
                            <span className="opacity-70 text-sm">Clique para enviar...</span>
                        </div>
                    </div>
                )}
                
                <div className="flex flex-col items-center justify-between">
                    <button className="w-full bg-primary-foreground hover:bg-white/90 text-primary font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105" type="submit"><UserPlus className="inline-block mr-2" /> Cadastrar</button>
                    <button onClick={() => router.push('/login')} className="inline-block align-baseline font-bold text-sm hover:underline mt-4">Já tem uma conta? Faça login</button>
                </div>
            </form>
        </div>
    );
}
