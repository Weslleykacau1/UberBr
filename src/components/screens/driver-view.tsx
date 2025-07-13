'use client';
import React, { useState, useContext } from 'react';
import dynamic from 'next/dynamic';
import { Sun, Moon, LogOut, BarChart2, Car, DollarSign, Sparkles, Star } from 'lucide-react';
import { AppContext } from '@/context/app-context';
import GeminiSuggestionModal from '@/components/gemini-modal';

const MapComponent = dynamic(() => import('@/components/dynamic-map'), { ssr: false });

const rideRequest = {
    from: { address: 'Rua Democrata, 1804 (Granja Portugal, Fortaleza - CE)', position: [-3.768, -38.59] as [number, number] },
    to: { address: 'Rua José Pedra, 1515 (Parque Dois Irmãos, Fortaleza - CE)', position: [-3.79, -38.56] as [number, number] },
    price: 15,
    distance: 5.6,
    user: { name: 'Antônio', rating: 4.8 }
};
const userPosition = [-3.74, -38.54] as [number, number];


function DriverDashboard() {
    const [dailyGoal, setDailyGoal] = useState('');
    const [showGoalModal, setShowGoalModal] = useState(false);
    const [optimizationTips, setOptimizationTips] = useState('');
    const [isLoadingTips, setIsLoadingTips] = useState(false);

    const getOptimizationTips = async () => {
        if (!dailyGoal) return;
        setIsLoadingTips(true);
        setShowGoalModal(true);
        const prompt = `Sou um motorista de aplicativo em Fortaleza, Ceará, e minha meta de ganhos para hoje é de R$${dailyGoal}. Por favor, me dê dicas e estratégias para atingir essa meta. Inclua sugestões de melhores horários para dirigir, áreas da cidade com maior demanda e qualquer outra dica útil para maximizar meus ganhos hoje. Formate como uma lista de dicas.`;
        try {
            // This is a placeholder for a real API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setOptimizationTips(`* **Horários de Pico:** Concentre-se entre 07h-09h e 17h-19h.\n* **Áreas Nobres:** Bairros como Aldeota e Meireles têm alta demanda.\n* **Eventos:** Fique de olho em shows e jogos no Castelão.`);
        } catch (error) { setOptimizationTips("Ocorreu um erro de conexão."); } 
        finally { setIsLoadingTips(false); }
    };

    return (
        <div>
            {showGoalModal && <GeminiSuggestionModal title="Dicas para sua Meta" content={optimizationTips} isLoading={isLoadingTips} onClose={() => setShowGoalModal(false)}/>}
            <div className="bg-blue-500 text-white p-4 rounded-lg mb-4"><p className="text-sm">Básico</p><div className="flex justify-between items-center mt-1"><p className="text-lg font-bold">Até Julho 13</p><div className="flex items-center bg-blue-400 px-3 py-1 rounded-full"><Star size={16} className="mr-1"/> 5.00</div></div></div>
            <div className="bg-gray-800 p-4 rounded-lg mb-4"><p className="text-gray-400">Renda de hoje</p><p className="text-3xl font-bold">R$ 0,00</p>
                <div className="mt-4"><label className="text-lime-400 font-semibold">Definir meta diária (R$)</label><div className="flex items-center space-x-2 mt-2"><input type="number" value={dailyGoal} onChange={(e) => setDailyGoal(e.target.value)} placeholder="Ex: 200" className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:border-lime-400"/><button onClick={getOptimizationTips} disabled={!dailyGoal || isLoadingTips} className="bg-lime-400 text-gray-900 px-4 py-2 rounded-lg font-bold flex items-center disabled:bg-gray-600"><Sparkles size={16} className="mr-2"/> Otimizar Ganhos</button></div></div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg mb-4 flex justify-between items-center"><div><p className="text-gray-400">Saldo da carteira</p><p className="text-xl font-bold">R$ 4,71</p></div><button className="bg-gray-700 px-4 py-2 rounded-lg font-semibold">Aumentar</button></div>
        </div>
    );
}

function RideRequests() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Pedido de Viagem</h2>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="h-64 w-full">
                     <MapComponent center={rideRequest.from.position} rideRequest={rideRequest} />
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-start">
                       <div className="flex">
                            <div className="p-3 bg-gray-700 rounded-full mr-4"><Car className="text-lime-400" size={24}/></div>
                            <div><p className="text-sm text-gray-400">R$ {Math.round(rideRequest.price / rideRequest.distance)}/km ~{rideRequest.distance} km</p><p className="text-xl font-bold">R$ {rideRequest.price}</p></div>
                       </div>
                    </div>
                    <div className="mt-4 pl-2 border-l-2 border-dashed border-lime-400 space-y-2">
                         <div><p className="text-xs text-gray-400">PARTIDA</p><p>{rideRequest.from.address}</p></div>
                         <div><p className="text-xs text-gray-400">DESTINO</p><p>{rideRequest.to.address}</p></div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                        <button className="flex-1 bg-lime-400 text-gray-900 font-bold py-3 rounded-lg">Aceitar por R$ {rideRequest.price}</button>
                        <button className="bg-gray-700 text-white font-bold py-3 px-4 rounded-lg">R$ {rideRequest.price + 2}</button>
                        <button className="bg-gray-700 text-white font-bold py-3 px-4 rounded-lg">R$ {rideRequest.price + 3}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function DriverWallet() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Carteira</h2>
            <div className="bg-gray-800 p-6 rounded-xl mb-4 text-center"><p className="text-gray-400 text-sm">Saldo</p><p className="text-4xl font-bold my-2">R$ 4,71</p><button className="w-full bg-lime-400 text-gray-900 font-bold py-3 rounded-lg mt-2">Recarregar</button></div>
            <div className="bg-gray-800 p-6 rounded-xl text-center"><p className="text-gray-400 text-sm">Saques</p><p className="text-4xl font-bold my-2">R$ 0,00</p><p className="text-gray-500">Nada a retirar ainda</p></div>
            <div className="bg-gray-800 p-4 rounded-lg mt-4 flex justify-between items-center cursor-pointer"><p className="font-semibold">Formas de pagamento</p><span className="text-gray-400">{'>'}</span></div>
        </div>
    )
}

export default function DriverView() {
  const { user, handleLogout, isDarkMode, toggleDarkMode } = useContext(AppContext);
  const [isOnline, setIsOnline] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, requests, wallet

  return (
    <div className={`h-full flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
        <header className="p-4 flex justify-between items-center"><h1 className="text-xl font-bold">Olá, {user?.name}</h1><div className="flex items-center space-x-2"><button onClick={() => setIsOnline(!isOnline)} className={`px-4 py-2 rounded-full font-semibold transition-colors ${isOnline ? 'bg-lime-400 text-gray-900' : 'bg-red-500 text-white'}`}>{isOnline ? 'Online' : 'Offline'}</button><button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-700">{isDarkMode ? <Sun /> : <Moon />}</button><button onClick={handleLogout} className="p-2 rounded-full bg-gray-700"><LogOut /></button></div></header>
        <main className="flex-grow p-4 overflow-y-auto">
            {currentView === 'dashboard' && <DriverDashboard />}
            {currentView === 'requests' && <RideRequests />}
            {currentView === 'wallet' && <DriverWallet />}
        </main>
        <footer className="bg-gray-800 p-2 flex justify-around">
            <button onClick={() => setCurrentView('dashboard')} className={`flex flex-col items-center p-2 rounded-lg ${currentView === 'dashboard' ? 'text-lime-400' : 'text-gray-400'}`}><BarChart2 /><span className="text-xs mt-1">Desempenho</span></button>
            <button onClick={() => setCurrentView('requests')} className={`flex flex-col items-center p-2 rounded-lg ${currentView === 'requests' ? 'text-lime-400' : 'text-gray-400'}`}><Car /><span className="text-xs mt-1">Pedidos</span></button>
            <button onClick={() => setCurrentView('wallet')} className={`flex flex-col items-center p-2 rounded-lg ${currentView === 'wallet' ? 'text-lime-400' : 'text-gray-400'}`}><DollarSign /><span className="text-xs mt-1">Carteira</span></button>
        </footer>
    </div>
  );
}
