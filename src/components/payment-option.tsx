'use client';
export default function PaymentOption({ icon, label, selected, onClick }: { icon: React.ReactNode, label: string, selected: boolean, onClick: () => void }) {
    return (
        <button onClick={onClick} className={`flex-1 flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${selected ? 'border-lime-400 bg-lime-400/20' : 'border-gray-700 bg-gray-800 hover:bg-gray-700'}`}>
            <div className={`mb-1 ${selected ? 'text-lime-400' : 'text-gray-400'}`}>{icon}</div>
            <span className={`font-semibold text-sm ${selected ? 'text-white' : 'text-gray-300'}`}>{label}</span>
        </button>
    );
}
