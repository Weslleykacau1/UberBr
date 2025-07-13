
'use client';
import React, { useState, useContext, useEffect, Suspense } from 'react';
import { AppContext } from '@/context/app-context';
import { Search, MapPin, DollarSign, CreditCard, X, Send, User, Home, BarChart2, Repeat, Star, LifeBuoy, ChevronRight, LogOut, MessageSquare, Moon, Bell, Globe, Fingerprint, Shield, Eye, KeyRound, Car, Calendar, Map } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import PaymentOption from '@/components/payment-option';
import dynamic from 'next/dynamic';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const DynamicMap = dynamic(() => import('@/components/dynamic-map'), {
    ssr: false,
    loading: () => <div className="bg-muted w-full h-full flex items-center justify-center"><p>Carregando mapa...</p></div>
});


const rideOptions = [
  { name: 'Corrida X', price: 'R$ 13,90', eta: '5 min', icon: 'https://placehold.co/40x40.png' },
  { name: 'Comfort', price: 'R$ 18,50', eta: '7 min', icon: 'https://placehold.co/40x40.png' },
  { name: 'Black', price: 'R$ 25,00', eta: '6 min', icon: 'https://placehold.co/40x40.png' },
];

const mockRideHistory = [
  {
    id: 1,
    date: 'Hoje, 15:30',
    from: 'Shopping Iguatemi',
    to: 'Praia de Iracema',
    price: 'R$ 18,50',
    driver: { name: 'Bruno', car: 'Chevrolet Onix' },
    status: 'Concluída',
    icon: 'https://placehold.co/40x40.png',
    mapImage: 'https://placehold.co/600x400.png'
  },
  {
    id: 2,
    date: 'Ontem, 10:15',
    from: 'Av. Bezerra de Menezes, 1850',
    to: 'Aeroporto de Fortaleza',
    price: 'R$ 25,00',
    driver: { name: 'Lúcia', car: 'Hyundai HB20' },
    status: 'Concluída',
    icon: 'https://placehold.co/40x40.png',
    mapImage: 'https://placehold.co/600x400.png'
  },
  {
    id: 3,
    date: '25/06/2024',
    from: 'North Shopping',
    to: 'Terminal Papicu',
    price: 'R$ 15,00',
    driver: { name: 'Carlos', car: 'Fiat Cronos' },
    status: 'Cancelada',
    icon: 'https://placehold.co/40x40.png',
    mapImage: 'https://placehold.co/600x400.png'
  },
];


function RideRequestView({ from, to, onBack }: { from: string, to: string, onBack: () => void }) {
    const [step, setStep] = useState(1);
    const [selectedRide, setSelectedRide] = useState<typeof rideOptions[0] | null>(null);
    const [paymentMethod, setPaymentMethod] = useState('pix');
    const [rideConfirmed, setRideConfirmed] = useState(false);

    const fromPosition: [number, number] = [-3.74, -38.54];
    const toPosition: [number, number] = [-3.76, -38.52];

    const handleSelectRide = (ride: typeof rideOptions[0]) => {
        setSelectedRide(ride);
        setStep(2);
    }

    const handleConfirmPayment = () => {
        setStep(3);
    }

    const handleConfirmRide = () => {
        setRideConfirmed(true);
        // In a real app, this would trigger a request to the backend
    }
    
    if (rideConfirmed) {
        return (
             <div className="h-full flex flex-col">
                <div className="relative flex-grow">
                    <Suspense fallback={<div>Carregando mapa...</div>}>
                        <DynamicMap center={fromPosition} rideRequest={{ from: {address: from, position: fromPosition}, to: {address: to, position: toPosition} }} userPos={fromPosition} drivers={[{id: 1, name: 'Antônio', rating: 4.8, car: 'Fiat Cronos', distance: '5 min', position: [-3.742, -38.535]}]}/>
                    </Suspense>
                </div>
                <Card className="rounded-t-2xl rounded-b-none p-4 border-t-4 border-primary shadow-lg">
                    <CardContent className="p-0">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-primary">Aguardando motorista</h2>
                            <p className="text-muted-foreground mt-2">Encontramos o melhor motorista para você. Ele está a caminho!</p>
                        </div>
                        <div className="flex items-center space-x-4 p-4 mt-4 bg-secondary rounded-lg">
                            <Image src="https://i.pravatar.cc/150?u=driver@test.com" width={60} height={60} alt="Driver" className="rounded-full" />
                            <div>
                                <p className="font-bold text-lg">Bruno</p>
                                <p className="text-sm text-muted-foreground">Chevrolet Onix - ABC-1234</p>
                                <p className="text-sm font-bold text-primary">4.9 ★</p>
                            </div>
                        </div>
                         <Button onClick={onBack} className="w-full mt-4" variant="outline">Cancelar Corrida</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col">
            <div className="relative flex-grow">
                 <Suspense fallback={<div>Carregando mapa...</div>}>
                    <DynamicMap center={fromPosition} rideRequest={{ from: {address: from, position: fromPosition}, to: {address: to, position: toPosition} }} />
                </Suspense>
            </div>
            <Card className="rounded-t-2xl rounded-b-none p-4 border-t-4 border-primary shadow-lg">
                <CardContent className="p-0">
                    <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-background rounded-full shadow-md"><X size={20}/></button>
                    {step === 1 && (
                        <div>
                            <h3 className="text-xl font-bold text-center mb-4">Opções de Viagem</h3>
                            <div className="space-y-3">
                                {rideOptions.map((ride, index) => (
                                    <button key={index} onClick={() => handleSelectRide(ride)} className="w-full flex items-center justify-between p-3 bg-secondary rounded-lg text-left hover:bg-muted">
                                        <div className="flex items-center space-x-4">
                                            <Image src={ride.icon} width={40} height={40} alt={ride.name} data-ai-hint="car icon" />
                                            <div>
                                                <p className="font-bold">{ride.name}</p>
                                                <p className="text-sm text-muted-foreground">{ride.eta}</p>
                                            </div>
                                        </div>
                                        <p className="font-bold text-lg">{ride.price}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {step === 2 && selectedRide && (
                        <div>
                            <h3 className="text-xl font-bold text-center mb-4">Pagamento</h3>
                             <div className="flex items-center justify-between p-3 bg-secondary rounded-lg mb-4">
                                <div className="flex items-center space-x-4">
                                    <Image src={selectedRide.icon} width={40} height={40} alt={selectedRide.name} data-ai-hint="car icon"/>
                                    <div>
                                        <p className="font-bold">{selectedRide.name}</p>
                                        <p className="text-sm text-muted-foreground">{selectedRide.eta}</p>
                                    </div>
                                </div>
                                <p className="font-bold text-lg">{selectedRide.price}</p>
                            </div>
                            <div className="flex space-x-3 mb-6">
                                <PaymentOption icon={<DollarSign/>} label="PIX" selected={paymentMethod === 'pix'} onClick={() => setPaymentMethod('pix')} />
                                <PaymentOption icon={<CreditCard/>} label="Cartão" selected={paymentMethod === 'card'} onClick={() => setPaymentMethod('card')} />
                            </div>
                            <Button onClick={handleConfirmPayment} className="w-full text-lg h-12">Confirmar Pagamento</Button>
                        </div>
                    )}
                    {step === 3 && selectedRide && (
                         <div>
                            <h3 className="text-xl font-bold text-center mb-4">Confirmar Corrida</h3>
                            <div className="bg-secondary p-4 rounded-lg space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Partida</span>
                                    <span className="font-semibold text-right">{from}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Destino</span>
                                    <span className="font-semibold text-right">{to}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Veículo</span>
                                    <span className="font-semibold">{selectedRide.name}</span>
                                </div>
                                 <div className="flex justify-between">
                                    <span className="text-muted-foreground">Pagamento</span>
                                    <span className="font-semibold capitalize">{paymentMethod === 'pix' ? 'PIX' : 'Cartão de Crédito'}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-primary pt-2 border-t border-border">
                                    <span>Total</span>
                                    <span>{selectedRide.price}</span>
                                </div>
                            </div>
                            <Button onClick={handleConfirmRide} className="w-full text-lg h-12 mt-4 bg-primary hover:bg-primary/90">
                                <Send className="mr-2"/> Confirmar e Chamar
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}


function HomeView({ onSearch }: { onSearch: (from: string, to: string) => void }) {
    const [fromAddress, setFromAddress] = useState('Av. Bezerra de Menezes, 1850');
    const [toAddress, setToAddress] = useState('');

    const handleSearch = () => {
        if (fromAddress && toAddress) {
            onSearch(fromAddress, toAddress);
        }
    }

    return (
        <div className="p-4 space-y-6">
            <Card className="p-4 rounded-xl shadow-lg">
                <CardContent className="p-0 space-y-3">
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input
                            type="text"
                            value={fromAddress}
                            onChange={(e) => setFromAddress(e.target.value)}
                            placeholder="Endereço de partida"
                            className="w-full bg-muted border-none rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input
                            type="text"
                            value={toAddress}
                            onChange={(e) => setToAddress(e.target.value)}
                            placeholder="Aonde você quer ir?"
                            className="w-full bg-muted border-none rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                     <Button onClick={handleSearch} className="w-full text-lg h-12">Buscar corrida</Button>
                </CardContent>
            </Card>

            <div className="space-y-3">
                <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-secondary cursor-pointer">
                    <div className="bg-secondary p-2 rounded-full"><Home size={20} className="text-muted-foreground" /></div>
                    <div>
                        <p className="font-semibold">Casa</p>
                        <p className="text-sm text-muted-foreground">Rua das Flores, 123</p>
                    </div>
                </div>
                 <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-secondary cursor-pointer">
                    <div className="bg-secondary p-2 rounded-full"><BarChart2 size={20} className="text-muted-foreground" /></div>
                    <div>
                        <p className="font-semibold">Trabalho</p>
                        <p className="text-sm text-muted-foreground">Av. Principal, 456</p>
                    </div>
                </div>
            </div>

            <div className="bg-primary/10 text-primary rounded-xl p-4 flex items-center justify-between overflow-hidden relative shadow-lg">
                <div className="z-10">
                    <h3 className="font-bold text-lg">Viaje com segurança</h3>
                    <p className="text-sm opacity-90 mt-1">Nossos motoristas são verificados.</p>
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-20">
                     <User size={80} className="absolute right-0 -bottom-2"/>
                </div>
            </div>
        </div>
    );
}

function ActivityView() {
    const totalSpent = mockRideHistory.reduce((acc, ride) => ride.status === 'Concluída' ? acc + parseFloat(ride.price.replace('R$ ', '').replace(',', '.')) : acc, 0).toFixed(2);
    const completedRides = mockRideHistory.filter(ride => ride.status === 'Concluída');
    const firstRide = completedRides[0];
    const otherRides = completedRides.slice(1);

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-2xl font-bold">Suas Atividades</h2>
            <div className="grid grid-cols-2 grid-rows-auto gap-4">
                {firstRide && (
                    <Card className="col-span-2 row-span-2 relative overflow-hidden group">
                        <Image src={firstRide.mapImage} data-ai-hint="map road" alt="map of last ride" layout="fill" objectFit="cover" className="opacity-20 group-hover:opacity-30 transition-opacity"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
                        <CardContent className="relative flex flex-col justify-end h-full p-4">
                           <Badge variant={firstRide.status === 'Concluída' ? 'default' : 'destructive'} className={`absolute top-4 right-4 ${firstRide.status === 'Concluída' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{firstRide.status}</Badge>
                           <div>
                            <p className="text-sm text-muted-foreground font-semibold">ÚLTIMA CORRIDA</p>
                            <p className="text-2xl font-bold">{firstRide.to}</p>
                            <div className="flex justify-between items-end mt-2">
                                <div>
                                    <p className="text-sm text-muted-foreground">{firstRide.driver.name} • {firstRide.date}</p>
                                </div>
                                <p className="text-xl font-bold text-primary">{firstRide.price}</p>
                            </div>
                           </div>
                        </CardContent>
                    </Card>
                )}
                <Card className="col-span-1">
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base flex items-center gap-2 text-muted-foreground"><DollarSign size={18}/> Gasto Total</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <p className="text-3xl font-bold">R${totalSpent.replace('.',',')}</p>
                    </CardContent>
                </Card>
                 <Card className="col-span-1">
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base flex items-center gap-2 text-muted-foreground"><Car size={18}/> Total de Corridas</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <p className="text-3xl font-bold">{completedRides.length}</p>
                    </CardContent>
                </Card>
                
                {otherRides.map(ride => (
                     <Card key={ride.id} className="col-span-2">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="bg-secondary p-3 rounded-lg"><Car size={20} className="text-primary"/></div>
                                <div>
                                    <p className="font-bold">{ride.to}</p>
                                    <p className="text-sm text-muted-foreground">{ride.date}</p>
                                </div>
                            </div>
                            <p className="font-bold text-lg">{ride.price}</p>
                        </CardContent>
                     </Card>
                ))}

            </div>
        </div>
    );
}

const SettingsItem = ({ icon, title, description, control }: { icon: React.ReactNode, title: string, description: string, control: React.ReactNode }) => (
    <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-4">
            <div className="bg-secondary p-3 rounded-full">
                {icon}
            </div>
            <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
        {control}
    </div>
);


function AccountView({ user, onLogout }: { user: any, onLogout: () => void }) {
  const { isDarkMode, toggleDarkMode } = useContext(AppContext);
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [shareData, setShareData] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState(false);

  return (
    <div className="p-4 space-y-6 bg-background h-full">
        <h2 className="text-2xl font-bold">Perfil</h2>
      
        <Card>
            <CardHeader>
                <CardTitle>Configurações</CardTitle>
            </CardHeader>
            <CardContent className='pt-0'>
                <SettingsItem
                    icon={<Moon size={20} className="text-primary" />}
                    title="Modo Escuro"
                    description="Interface otimizada para motoristas"
                    control={<Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />}
                />
                <Separator />
                <SettingsItem
                    icon={<Bell size={20} className="text-primary" />}
                    title="Notificações"
                    description="Receber alertas de viagens e promoções"
                    control={<Switch checked={notifications} onCheckedChange={setNotifications} />}
                />
                <Separator />
                <SettingsItem
                    icon={<MapPin size={20} className="text-primary" />}
                    title="Compartilhar Localização"
                    description="Permitir rastreamento durante viagens"
                    control={<Switch checked={location} onCheckedChange={setLocation} />}
                />
                 <Separator />
                <SettingsItem
                    icon={<Globe size={20} className="text-primary" />}
                    title="Idioma"
                    description="Selecione seu idioma preferido"
                    control={
                        <Select defaultValue="pt-br">
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Idioma" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pt-br">Português</SelectItem>
                                <SelectItem value="en-us">English</SelectItem>
                            </SelectContent>
                        </Select>
                    }
                />
                 <Separator />
                 <SettingsItem
                    icon={<Fingerprint size={20} className="text-primary" />}
                    title="Autenticação Biométrica"
                    description="Proteger alterações sensíveis"
                    control={<Switch checked={biometric} onCheckedChange={setBiometric} />}
                />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Privacidade e Segurança</CardTitle>
            </CardHeader>
            <CardContent className='pt-0'>
                <SettingsItem
                    icon={<Shield size={20} className="text-primary" />}
                    title="Compartilhar dados de viagem"
                    description="Permitir análise para melhorar o serviço"
                    control={<Switch checked={shareData} onCheckedChange={setShareData} />}
                />
                 <Separator />
                <SettingsItem
                    icon={<Eye size={20} className="text-primary" />}
                    title="Visibilidade do perfil"
                    description="Mostrar perfil para outros usuários"
                    control={<Switch checked={profileVisibility} onCheckedChange={setProfileVisibility} />}
                />
            </CardContent>
        </Card>

        <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start p-6 text-base">
                <LifeBuoy className="mr-4 text-primary" /> Central de Ajuda
            </Button>
            <Button variant="outline" className="w-full justify-start p-6 text-base">
                <MessageSquare className="mr-4 text-primary" /> Falar com o Suporte
            </Button>
        </div>

        <div className="pt-4">
            <Button onClick={onLogout} variant="destructive" className="w-full text-base py-6">
                <LogOut className="mr-2" />
                Sair da Conta
            </Button>
        </div>
    </div>
  );
}


export default function PassengerView() {
    const { user, handleLogout } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('home');
    const [isRequestingRide, setIsRequestingRide] = useState(false);
    const [fromAddress, setFromAddress] = useState('');
    const [toAddress, setToAddress] = useState('');
    
    const handleSearch = (from: string, to: string) => {
        setFromAddress(from);
        setToAddress(to);
        setIsRequestingRide(true);
    };

    const handleBackToHome = () => {
        setIsRequestingRide(false);
        setFromAddress('');
        setToAddress('');
    };

    const renderContent = () => {
        if (isRequestingRide) {
            return <RideRequestView from={fromAddress} to={toAddress} onBack={handleBackToHome} />;
        }

        switch (activeTab) {
            case 'home':
                return <HomeView onSearch={handleSearch} />;
            case 'activity': return <ActivityView />;
            case 'account': return <AccountView user={user} onLogout={handleLogout} />;
            default: return <HomeView onSearch={handleSearch} />;
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
            {!isRequestingRide && activeTab !== 'account' && (
                <header className="p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Olá, {user?.name || 'Passageiro'}!</h1>
                    <Avatar className="w-10 h-10 border-2 border-primary">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.email}`} alt={user?.name} />
                        <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                    </Avatar>
                </header>
            )}
            <main className="flex-grow overflow-y-auto">
                {renderContent()}
            </main>
             {!isRequestingRide && (
                <footer className="bg-card p-2 flex justify-around border-t shadow-[0_-2px_5px_-3px_rgba(0,0,0,0.05)]">
                    <NavButton tabName="home" icon={<Home />} label="Início" />
                    <NavButton tabName="activity" icon={<BarChart2 />} label="Atividade" />
                    <NavButton tabName="account" icon={<User />} label="Conta" />
                </footer>
             )}
        </div>
    );
}


    
    