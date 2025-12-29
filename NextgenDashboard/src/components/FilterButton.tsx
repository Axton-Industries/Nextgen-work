import { LucideIcon, ChevronDown } from 'lucide-react';

interface FilterButtonProps {
    icon: LucideIcon;
    text: string;
    hasArrow?: boolean;
}

export const FilterButton = ({ icon: Icon, text, hasArrow = false }: FilterButtonProps) => (
    <button className="flex items-center gap-1.5 px-2 py-0.5 bg-white border border-gray-100 rounded-lg text-[9px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm uppercase tracking-tighter">
        <Icon size={12} className="text-gray-500" />
        <span>{text}</span>
        {hasArrow && <ChevronDown size={10} className="text-gray-400 ml-0.5" />}
    </button>
);
