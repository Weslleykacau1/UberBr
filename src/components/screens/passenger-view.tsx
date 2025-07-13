'use client';
import React, { useState, useContext } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { AppContext } from '@/context/app-context';
import { MapPin, DollarSign, User, Star, Sun, Moon, LogOut, Smartphone, CreditCard, Banknote, Sparkles } from 'lucide-react';
import PaymentOption from '@/components/payment-option';
import GeminiSuggestionModal from '@/components/gemini-modal';

const MapComponent = dynamic(() => import('@/components/dynamic-map'), { ssr: false });

const mockDrivers = [
  { id: 1, name: 'Antônio', rating: 4.8, car: 'Fiat Cronos', distance: '5 min', position: [-3.742, -38.535] as [number, number] },
  { id: 2, name: 'Lúcia', rating: 4.9, car: 'Hyundai HB20', distance: '8 min', position: [-3.750, -38.550] as [number, number] },
  { id: 3, name: 'Carlos', rating: 4.7, car: 'Chevrolet Onix', distance: '12 min', position: [-3.725, -38.512] as [number, number] },
];

const userPosition = [-3.74, -38.54] as [number, number];


export default function PassengerView() {
  const { user, handleLogout, isDarkMode, toggleDarkMode } = useContext(AppContext);
  const [destination, setDestination] = useState('');
  const [fare, setFare] = useState('');
  const [showDriverList, setShowDriverList] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);

  if (isDarkMode === undefined) {
    return null; // or a loading skeleton
  }

  const getTripSuggestions = async () => {
      setIsLoadingSuggestion(true);
      setShowSuggestionModal(true);
      // This would be a call to your Genkit flow
      // For now, we'll mock the response
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockSuggestion = `* **Praia de Iracema:** Famosa pela Ponte dos Ingleses e vida noturna.\n* **Mercado Central:** Ótimo para compras de artesanato local.\n* **Beach Park:** Um dos maiores parques aquáticos da América Latina.`;
      setSuggestion(mockSuggestion);
      setIsLoadingSuggestion(false);
  };
  
  const handleSelectSuggestion = (selectedDestination: string) => {
      const placeName = selectedDestination.split(/[-:]/)[0].trim();
      setDestination(placeName);
      setShowSuggestionModal(false);
  }

  return (
    <div className="relative h-full flex flex-col bg-gray-800">
      {showSuggestionModal && <GeminiSuggestionModal title="Sugestões de Viagem" content={suggestion} isLoading={isLoadingSuggestion} onClose={() => setShowSuggestionModal(false)} onSelect={handleSelectSuggestion}/>}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20">
        <h1 className="text-xl font-bold text-white bg-black bg-opacity-50 px-3 py-1 rounded-lg">{user?.name || 'Passageiro'}</h1>
        <div>
          <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-700 mr-2">{isDarkMode ? <Sun /> : <Moon />}</button>
          <button onClick={handleLogout} className="p-2 rounded-full bg-red-500"><LogOut /></button>
        </div>
      </div>
      
      <div className="flex-grow z-10">
        <Image src="https://placehold.co/800x600.png" alt="Map placeholder" layout="fill" objectFit="cover" data-ai-hint="map city" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gray-900 p-4 rounded-t-2xl shadow-lg z-20">
        {!showDriverList ? (
          <>
            <div className="relative mb-2">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Para onde vamos?" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-lime-400"/>
            </div>
            <button onClick={getTripSuggestions} className="w-full text-sm flex items-center justify-center text-lime-400 hover:text-lime-300 mb-2 font-semibold"><Sparkles size={16} className="mr-2"/> Não sabe para onde ir? Peça sugestões!</button>
            <div className="relative mb-4">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="number" placeholder="Ofereça sua tarifa" value={fare} onChange={(e) => setFare(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-lime-400"/>
            </div>
            <div className="mb-4">
                <h3 className="text-gray-400 text-sm font-bold mb-3">Forma de pagamento</h3>
                <div className="flex justify-between space-x-2">
                    <PaymentOption icon={<Smartphone size={20}/>} label="PIX" selected={paymentMethod === 'pix'} onClick={() => setPaymentMethod('pix')} />
                    <PaymentOption icon={<CreditCard size={20}/>} label="Máquina" selected={paymentMethod === 'machine'} onClick={() => setPaymentMethod('machine')} />
                    <PaymentOption icon={<Banknote size={20}/>} label="Dinheiro" selected={paymentMethod === 'cash'} onClick={() => setPaymentMethod('cash')} />
                </div>
            </div>
            <button onClick={() => setShowDriverList(true)} disabled={!destination || !fare} className="w-full bg-lime-400 text-gray-900 font-bold py-4 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors mt-2">Encontrar motorista</button>
          </>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Motoristas disponíveis</h2><button onClick={() => setShowDriverList(false)} className="text-lime-400 font-semibold">Voltar</button></div>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {mockDrivers.map(driver => (
                <div key={driver.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-700 rounded-full mr-3"><User className="text-lime-400" /></div>
                    <div><p className="font-bold">{driver.name}</p><p className="text-sm text-gray-400 flex items-center"><Star size={14} className="text-yellow-400 mr-1" /> {driver.rating} - {driver.car}</p></div>
                  </div>
                  <div className="text-right"><p className="font-bold text-lime-400">{driver.distance}</p><button className="text-xs bg-lime-500 text-black px-2 py-1 rounded mt-1">Chamar</button></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
