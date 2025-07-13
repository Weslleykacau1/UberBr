'use client';
import React, { useState, useContext } from 'react';
import Image from 'next/image';
import { AppContext } from '@/context/app-context';
import {
  Home,
  BarChart2,
  Wallet,
  User,
  Star,
  DollarSign,
  Car,
  Menu,
  ChevronDown,
  TriangleAlert,
  Layers,
  Shield,
  SlidersHorizontal,
  ClipboardCheck,
  ArrowLeft,
  History,
  PhoneCall,
  Zap,
  Luggage,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';


const driverStats = {
  todayEarnings: 156.5,
  todayRides: 8,
  rating: 4.8,
  acceptanceRate: 92,
  cancellationRate: 5,
};

const weeklyEarningsData = [
  { day: 'Seg', earnings: 120 },
  { day: 'Ter', 'Ganhos': 180 },
  { day: 'Qua', 'Ganhos': 100 },
  { day: 'Qui', 'Ganhos': 220 },
  { day: 'Sex', 'Ganhos': 250 },
  { day: 'Sáb', 'Ganhos': 190 },
  { day: 'Dom', 'Ganhos': 160 },
];

function StatisticsView({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Ganhos da Semana</h3>
        <div className="bg-gray-800 p-4 rounded-lg h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyEarningsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#333',
                  border: 'none',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff' }}
                cursor={{ fill: 'rgba(163, 230, 53, 0.1)' }}
              />
              <Bar dataKey="Ganhos" fill="#a3e635" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Métricas de Performance</h3>
        <div className="bg-gray-800 p-4 rounded-lg space-y-6">
           <div>
             <div className="flex justify-between items-center mb-1">
               <p className="text-gray-300">Taxa de Aceitação</p>
               <p className="font-semibold text-green-400">{driverStats.acceptanceRate}%</p>
             </div>
             <Progress value={driverStats.acceptanceRate} className="h-2 [&>div]:bg-green-400" />
           </div>
           <div>
             <div className="flex justify-between items-center mb-1">
               <p className="text-gray-300">Taxa de Cancelamento</p>
               <p className="font-semibold text-red-500">{driverStats.cancellationRate}%</p>
             </div>
             <Progress value={driverStats.cancellationRate} className="h-2 [&>div]:bg-red-500" />
           </div>
        </div>
      </div>
    </div>
  );
}

function HomeView({ onMenuClick }: { onMenuClick: () => void }) {
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({ flash: true, comfort: false });

  const handlePreferenceChange = (key: 'flash' | 'comfort') => {
    setPreferences(prev => ({...prev, [key]: !prev[key]}));
  };

  return (
    <div className="relative h-full w-full bg-gray-800 text-white">
      {/* Map Placeholder */}
      <div className="absolute inset-0 z-0">
        <Image src="https://placehold.co/600x1200.png" layout="fill" objectFit="cover" alt="Map placeholder" data-ai-hint="map city" />
      </div>

      {/* Top UI Elements */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
        <button onClick={onMenuClick} className="bg-white p-2.5 rounded-full shadow-lg relative">
          <Menu size={24} className="text-black" />
          <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-red-500 border-2 border-white"></span>
        </button>
        <button className="bg-gray-900 text-white px-6 py-2.5 rounded-full shadow-lg flex items-center font-bold text-lg">
          R$0,00 <ChevronDown size={20} className="ml-1" />
        </button>
      </div>

      {/* Side Action Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10 flex flex-col space-y-3">
        <button className="bg-white p-3 rounded-full shadow-lg"><TriangleAlert className="text-black" /></button>
        <button className="bg-white p-3 rounded-full shadow-lg"><Layers className="text-black" /></button>
      </div>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="absolute bottom-1/2 left-4 z-10">
              <button className="bg-white p-3 rounded-full shadow-lg"><Shield className="text-red-600" /></button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ligar para a polícia?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação tentará iniciar uma chamada para o número de emergência 190. Use apenas em caso de emergência real.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => window.location.href = 'tel:190'}>
              <PhoneCall className="mr-2" /> Ligar para 190
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Ride Preferences Modal */}
      <AlertDialog open={showPreferences} onOpenChange={setShowPreferences}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Preferências de Corrida</AlertDialogTitle>
            <AlertDialogDescription>
              Selecione os tipos de corrida que você deseja receber.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4 space-y-4">
             <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                <Checkbox id="flash" checked={preferences.flash} onCheckedChange={() => handlePreferenceChange('flash')}/>
                <Label htmlFor="flash" className="flex items-center gap-2 cursor-pointer text-base">
                  <Zap className="text-yellow-400" />
                  <div>
                    <p className="font-semibold">Corrida Flash</p>
                    <p className="text-xs text-gray-400">Viagens rápidas, sem porta-malas grande.</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                <Checkbox id="comfort" checked={preferences.comfort} onCheckedChange={() => handlePreferenceChange('comfort')} />
                <Label htmlFor="comfort" className="flex items-center gap-2 cursor-pointer text-base">
                  <Luggage className="text-blue-400" />
                  <div>
                    <p className="font-semibold">Corrida Conforto</p>
                    <p className="text-xs text-gray-400">Viagens com porta-malas grande.</p>
                  </div>
                </Label>
              </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowPreferences(false)}>Salvar Preferências</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-white text-black p-4 rounded-t-2xl shadow-[-2px_-5px_15px_rgba(0,0,0,0.2)]">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>
        <div className="flex items-center justify-between">
          <button onClick={() => setShowPreferences(true)} className="p-3"><SlidersHorizontal size={28} /></button>
          <button className="flex-1 bg-yellow-400 text-black font-bold text-lg py-3 rounded-full mx-4">Conectar</button>
          <button className="p-3"><History size={28} /></button>
        </div>
      </div>
    </div>
  );
}


function WalletView() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Carteira</h2>
      <div className="bg-gray-800 p-6 rounded-xl mb-4 text-center">
        <p className="text-gray-400 text-sm">Saldo</p>
        <p className="text-4xl font-bold my-2">R$ 4,71</p>
        <button className="w-full bg-lime-400 text-gray-900 font-bold py-3 rounded-lg mt-2">
          Recarregar
        </button>
      </div>
      <div className="bg-gray-800 p-6 rounded-xl text-center">
        <p className="text-gray-400 text-sm">Saques</p>
        <p className="text-4xl font-bold my-2">R$ 0,00</p>
        <p className="text-gray-500">Nada a retirar ainda</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg mt-4 flex justify-between items-center cursor-pointer">
        <p className="font-semibold">Formas de pagamento</p>
        <span className="text-gray-400">{'>'}</span>
      </div>
    </div>
  );
}

function ProfileView() {
  const { user, handleLogout } = useContext(AppContext);
  return (
    <div className="text-center p-4">
      <h2 className="text-2xl font-bold mb-4">Perfil</h2>
      <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-lime-400">
        <AvatarImage
          src={`https://i.pravatar.cc/150?u=${user?.email}`}
          alt={user?.name}
        />
        <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
      </Avatar>
      <h3 className="text-xl font-bold">{user?.name}</h3>
      <p className="text-gray-400">{user?.email}</p>
      <div className="mt-6 bg-gray-800 p-4 rounded-lg">
        <div className="flex justify-around text-center">
          <div>
            <p className="text-2xl font-bold">{driverStats.rating}</p>
            <p className="text-sm text-gray-400">Avaliação</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{driverStats.acceptanceRate}%</p>
            <p className="text-sm text-gray-400">Aceitação</p>
          </div>
           <div>
            <p className="text-2xl font-bold">{driverStats.cancellationRate}%</p>
            <p className="text-sm text-gray-400">Cancelamento</p>
          </div>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg"
      >
        Sair
      </button>
    </div>
  );
}

export default function DriverView() {
  const { user } = useContext(AppContext);
  const [isOnline, setIsOnline] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onMenuClick={() => setCurrentView('statistics')} />;
      case 'statistics':
        return <StatisticsView onBack={() => setCurrentView('home')} />;
      case 'wallet':
        return <WalletView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeView onMenuClick={() => setCurrentView('statistics')} />;
    }
  };

  const FullScreenContent = ['home'];

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {!FullScreenContent.includes(currentView) && (
      <header className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
             {currentView === 'statistics' && (
                <button onClick={() => setCurrentView('home')} className="mr-2">
                    <ArrowLeft />
                </button>
            )}
            <Avatar className="border-2 border-lime-400">
              <AvatarImage
                src={`https://i.pravatar.cc/150?u=${user?.email}`}
                alt={user?.name}
              />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-bold">Olá, {user?.name || 'Motorista'}</h1>
              <div className="flex items-center gap-1 text-sm text-yellow-400">
                <Star size={14} className="fill-current" />
                <span>{driverStats.rating}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-semibold ${
                isOnline ? 'text-lime-400' : 'text-gray-400'
              }`}
            >
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <Switch
              checked={isOnline}
              onCheckedChange={setIsOnline}
              aria-readonly
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-xs text-gray-400 flex items-center justify-center gap-1"><DollarSign size={14}/> Hoje</p>
            <p className="text-2xl font-bold">
              R$ {driverStats.todayEarnings.toFixed(2).replace('.', ',')}
            </p>
            <p className="text-xs text-gray-400">Ganhos</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-xs text-gray-400 flex items-center justify-center gap-1"><Car size={14}/> Hoje</p>
            <p className="text-2xl font-bold">{driverStats.todayRides}</p>
            <p className="text-xs text-gray-400">Corridas</p>
          </div>
        </div>
      </header>
      )}

      <main className="flex-grow overflow-y-auto p-4">
        {renderContent()}
      </main>

      {FullScreenContent.includes(currentView) ? null : (
        <footer className="bg-gray-800 p-2 flex justify-around">
          <button
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center p-2 rounded-lg w-1/3 ${
              currentView === 'home' ? 'text-lime-400' : 'text-gray-400'
            }`}
          >
            <Home />
            <span className="text-xs mt-1">Início</span>
          </button>
          <button
            onClick={() => setCurrentView('wallet')}
            className={`flex flex-col items-center p-2 rounded-lg w-1/3 ${
              currentView === 'wallet' ? 'text-lime-400' : 'text-gray-400'
            }`}
          >
            <Wallet />
            <span className="text-xs mt-1">Carteira</span>
          </button>
          <button
            onClick={() => setCurrentView('profile')}
            className={`flex flex-col items-center p-2 rounded-lg w-1/3 ${
              currentView === 'profile' ? 'text-lime-400' : 'text-gray-400'
            }`}
          >
            <User />
            <span className="text-xs mt-1">Perfil</span>
          </button>
        </footer>
      )}
    </div>
  );
}
