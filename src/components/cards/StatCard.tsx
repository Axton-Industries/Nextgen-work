import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
    title: string;
    value: string;
    subtext: string;
    onClick?: () => void;
}

export const StatCard = ({ title, value, subtext, onClick }: StatCardProps) => (
    <Card
        onClick={onClick}
        className={cn(
            "shadow-md",
            onClick && "cursor-pointer hover:bg-muted/50 transition-colors"
        )}
    >
        <CardHeader className="p-2.5 pb-0">
            <CardTitle className="text-muted-foreground font-bold text-[9px] uppercase tracking-wider">
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent className="p-2.5 pt-0.5">
            <div className="flex items-baseline gap-1.5">
                <h3 className="text-lg font-black text-foreground leading-tight">{value}</h3>
                <span className="text-muted-foreground font-medium text-[15px]">{subtext}</span>
            </div>
        </CardContent>
    </Card>
);

