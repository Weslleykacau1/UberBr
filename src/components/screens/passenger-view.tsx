'use client';
import React, { useState, useContext } from 'react';
import { AppContext } from '@/context/app-context';
import { Search, Calendar, Clock, Car, Package, BookOpen, User, Grid2x2, Home, BarChart2 } from 'lucide-react';
import Image from 'next/image';

const MotorcycleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M5.5 17.5a2.5 2.5 0 0 0 5 0" />
        <path d="M15 17.5a2.5 2.5 0 0 0 5 0" />
        <path d="M15 17.5H5.5l1.5-5H12l4-5h2.5" />
        <path d="M7 6l2-3h3.5" />
    </svg>
);

const SuggestionButton = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <button className="flex flex-col items-center justify-center space-y-2">
        <div className="bg-gray-700 p-4 rounded-lg">
            {icon}
        </div>
        <span className="text-sm font-medium text-gray-200">{label}</span>
    </button>
);

export default function PassengerView() {
    const { user, handleLogout, isDarkMode, toggleDarkMode } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('home');
    
    if (isDarkMode === undefined) {
        return null;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return (
                    <div className="p-4 space-y-6">
                        {/* Search and Schedule */}
                        <div className="flex items-center space-x-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Aonde você está indo?"
                                    className="w-full bg-gray-800 border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-lime-400"
                                />
                            </div>
                            <button className="flex items-center bg-gray-800 px-4 py-3 rounded-lg text-sm font-semibold">
                                <Calendar size={16} className="mr-2" />
                                Mais tarde
                            </button>
                        </div>

                        {/* Recent Destinations */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-4">
                                <div className="bg-gray-700 p-2 rounded-full"><Clock size={20} className="text-gray-300" /></div>
                                <div>
                                    <p className="font-semibold">Rua Torreon, 220 - Potira II</p>
                                    <p className="text-sm text-gray-400">Caucaia - CE, 61650-375</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="bg-gray-700 p-2 rounded-full"><Clock size={20} className="text-gray-300" /></div>
                                <div>
                                    <p className="font-semibold">Terminal Rodoviário Eng. João Thomé</p>
                                    <p className="text-sm text-gray-400">Av. Deputado Oswaldo Studart, 761 - Fátima</p>
                                </div>
                            </div>
                        </div>

                        {/* Business Profile Card */}
                         <div className="bg-blue-600 rounded-xl p-4 flex items-center justify-between overflow-hidden relative">
                            <div className="z-10">
                                <h3 className="font-bold text-lg">Your business profile</h3>
                                <button className="mt-3 bg-gray-900/50 text-white font-semibold py-1.5 px-4 rounded-full text-sm">Ver vantagens</button>
                            </div>
                            <div className="absolute right-0 bottom-0 w-1/2 h-full">
                                <Image src="https://placehold.co/300x200.png" layout="fill" objectFit="cover" alt="Business profile illustration" data-ai-hint="business travel" className="opacity-80" />
                            </div>
                        </div>

                        {/* Suggestions */}
                        <div>
                             <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">Sugestões</h3>
                                <button className="text-sm font-semibold text-lime-400">Ver tudo</button>
                            </div>
                            <div className="grid grid-cols-4 gap-4 text-center">
                                <SuggestionButton icon={<Car size={24} />} label="Viagem" />
                                <SuggestionButton icon={<Package size={24} />} label="Envios" />
                                <SuggestionButton icon={<MotorcycleIcon />} label="Moto" />
                                <SuggestionButton icon={<Calendar className="text-red-400" />} label="Reserve" />
                            </div>
                        </div>
                        
                        {/* Daily Savings */}
                        <div>
                             <h3 className="text-xl font-bold mb-3">Economize todos os dias</h3>
                             <div className="bg-gray-800 rounded-xl h-24 w-full">
                                 <Image src="https://placehold.co/600x200.png" layout="responsive" width={600} height={200} objectFit="cover" alt="Daily savings banner" data-ai-hint="promotional banner" className="rounded-xl"/>
                             </div>
                        </div>

                    </div>
                );
            case 'options': return <div className="p-4 text-center">Opções</div>;
            case 'activity': return <div className="p-4 text-center">Atividade</div>;
            case 'account': return <div className="p-4 text-center">Conta</div>;
            default: return null;
        }
    }

    const NavButton = ({ tabName, icon, label }: { tabName: string, icon: React.ReactNode, label: string }) => (
        <button onClick={() => setActiveTab(tabName)} className={`flex flex-col items-center space-y-1 ${activeTab === tabName ? 'text-lime-400' : 'text-gray-400'}`}>
            {icon}
            <span className="text-xs font-bold">{label}</span>
        </button>
    );

    return (
        <div className="h-full flex flex-col bg-gray-900 text-white">
            <header className="p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Olá, {user?.name || 'Passageiro'}!</h1>
                <button onClick={handleLogout} className="text-sm font-semibold text-red-500">Sair</button>
            </header>
            <main className="flex-grow overflow-y-auto">
                {renderContent()}
            </main>
            <footer className="bg-gray-800 p-3 flex justify-around border-t border-gray-700">
                <NavButton tabName="home" icon={<Home />} label="Início" />
                <NavButton tabName="options" icon={<Grid2x2 />} label="Opções" />
                <NavButton tabName="activity" icon={<BarChart2 />} label="Atividade" />
                <NavButton tabName="account" icon={<User />} label="Conta" />
            </footer>
        </div>
    );
}