import { type LucideIcon, ChevronDown } from 'lucide-react';

interface FilterButtonProps {
    icon: LucideIcon;
    text: string;
    hasArrow?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    active?: boolean;
}

export const FilterButton = ({ icon: Icon, text, hasArrow = false, onClick, active = false }: FilterButtonProps) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-bold transition-all shadow-sm uppercase tracking-tighter border ${active
            ? 'bg-purple-600 border-purple-600 text-white'
            : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50'
            }`}
    >
        <Icon size={12} className={active ? 'text-white' : 'text-gray-500'} />
        <span>{text}</span>
        {hasArrow && <ChevronDown size={10} className={`${active ? 'text-white' : 'text-gray-400'} ml-0.5`} />}
    </button>
);
