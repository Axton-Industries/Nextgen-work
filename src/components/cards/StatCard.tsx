import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChevronRight } from 'lucide-react'

interface StatCardProps {
    title: string;
    value: string;
    subtext: string;
    onClick?: () => void;
}

export const StatCard = ({ title, value, subtext, onClick }: StatCardProps) => {
    const isAction = !!onClick;

    return (
        <Card
            onClick={onClick}
            className={cn(
                "shadow-sm transition-all duration-300 relative group overflow-hidden border",
                isAction
                    ? "cursor-pointer bg-white border-zinc-200 hover:bg-primary hover:border-primary hover:text-primary-foreground hover:shadow-lg hover:-translate-y-1"
                    : "bg-background border-border text-foreground"
            )}
        >
            <CardHeader className="p-2.5 pb-0">
                <CardTitle className={cn(
                    "font-black text-[9px] uppercase tracking-tighter flex items-center justify-between transition-colors",
                    isAction ? "text-primary group-hover:text-primary-foreground" : "text-muted-foreground"
                )}>
                    {title}
                    {isAction && (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary scale-90 origin-right transition-all group-hover:bg-white group-hover:text-primary">
                            <span className="text-[8px] font-black uppercase tracking-widest">Select</span>
                            <ChevronRight size={10} />
                        </div>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-2.5 pt-0.5">
                <div className="flex items-baseline gap-1.5">
                    <h3 className={cn(
                        "text-lg font-black leading-tight transition-colors",
                        isAction ? "text-black group-hover:text-primary-foreground" : "text-foreground"
                    )}>{value}</h3>
                    <span className={cn(
                        "font-medium text-[15px] transition-colors",
                        isAction ? "text-zinc-500 group-hover:text-primary-foreground/80" : "text-muted-foreground"
                    )}>{subtext}</span>
                </div>
            </CardContent>
        </Card>
    );
};
