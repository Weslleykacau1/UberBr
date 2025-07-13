'use client';
import { Sparkles, X } from 'lucide-react';

export default function GeminiSuggestionModal({ title, content, isLoading, onClose, onSelect }: { title: string, content: string, isLoading: boolean, onClose: () => void, onSelect?: (item: string) => void }) {
    return (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl">
                <div className="flex justify-between items-center mb-4"><h2 className="text-2xl font-bold text-lime-400 flex items-center"><Sparkles className="mr-2" /> {title}</h2><button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700"><X /></button></div>
                {isLoading ? (<div className="flex justify-center items-center h-48"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-lime-400"></div></div>) : (
                    <div className="text-gray-300 space-y-4 max-h-80 overflow-y-auto">
                        {content.split('\n').map((item, index) => {
                            if (!item.trim()) return null;
                            const cleanItem = item.trim().replace(/^\*|^\d+\./, '').trim();
                            return (<div key={index} className={`p-3 rounded-lg ${onSelect ? 'hover:bg-gray-700 cursor-pointer' : ''}`} onClick={() => onSelect && onSelect(cleanItem)}>• {cleanItem}</div>);
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
