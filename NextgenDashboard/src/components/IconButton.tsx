import { LucideIcon } from 'lucide-react';

interface IconButtonProps {
    icon: LucideIcon;
    active?: boolean;
}

export const IconButton = ({ icon: Icon, active = false }: IconButtonProps) => (
    <div className={`p-1 cursor-pointer rounded-lg transition-colors flex items-center justify-center ${active ? 'bg-purple-100 text-purple-600 ring-1 ring-purple-400' : 'text-gray-400 hover:bg-gray-100'
        }`}>
        <Icon size={16} />
    </div>
);
