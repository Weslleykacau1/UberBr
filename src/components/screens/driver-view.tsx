'use client';
import React, { useState, useContext, useEffect, Suspense } from 'react';
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
  ArrowLeft,
  X,
  FileText
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('@/components/dynamic-map'), {
    ssr: false,
    loading: () => <div className="bg-muted w-full h-full flex items-center justify-center"><p>Carregando mapa...</p></div>
});


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

const mockRideRequest = {
    id: 1,
    passenger: { name: 'Alex', rating: 4.9, avatarUrl: 'https://i.pravatar.cc/150?u=passenger@test.com' },
    from: 'Av. Bezerra de Menezes, 1850',
    to: 'Shopping Iguatemi Bosque',
    distance: '8.2 km',
    duration: '15 min',
    price: 'R$ 18,50',
};

function StatisticsView({ onBack }: { onBack: () => void }) {
  const openProofOfIncome = () => {
      window.open('https://placehold.co/800x1100.png', '_blank');
  };

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
       <div className="mt-6">
            <Button onClick={openProofOfIncome} variant="outline" className="w-full">
                <FileText className="mr-2" />
                Comprovante de rendimentos
            </Button>
        </div>
    </div>
  );
}

function HomeView({ onMenuClick, onConnect, isOnline }: { onMenuClick: () => void, onConnect: () => void, isOnline: boolean }) {
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({ flash: true, comfort: false });
  const [rideRequest, setRideRequest] = useState<typeof mockRideRequest | null>(null);
  const [showRideAlert, setShowRideAlert] = useState(false);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOnline) {
      // Simulate receiving a ride request after a delay
      timer = setTimeout(() => {
        setRideRequest(mockRideRequest);
        setShowRideAlert(true);
      }, 5000); // 5 seconds delay
    } else {
        setShowRideAlert(false);
        setRideRequest(null);
    }
    return () => clearTimeout(timer);
  }, [isOnline]);

  const handlePreferenceChange = (key: 'flash' | 'comfort') => {
    setPreferences(prev => ({...prev, [key]: !prev[key]}));
  };

  const handleAcceptRide = () => {
    setShowRideAlert(false);
    // Here you would navigate to an active ride screen
    alert("Corrida aceita! Navegando para o local de partida...");
  }

  const handleDeclineRide = () => {
      setShowRideAlert(false);
      setRideRequest(null);
  }

  return (
    <div className="relative h-full w-full bg-secondary text-foreground">
      <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="bg-muted w-full h-full flex items-center justify-center"><p>Carregando mapa...</p></div>}>
            <DynamicMap center={[-3.74, -38.54]} drivers={[{id: 1, name: 'Antônio', rating: 4.8, car: 'Fiat Cronos', distance: '5 min', position: [-3.742, -38.535]}]} userPos={[-3.74, -38.54]} />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>

      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
        <Button onClick={onMenuClick} size="icon" className="bg-card text-card-foreground rounded-full shadow-lg">
          <Menu size={20} />
        </Button>
        <Button className="bg-card text-card-foreground px-6 py-2.5 rounded-full shadow-lg font-bold text-lg">
          R${driverStats.todayEarnings.toFixed(2).replace('.',',')} <ChevronDown size={20} className="ml-1" />
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
          <Button onClick={onConnect} className={`flex-1 font-bold text-lg py-3 h-auto rounded-full mx-4 ${isOnline ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'} text-primary-foreground`}>{isOnline ? 'Desconectar' : 'Conectar'}</Button>
          <Button size="icon" variant="ghost" className="rounded-full"><History /></Button>
        </div>
      </div>

       {showRideAlert && rideRequest && (
            <div className="absolute inset-0 bg-black/60 z-20 flex items-end justify-center p-4">
                <Card className="w-full max-w-lg animate-in slide-in-from-bottom-10 duration-500">
                    <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                           <div>
                            <CardTitle className="text-2xl">Nova Solicitação de Corrida!</CardTitle>
                            <CardDescription>Você tem 30 segundos para aceitar.</CardDescription>
                           </div>
                           <Button variant="ghost" size="icon" onClick={handleDeclineRide}><X /></Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-4">
                        <div className="flex items-center space-x-4">
                           <Avatar className="w-16 h-16 border-2 border-primary">
                               <AvatarImage src={rideRequest.passenger.avatarUrl} />
                               <AvatarFallback>{rideRequest.passenger.name[0]}</AvatarFallback>
                           </Avatar>
                           <div>
                               <p className="font-bold text-lg">{rideRequest.passenger.name}</p>
                               <div className="flex items-center gap-1 text-sm text-yellow-500">
                                   <Star size={14} className="fill-current" />
                                   <span>{rideRequest.passenger.rating}</span>
                               </div>
                           </div>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">PARTIDA</p>
                            <p>{rideRequest.from}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">DESTINO</p>
                            <p>{rideRequest.to}</p>
                        </div>
                        <div className="flex justify-between items-center text-center pt-2 border-t">
                            <div><p className="font-bold text-lg">{rideRequest.distance}</p><p className="text-xs text-muted-foreground">Distância</p></div>
                             <div><p className="font-bold text-lg">{rideRequest.duration}</p><p className="text-xs text-muted-foreground">Duração</p></div>
                              <div><p className="font-bold text-lg text-primary">{rideRequest.price}</p><p className="text-xs text-muted-foreground">Ganhos</p></div>
                        </div>
                         <div className="flex gap-4 pt-4">
                            <Button onClick={handleDeclineRide} variant="outline" className="w-full">Rejeitar</Button>
                            <Button onClick={handleAcceptRide} className="w-full">Aceitar</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
       )}
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

  const handleConnectToggle = () => {
    setIsOnline(!isOnline);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onMenuClick={() => setCurrentView('statistics')} onConnect={handleConnectToggle} isOnline={isOnline} />;
      case 'statistics':
        return <StatisticsView onBack={() => setCurrentView('home')} />;
      case 'wallet':
        return <WalletView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeView onMenuClick={() => setCurrentView('statistics')} onConnect={handleConnectToggle} isOnline={isOnline} />;
    }
  };

  const FullScreenContent = ['home'];

  return (
    <div className="h-full flex flex-col bg-background text-foreground">
      {!FullScreenContent.includes(currentView) && (
      <header className="p-4 bg-card shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
             {currentView !== 'home' && (
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

    