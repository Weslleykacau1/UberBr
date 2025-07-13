'use client';
import { useContext, useState } from 'react';
import { Shield, Sun, Moon, LogOut, Bell, User, Car, CheckCircle, XCircle, FileText } from 'lucide-react';
import { AppContext } from '@/context/app-context';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminDashboard() {
    const { user, users, handleLogout, isDarkMode, toggleDarkMode, handleUpdateUsers } = useContext(AppContext);
    
    const [userToRemove, setUserToRemove] = useState<number | null>(null);
    const [adminPassword, setAdminPassword] = useState('');
    const [error, setError] = useState('');
    
    const pendingUsers = users.filter(u => u.status === 'pending');
    const approvedPassengers = users.filter(u => u.role === 'passenger' && u.status === 'approved');
    const approvedDrivers = users.filter(u => u.role === 'driver' && u.status === 'approved');
    
    const handleApproval = (userId: number, newStatus: 'approved' | 'rejected') => { 
        handleUpdateUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u)); 
    };

    const attemptRemove = (userId: number) => {
        setUserToRemove(userId);
    };

    const confirmRemove = () => {
        if (!user || !userToRemove) return;

        if (adminPassword === user.password) {
            handleUpdateUsers(users.filter(u => u.id !== userToRemove));
            closeDialog();
        } else {
            setError('Senha incorreta. A exclusão foi cancelada.');
        }
    };
    
    const closeDialog = () => {
        setUserToRemove(null);
        setAdminPassword('');
        setError('');
    };

    const openDocument = (url?: string) => {
        if (url) {
            window.open(url, '_blank');
        } else {
            alert('Documento não fornecido.');
        }
    }

    return (
        <div className={`h-full flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-gray-800'}`}>
            <header className="p-4 flex justify-between items-center bg-gray-800 text-white"><h1 className="text-xl font-bold flex items-center"><Shield className="mr-2 text-lime-400" /> Painel Admin</h1><div><button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-700 mr-2">{isDarkMode ? <Sun /> : <Moon />}</button><button onClick={handleLogout} className="p-2 rounded-full bg-red-500"><LogOut /></button></div></header>
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3 flex items-center text-yellow-400"><Bell className="mr-2"/> Solicitações Pendentes ({pendingUsers.length})</h3>
                    <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                        {pendingUsers.length > 0 ? pendingUsers.map(p => (
                            <div key={p.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-md flex-wrap">
                                <div className='mb-2 sm:mb-0'>
                                    <p className="font-bold">{p.name} <span className={`text-xs font-semibold px-2 py-1 rounded-full ml-2 ${p.role === 'driver' ? 'bg-blue-500' : 'bg-green-500'}`}>{p.role}</span></p>
                                    <p className="text-sm text-gray-400">{p.email}</p>
                                </div>
                                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                                    {p.role === 'driver' && (
                                        <>
                                            <button onClick={() => openDocument(p.cnhUrl)} className="flex items-center text-sm bg-gray-600 hover:bg-gray-500 text-white font-semibold py-1 px-3 rounded-md"><FileText size={16} className="mr-1"/> CNH/ID</button>
                                            <button onClick={() => openDocument(p.folhaCorridaUrl)} className="flex items-center text-sm bg-gray-600 hover:bg-gray-500 text-white font-semibold py-1 px-3 rounded-md"><FileText size={16} className="mr-1"/> F. Corrida</button>
                                        </>
                                    )}
                                     {p.role === 'passenger' && (
                                        <button onClick={() => openDocument(p.passengerIdUrl)} className="flex items-center text-sm bg-gray-600 hover:bg-gray-500 text-white font-semibold py-1 px-3 rounded-md"><FileText size={16} className="mr-1"/> Ver ID</button>
                                    )}
                                    <button onClick={() => handleApproval(p.id, 'approved')} className="p-2 bg-green-600 hover:bg-green-500 rounded-full"><CheckCircle size={20} /></button>
                                    <button onClick={() => handleApproval(p.id, 'rejected')} className="p-2 bg-red-600 hover:bg-red-500 rounded-full"><XCircle size={20} /></button>
                                </div>
                            </div>
                        )) : <p className="text-gray-400">Nenhuma solicitação pendente.</p>}
                    </div>
                </div>
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3 flex items-center text-lime-400"><User className="mr-2"/> Passageiros Aprovados ({approvedPassengers.length})</h3>
                    <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                        {approvedPassengers.map(p => (<div key={p.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-md"><div><p className="font-bold">{p.name}</p><p className="text-sm text-gray-400">{p.email}</p></div><button onClick={() => attemptRemove(p.id)} className="text-red-500 hover:text-red-400">Remover</button></div>))}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center text-lime-400"><Car className="mr-2"/> Motoristas Aprovados ({approvedDrivers.length})</h3>
                    <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                        {approvedDrivers.map(d => (<div key={d.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-md"><div><p className="font-bold">{d.name}</p><p className="text-sm text-gray-400">{d.email}</p></div><button onClick={() => attemptRemove(d.id)} className="text-red-500 hover:text-red-400">Remover</button></div>))}
                    </div>
                </div>
            </main>

            <AlertDialog open={userToRemove !== null} onOpenChange={(isOpen) => !isOpen && closeDialog()}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmação Necessária</AlertDialogTitle>
                        <AlertDialogDescription>
                            Para remover este usuário, por favor, insira sua senha de administrador. Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-2">
                        <Label htmlFor="admin-password">Senha do Administrador</Label>
                        <Input
                            id="admin-password"
                            type="password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="********"
                        />
                         {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={closeDialog}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmRemove}>Confirmar Remoção</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
