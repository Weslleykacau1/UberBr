'use client';
import { useContext } from 'react';
import { Shield, Sun, Moon, LogOut, Bell, User, Car, CheckCircle, XCircle } from 'lucide-react';
import { AppContext } from '@/context/app-context';

export default function AdminDashboard() {
    const { users, handleLogout, isDarkMode, toggleDarkMode, handleUpdateUsers } = useContext(AppContext);
    
    const pendingUsers = users.filter(u => u.status === 'pending');
    const approvedPassengers = users.filter(u => u.role === 'passenger' && u.status === 'approved');
    const approvedDrivers = users.filter(u => u.role === 'driver' && u.status === 'approved');
    
    const handleApproval = (userId: number, newStatus: 'approved' | 'rejected') => { 
        handleUpdateUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u)); 
    };
    const handleRemove = (userId: number) => { 
        handleUpdateUsers(users.filter(u => u.id !== userId)); 
    };

    return (
        <div className={`h-full flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-gray-800'}`}>
            <header className="p-4 flex justify-between items-center bg-gray-800 text-white"><h1 className="text-xl font-bold flex items-center"><Shield className="mr-2 text-lime-400" /> Painel Admin</h1><div><button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-700 mr-2">{isDarkMode ? <Sun /> : <Moon />}</button><button onClick={handleLogout} className="p-2 rounded-full bg-red-500"><LogOut /></button></div></header>
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3 flex items-center text-yellow-400"><Bell className="mr-2"/> Solicitações Pendentes ({pendingUsers.length})</h3>
                    <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                        {pendingUsers.length > 0 ? pendingUsers.map(p => (
                            <div key={p.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-md">
                                <div><p className="font-bold">{p.name} <span className={`text-xs font-semibold px-2 py-1 rounded-full ml-2 ${p.role === 'driver' ? 'bg-blue-500' : 'bg-green-500'}`}>{p.role}</span></p><p className="text-sm text-gray-400">{p.email}</p></div>
                                <div className="flex space-x-2"><button onClick={() => handleApproval(p.id, 'approved')} className="p-2 bg-green-600 hover:bg-green-500 rounded-full"><CheckCircle size={20} /></button><button onClick={() => handleApproval(p.id, 'rejected')} className="p-2 bg-red-600 hover:bg-red-500 rounded-full"><XCircle size={20} /></button></div>
                            </div>
                        )) : <p className="text-gray-400">Nenhuma solicitação pendente.</p>}
                    </div>
                </div>
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3 flex items-center text-lime-400"><User className="mr-2"/> Passageiros Aprovados ({approvedPassengers.length})</h3>
                    <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                        {approvedPassengers.map(p => (<div key={p.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-md"><div><p className="font-bold">{p.name}</p><p className="text-sm text-gray-400">{p.email}</p></div><button onClick={() => handleRemove(p.id)} className="text-red-500 hover:text-red-400">Remover</button></div>))}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center text-lime-400"><Car className="mr-2"/> Motoristas Aprovados ({approvedDrivers.length})</h3>
                    <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                        {approvedDrivers.map(d => (<div key={d.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-md"><div><p className="font-bold">{d.name}</p><p className="text-sm text-gray-400">{d.email}</p></div><button onClick={() => handleRemove(d.id)} className="text-red-500 hover:text-red-400">Remover</button></div>))}
                    </div>
                </div>
            </main>
        </div>
    );
}
