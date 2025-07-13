'use client';
export default function PaymentOption({ icon, label, selected, onClick }: { icon: React.ReactNode, label: string, selected: boolean, onClick: () => void }) {
    return (
        <button onClick={onClick} className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${selected ? 'border-primary bg-primary/20' : 'border-border bg-secondary hover:bg-muted'}`}>
            <div className={`mb-1 ${selected ? 'text-primary' : 'text-muted-foreground'}`}>{icon}</div>
            <span className={`font-semibold text-sm ${selected ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
        </button>
    );
}

    