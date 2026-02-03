
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const DashboardTooltip = ({ active, payload, title }: any) => {
    if (active && payload && payload.length) {
        // Determine the title: explicitly passed > payload header > first entry name/full_name
        const displayTitle = title || payload[0].payload.full_name || payload[0].payload.name || payload[0].payload.word;

        return (
            <Card
                key={displayTitle}
                className="p-0 shadow-2xl border-none text-[12px] z-[9999] min-w-[140px] bg-background/95 backdrop-blur-md ring-1 ring-border animate-in fade-in zoom-in duration-300 delay-150 fill-mode-both pointer-events-none"
            >
                {displayTitle && (
                    <CardHeader className="p-3 pb-1">
                        <CardTitle className="font-bold text-foreground text-[13px] border-b pb-1">
                            {displayTitle}
                        </CardTitle>
                    </CardHeader>
                )}
                <CardContent className="p-3 pt-1.5 space-y-1.5">
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex justify-between items-center gap-4">
                            <span className="text-muted-foreground capitalize">
                                {(entry.name || 'Errors').replace(/_/g, ' ')}:
                            </span>
                            <span
                                className="font-bold font-mono"
                                style={{ color: entry.color || entry.fill || 'var(--color-primary)' }}
                            >
                                {entry.value}
                            </span>
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }
    return null;
};

