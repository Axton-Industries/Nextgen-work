import type { LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface IconButtonProps {
    icon: LucideIcon;
    active?: boolean;
    onClick?: () => void;
}

export const IconButton = ({ icon: Icon, active = false, onClick }: IconButtonProps) => (
    <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className={cn(
            "h-8 w-8 rounded-lg transition-colors",
            active ? 'bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary ring-1 ring-primary/40' : 'text-muted-foreground'
        )}
    >
        <Icon size={16} />
    </Button>
);

