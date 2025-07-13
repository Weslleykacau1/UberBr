'use client';
import { useContext, useState } from 'react';
import { Shield, Sun, Moon, LogOut, Bell, User, Car, CheckCircle, XCircle, FileText } from 'lucide-react';
import { AppContext } from '@/context/app-context';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
    const { user, users, handleLogout, isDarkMode, toggleDarkMode, handleUpdateUsers } = useContext(AppContext);
    
    const [userToRemove, setUserToRemove] = useState<number | null>(null);
    const [adminPassword, setAdminPassword] = useState('');
    const [error, setError] = useState('');
    
    if (isDarkMode === undefined) {
        return null; // or a loading skeleton
    }

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
        <div className={`h-full flex flex-col bg-background text-foreground`}>
            <header className="p-4 flex justify-between items-center bg-card shadow-sm"><h1 className="text-xl font-bold flex items-center"><Shield className="mr-2 text-primary" /> Painel Admin</h1><div><button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-secondary mr-2">{isDarkMode ? <Sun /> : <Moon />}</button><button onClick={handleLogout} className="p-2 rounded-full bg-destructive/80 text-destructive-foreground hover:bg-destructive"><LogOut /></button></div></header>
            <main className="flex-grow p-4 overflow-y-auto space-y-8">
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center text-primary"><Bell className="mr-2"/> Solicitações Pendentes ({pendingUsers.length})</h3>
                    <div className="bg-card rounded-lg p-4 space-y-3 shadow-sm">
                        {pendingUsers.length > 0 ? pendingUsers.map(p => (
                            <div key={p.id} className="flex justify-between items-center bg-background p-3 rounded-md flex-wrap border">
                                <div className='mb-2 sm:mb-0'>
                                    <p className="font-bold">{p.name} <span className={`text-xs font-semibold px-2 py-1 rounded-full ml-2 ${p.role === 'driver' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>{p.role}</span></p>
                                    <p className="text-sm text-muted-foreground">{p.email}</p>
                                </div>
                                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                                    {p.role === 'driver' && (
                                        <>
                                            <Button onClick={() => openDocument(p.cnhUrl)} variant="ghost" size="sm"><FileText size={16} className="mr-1"/> CNH/ID</Button>
                                            <Button onClick={() => openDocument(p.folhaCorridaUrl)} variant="ghost" size="sm"><FileText size={16} className="mr-1"/> F. Corrida</Button>
                                        </>
                                    )}
                                     {p.role === 'passenger' && (
                                        <Button onClick={() => openDocument(p.passengerIdUrl)} variant="ghost" size="sm"><FileText size={16} className="mr-1"/> Ver ID</Button>
                                    )}
                                    <Button onClick={() => handleApproval(p.id, 'approved')} size="icon" className="bg-green-600 hover:bg-green-500 h-8 w-8"><CheckCircle size={20} /></Button>
                                    <Button onClick={() => handleApproval(p.id, 'rejected')} size="icon" variant="destructive" className="h-8 w-8"><XCircle size={20} /></Button>
                                </div>
                            </div>
                        )) : <p className="text-muted-foreground">Nenhuma solicitação pendente.</p>}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center text-primary"><User className="mr-2"/> Passageiros Aprovados ({approvedPassengers.length})</h3>
                    <div className="bg-card rounded-lg p-4 space-y-3 shadow-sm">
                        {approvedPassengers.map(p => (<div key={p.id} className="flex justify-between items-center bg-background p-3 rounded-md border"><div><p className="font-bold">{p.name}</p><p className="text-sm text-muted-foreground">{p.email}</p></div><Button variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => attemptRemove(p.id)}>Remover</Button></div>))}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center text-primary"><Car className="mr-2"/> Motoristas Aprovados ({approvedDrivers.length})</h3>
                    <div className="bg-card rounded-lg p-4 space-y-3 shadow-sm">
                        {approvedDrivers.map(d => (<div key={d.id} className="flex justify-between items-center bg-background p-3 rounded-md border"><div><p className="font-bold">{d.name}</p><p className="text-sm text-muted-foreground">{d.email}</p></div><Button variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => attemptRemove(d.id)}>Remover</Button></div>))}
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
