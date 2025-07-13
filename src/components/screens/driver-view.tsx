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
  TrendingUp,
  CheckCircle,
  Car,
  TrendingDown,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GeminiSuggestionModal from '@/components/gemini-modal';

// Mock Data for the new UI
const driverStats = {
  todayEarnings: 156.5,
  todayRides: 8,
  weeklyEarnings: 1245.8,
  completionRate: 95,
  totalRides: 1247,
  rating: 4.8,
};

const rideRequest = {
  from: {
    address: 'Rua Democrata, 1804 (Granja Portugal, Fortaleza - CE)',
    position: [-3.768, -38.59] as [number, number],
  },
  to: {
    address: 'Rua José Pedra, 1515 (Parque Dois Irmãos, Fortaleza - CE)',
    position: [-3.79, -38.56] as [number, number],
  },
  price: 15,
  distance: 5.6,
  user: { name: 'Antônio', rating: 4.8 },
};

function StatCard({
  icon,
  label,
  value,
  trendIcon,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trendIcon?: React.ReactNode;
}) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="text-gray-400">{icon}</div>
        <div className="text-green-400">{trendIcon}</div>
      </div>
      <div>
        <p className="text-2xl font-bold mt-2">{value}</p>
        <p className="text-sm text-gray-400">{label}</p>
      </div>
    </div>
  );
}

function StatisticsView() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Estatísticas</h2>
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<DollarSign size={20} />}
          label="Ganhos Semanais"
          value={`R$ ${driverStats.weeklyEarnings.toFixed(2).replace('.', ',')}`}
          trendIcon={<TrendingUp size={16} />}
        />
        <StatCard
          icon={<CheckCircle size={20} />}
          label="Taxa Conclusão"
          value={`${driverStats.completionRate}%`}
          trendIcon={<TrendingUp size={16} />}
        />
        <StatCard
          icon={<Car size={20} />}
          label="Total Corridas"
          value={driverStats.totalRides.toString()}
          trendIcon={<TrendingUp size={16} />}
        />
        <StatCard
          icon={<Star size={20} />}
          label="Avaliação"
          value={driverStats.rating.toString()}
          trendIcon={<TrendingDown size={16} />}
        />
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Ganhos da Semana</h3>
        <div className="bg-gray-800 p-4 rounded-lg">
          <Image
            src="https://placehold.co/600x300.png"
            alt="Weekly earnings chart"
            width={600}
            height={300}
            className="w-full h-auto"
            data-ai-hint="bar chart"
          />
        </div>
      </div>
    </div>
  );
}

function HomeView() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pedido de Viagem</h2>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="h-64 w-full">
          <Image
            src="https://placehold.co/800x600.png"
            alt="Map placeholder"
            width={800}
            height={600}
            className="w-full h-full object-cover"
            data-ai-hint="map city"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex">
              <div className="p-3 bg-gray-700 rounded-full mr-4">
                <Car className="text-lime-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  R$ {Math.round(rideRequest.price / rideRequest.distance)}/km
                  ~{rideRequest.distance} km
                </p>
                <p className="text-xl font-bold">R$ {rideRequest.price}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pl-2 border-l-2 border-dashed border-lime-400 space-y-2">
            <div>
              <p className="text-xs text-gray-400">PARTIDA</p>
              <p>{rideRequest.from.address}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">DESTINO</p>
              <p>{rideRequest.to.address}</p>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="flex-1 bg-lime-400 text-gray-900 font-bold py-3 rounded-lg">
              Aceitar por R$ {rideRequest.price}
            </button>
            <button className="bg-gray-700 text-white font-bold py-3 px-4 rounded-lg">
              R$ {rideRequest.price + 2}
            </button>
            <button className="bg-gray-700 text-white font-bold py-3 px-4 rounded-lg">
              R$ {rideRequest.price + 3}
            </button>
          </div>
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
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Perfil</h2>
      <Avatar className="w-24 h-24 mx-auto mb-4">
        <AvatarImage
          src={`https://i.pravatar.cc/150?u=${user?.email}`}
          alt={user?.name}
        />
        <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
      </Avatar>
      <h3 className="text-xl font-bold">{user?.name}</h3>
      <p className="text-gray-400">{user?.email}</p>
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
  const { user, isDarkMode, toggleDarkMode } = useContext(AppContext);
  const [isOnline, setIsOnline] = useState(false);
  const [currentView, setCurrentView] = useState('statistics'); // home, statistics, wallet, profile

  if (isDarkMode === undefined) {
    return null;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'statistics':
        return <StatisticsView />;
      case 'wallet':
        return <WalletView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <StatisticsView />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      <header className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Avatar>
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
            <p className="text-xs text-gray-400">Hoje</p>
            <p className="text-xl font-bold">
              R$ {driverStats.todayEarnings.toFixed(2).replace('.', ',')}
            </p>
            <p className="text-xs text-gray-400">Ganhos</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-xs text-gray-400">Hoje</p>
            <p className="text-xl font-bold">{driverStats.todayRides}</p>
            <p className="text-xs text-gray-400">Corridas</p>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 overflow-y-auto">{renderContent()}</main>

      <footer className="bg-gray-800 p-2 flex justify-around">
        <button
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center p-2 rounded-lg w-1/4 ${
            currentView === 'home' ? 'text-lime-400' : 'text-gray-400'
          }`}
        >
          <Home />
          <span className="text-xs mt-1">Início</span>
        </button>
        <button
          onClick={() => setCurrentView('statistics')}
          className={`flex flex-col items-center p-2 rounded-lg w-1/4 ${
            currentView === 'statistics' ? 'text-lime-400' : 'text-gray-400'
          }`}
        >
          <BarChart2 />
          <span className="text-xs mt-1">Estatísticas</span>
        </button>
        <button
          onClick={() => setCurrentView('wallet')}
          className={`flex flex-col items-center p-2 rounded-lg w-1/4 ${
            currentView === 'wallet' ? 'text-lime-400' : 'text-gray-400'
          }`}
        >
          <Wallet />
          <span className="text-xs mt-1">Carteira</span>
        </button>
        <button
          onClick={() => setCurrentView('profile')}
          className={`flex flex-col items-center p-2 rounded-lg w-1/4 ${
            currentView === 'profile' ? 'text-lime-400' : 'text-gray-400'
          }`}
        >
          <User />
          <span className="text-xs mt-1">Perfil</span>
        </button>
      </footer>
    </div>
  );
}
