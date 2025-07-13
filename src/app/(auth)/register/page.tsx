'use client';
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { AppContext } from '@/context/app-context';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('passenger');
    const { handleRegister, setScreen } = useContext(AppContext);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => { 
        e.preventDefault(); 
        handleRegister({ email, password, name, role }); 
    };
    
    const handleBack = () => {
        setScreen('welcome');
        router.push('/');
    }

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-900 p-4 relative text-white">
            <button onClick={handleBack} className="absolute top-6 left-6 text-lime-400 hover:text-lime-500 p-2 rounded-full bg-gray-800"><ArrowLeft size={24} /></button>
            <UserPlus size={60} className="text-lime-400 mb-6" />
            <h1 className="text-4xl font-bold text-white mb-2">Crie sua Conta</h1>
            <p className="text-gray-400 mb-8">Rápido e fácil</p>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="name">Nome</label>
                    <input className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-800 border-gray-700 text-white focus:outline-none focus:shadow-outline focus:border-lime-400" id="name" type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-800 border-gray-700 text-white focus:outline-none focus:shadow-outline focus:border-lime-400" id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">Senha</label>
                    <input className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-800 border-gray-700 text-white focus:outline-none focus:shadow-outline focus:border-lime-400" id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-400 text-sm font-bold mb-2">Eu sou</label>
                    <div className="flex rounded-lg bg-gray-800 p-1">
                        <button type="button" onClick={() => setRole('passenger')} className={`w-1/2 py-2 rounded-md font-semibold transition-colors ${role === 'passenger' ? 'bg-lime-400 text-gray-900' : 'text-white'}`}>Passageiro</button>
                        <button type="button" onClick={() => setRole('driver')} className={`w-1/2 py-2 rounded-md font-semibold transition-colors ${role === 'driver' ? 'bg-lime-400 text-gray-900' : 'text-white'}`}>Motorista</button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between">
                    <button className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105" type="submit"><UserPlus className="inline-block mr-2" /> Cadastrar</button>
                    <button onClick={() => router.push('/login')} className="inline-block align-baseline font-bold text-sm text-lime-400 hover:text-lime-500 mt-4">Já tem uma conta? Faça login</button>
                </div>
            </form>
        </div>
    );
}
