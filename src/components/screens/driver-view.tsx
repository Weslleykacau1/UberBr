'use client';
import React, { useState, useContext } from 'react';
import Image from 'next/image';
import { AppContext } from '@/context/app-context';
import {
  Home,
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
  History,
  PhoneCall,
  Zap,
  Luggage,
  ArrowLeft
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
import { Button } from '@/components/ui/button';


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
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Ganhos da Semana</h3>
        <div className="bg-card p-4 rounded-lg h-[250px] shadow-sm">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyEarningsData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                  color: 'hsl(var(--card-foreground))'
                }}
                labelStyle={{ color: 'hsl(var(--card-foreground))' }}
                cursor={{ fill: 'hsl(var(--primary) / 0.1)' }}
              />
              <Bar dataKey="Ganhos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Métricas de Performance</h3>
        <div className="bg-card p-4 rounded-lg space-y-6 shadow-sm">
           <div>
             <div className="flex justify-between items-center mb-1">
               <p className="text-muted-foreground">Taxa de Aceitação</p>
               <p className="font-semibold text-green-500">{driverStats.acceptanceRate}%</p>
             </div>
             <Progress value={driverStats.acceptanceRate} className="h-2 [&>div]:bg-green-500" />
           </div>
           <div>
             <div className="flex justify-between items-center mb-1">
               <p className="text-muted-foreground">Taxa de Cancelamento</p>
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
    <div className="relative h-full w-full bg-secondary text-foreground">
      <div className="absolute inset-0 z-0">
        <Image src="https://placehold.co/600x1200.png" layout="fill" objectFit="cover" alt="Map placeholder" data-ai-hint="map city" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>

      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
        <Button onClick={onMenuClick} size="icon" className="bg-card text-card-foreground rounded-full shadow-lg">
          <Menu size={20} />
        </Button>
        <Button className="bg-card text-card-foreground px-6 py-2.5 rounded-full shadow-lg font-bold text-lg">
          R$0,00 <ChevronDown size={20} className="ml-1" />
        </Button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10 flex flex-col space-y-3">
        <Button size="icon" className="bg-card text-card-foreground rounded-full shadow-lg"><TriangleAlert /></Button>
        <Button size="icon" className="bg-card text-card-foreground rounded-full shadow-lg"><Layers /></Button>
      </div>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="absolute bottom-1/2 left-4 z-10">
              <Button size="icon" className="bg-card text-destructive rounded-full shadow-lg"><Shield /></Button>
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

      <AlertDialog open={showPreferences} onOpenChange={setShowPreferences}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Preferências de Corrida</AlertDialogTitle>
            <AlertDialogDescription>
              Selecione os tipos de corrida que você deseja receber.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4 space-y-4">
             <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                <Checkbox id="flash" checked={preferences.flash} onCheckedChange={() => handlePreferenceChange('flash')}/>
                <Label htmlFor="flash" className="flex items-center gap-2 cursor-pointer text-base w-full">
                  <Zap className="text-yellow-500" />
                  <div>
                    <p className="font-semibold">Corrida Flash</p>
                    <p className="text-xs text-muted-foreground">Viagens rápidas, sem porta-malas grande.</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                <Checkbox id="comfort" checked={preferences.comfort} onCheckedChange={() => handlePreferenceChange('comfort')} />
                <Label htmlFor="comfort" className="flex items-center gap-2 cursor-pointer text-base w-full">
                  <Luggage className="text-blue-500" />
                  <div>
                    <p className="font-semibold">Corrida Conforto</p>
                    <p className="text-xs text-muted-foreground">Viagens com porta-malas grande.</p>
                  </div>
                </Label>
              </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowPreferences(false)}>Salvar Preferências</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      <div className="absolute bottom-0 left-0 right-0 z-10 bg-card text-card-foreground p-4 rounded-t-2xl shadow-[0_-5px_15px_-3px_rgba(0,0,0,0.1)]">
        <div className="w-12 h-1.5 bg-border rounded-full mx-auto mb-4"></div>
        <div className="flex items-center justify-between">
          <Button onClick={() => setShowPreferences(true)} size="icon" variant="ghost" className="rounded-full"><SlidersHorizontal /></Button>
          <Button className="flex-1 bg-primary text-primary-foreground font-bold text-lg py-3 h-auto rounded-full mx-4">Conectar</Button>
          <Button size="icon" variant="ghost" className="rounded-full"><History /></Button>
        </div>
      </div>
    </div>
  );
}


function WalletView() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Carteira</h2>
      <div className="bg-card p-6 rounded-xl shadow-sm text-center">
        <p className="text-muted-foreground text-sm">Saldo</p>
        <p className="text-4xl font-bold my-2">R$ 4,71</p>
        <Button className="w-full mt-2">
          Recarregar
        </Button>
      </div>
      <div className="bg-card p-6 rounded-xl shadow-sm text-center">
        <p className="text-muted-foreground text-sm">Saques</p>
        <p className="text-4xl font-bold my-2">R$ 0,00</p>
        <p className="text-muted-foreground">Nada a retirar ainda</p>
      </div>
      <div className="bg-card p-4 rounded-lg flex justify-between items-center cursor-pointer shadow-sm">
        <p className="font-semibold">Formas de pagamento</p>
        <span className="text-muted-foreground">{'>'}</span>
      </div>
    </div>
  );
}

function ProfileView() {
  const { user, handleLogout } = useContext(AppContext);
  return (
    <div className="text-center p-4">
      <h2 className="text-2xl font-bold mb-4">Perfil</h2>
      <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
        <AvatarImage
          src={`https://i.pravatar.cc/150?u=${user?.email}`}
          alt={user?.name}
        />
        <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
      </Avatar>
      <h3 className="text-xl font-bold">{user?.name}</h3>
      <p className="text-muted-foreground">{user?.email}</p>
      <div className="mt-6 bg-card p-4 rounded-lg shadow-sm">
        <div className="flex justify-around text-center">
          <div>
            <p className="text-2xl font-bold">{driverStats.rating}</p>
            <p className="text-sm text-muted-foreground">Avaliação</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{driverStats.acceptanceRate}%</p>
            <p className="text-sm text-muted-foreground">Aceitação</p>
          </div>
           <div>
            <p className="text-2xl font-bold">{driverStats.cancellationRate}%</p>
            <p className="text-sm text-muted-foreground">Cancelamento</p>
          </div>
        </div>
      </div>
      <Button
        onClick={handleLogout}
        variant="destructive"
        className="mt-8 w-full"
      >
        Sair
      </Button>
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
    <div className="h-full flex flex-col bg-background text-foreground">
      {!FullScreenContent.includes(currentView) && (
      <header className="p-4 bg-card shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
             {currentView === 'statistics' && (
                <button onClick={() => setCurrentView('home')} className="mr-2">
                    <ArrowLeft />
                </button>
            )}
            <Avatar className="border-2 border-primary">
              <AvatarImage
                src={`https://i.pravatar.cc/150?u=${user?.email}`}
                alt={user?.name}
              />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-bold">Olá, {user?.name || 'Motorista'}</h1>
              <div className="flex items-center gap-1 text-sm text-yellow-500">
                <Star size={14} className="fill-current" />
                <span>{driverStats.rating}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-semibold ${
                isOnline ? 'text-primary' : 'text-muted-foreground'
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
          <div className="bg-background p-3 rounded-lg border">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1"><DollarSign size={14}/> Hoje</p>
            <p className="text-2xl font-bold">
              R$ {driverStats.todayEarnings.toFixed(2).replace('.', ',')}
            </p>
            <p className="text-xs text-muted-foreground">Ganhos</p>
          </div>
          <div className="bg-background p-3 rounded-lg border">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Car size={14}/> Hoje</p>
            <p className="text-2xl font-bold">{driverStats.todayRides}</p>
            <p className="text-xs text-muted-foreground">Corridas</p>
          </div>
        </div>
      </header>
      )}

      <main className="flex-grow overflow-y-auto">
        {renderContent()}
      </main>

      {FullScreenContent.includes(currentView) ? null : (
        <footer className="bg-card p-2 flex justify-around border-t">
          <button
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center p-2 rounded-lg w-1/3 ${
              currentView === 'home' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Home />
            <span className="text-xs mt-1">Início</span>
          </button>
          <button
            onClick={() => setCurrentView('wallet')}
            className={`flex flex-col items-center p-2 rounded-lg w-1/3 ${
              currentView === 'wallet' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Wallet />
            <span className="text-xs mt-1">Carteira</span>
          </button>
          <button
            onClick={() => setCurrentView('profile')}
            className={`flex flex-col items-center p-2 rounded-lg w-1/3 ${
              currentView === 'profile' ? 'text-primary' : 'text-muted-foreground'
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
