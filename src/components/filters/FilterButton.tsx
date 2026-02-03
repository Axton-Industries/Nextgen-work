import { type LucideIcon, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FilterButtonProps {
    icon: LucideIcon;
    text: string;
    hasArrow?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    active?: boolean;
}

export const FilterButton = ({ icon: Icon, text, hasArrow = false, onClick, active = false }: FilterButtonProps) => (
    <Button
        variant={active ? "default" : "outline"}
        size="sm"
        onClick={onClick}
        className={cn(
            "h-7 gap-1.5 px-2.5 rounded-lg text-[9px] font-bold transition-all shadow-sm uppercase tracking-tighter",
            active
                ? "bg-primary border-primary text-primary-foreground hover:bg-primary/90"
                : "bg-background border-input text-foreground hover:bg-primary/5 hover:border-primary/30 hover:text-primary"
        )}
    >
        <Icon size={12} className={cn(active ? 'text-primary-foreground' : 'text-muted-foreground')} />
        <span>{text}</span>
        {hasArrow && <ChevronDown size={10} className={cn(active ? 'text-primary-foreground' : 'text-muted-foreground', "ml-0.5")} />}
    </Button>
);

