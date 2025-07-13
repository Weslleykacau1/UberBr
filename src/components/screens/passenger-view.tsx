'use client';
import React, { useState, useContext } from 'react';
import { AppContext } from '@/context/app-context';
import { Search, Calendar, Clock, Car, Package, User, Grid2x2, Home, BarChart2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

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
        <div className="bg-primary/10 hover:bg-primary/20 p-4 rounded-lg text-primary">
            {icon}
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
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
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                                <input
                                    type="text"
                                    placeholder="Aonde você está indo?"
                                    className="w-full bg-card border-border shadow-sm rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>

                        {/* Recent Destinations */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-secondary cursor-pointer">
                                <div className="bg-secondary p-2 rounded-full"><Clock size={20} className="text-muted-foreground" /></div>
                                <div>
                                    <p className="font-semibold">Rua Torreon, 220 - Potira II</p>
                                    <p className="text-sm text-muted-foreground">Caucaia - CE, 61650-375</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-secondary cursor-pointer">
                                <div className="bg-secondary p-2 rounded-full"><Clock size={20} className="text-muted-foreground" /></div>
                                <div>
                                    <p className="font-semibold">Terminal Rodoviário Eng. João Thomé</p>
                                    <p className="text-sm text-muted-foreground">Av. Deputado Oswaldo Studart, 761 - Fátima</p>
                                </div>
                            </div>
                        </div>

                        {/* Business Profile Card */}
                         <div className="bg-blue-600 text-white rounded-xl p-4 flex items-center justify-between overflow-hidden relative shadow-lg">
                            <div className="z-10">
                                <h3 className="font-bold text-lg">Your business profile</h3>
                                <Button variant="secondary" className="mt-3 bg-white/20 hover:bg-white/30 text-white font-semibold py-1.5 px-4 rounded-full text-sm h-auto">Ver vantagens</Button>
                            </div>
                            <div className="absolute right-0 bottom-0 w-1/2 h-full">
                                <Image src="https://placehold.co/300x200.png" layout="fill" objectFit="cover" alt="Business profile illustration" data-ai-hint="business travel" className="opacity-80" />
                            </div>
                        </div>

                        {/* Suggestions */}
                        <div>
                             <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">Sugestões</h3>
                                <button className="text-sm font-semibold text-primary">Ver tudo</button>
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
                             <div className="bg-card rounded-xl h-24 w-full shadow-sm">
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
        <button onClick={() => setActiveTab(tabName)} className={`flex flex-col items-center space-y-1 w-full p-2 rounded-lg transition-colors ${activeTab === tabName ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}>
            {icon}
            <span className="text-xs font-bold">{label}</span>
        </button>
    );

    return (
        <div className="h-full flex flex-col bg-background text-foreground">
            <header className="p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Olá, {user?.name || 'Passageiro'}!</h1>
                <Button onClick={handleLogout} variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10">Sair</Button>
            </header>
            <main className="flex-grow overflow-y-auto">
                {renderContent()}
            </main>
            <footer className="bg-card p-2 flex justify-around border-t shadow-[0_-2px_5px_-3px_rgba(0,0,0,0.05)]">
                <NavButton tabName="home" icon={<Home />} label="Início" />
                <NavButton tabName="options" icon={<Grid2x2 />} label="Opções" />
                <NavButton tabName="activity" icon={<BarChart2 />} label="Atividade" />
                <NavButton tabName="account" icon={<User />} label="Conta" />
            </footer>
        </div>
    );
}
