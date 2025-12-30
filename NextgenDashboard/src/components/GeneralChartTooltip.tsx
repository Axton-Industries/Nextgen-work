
export const GeneralChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-gray-200 shadow-xl rounded-xl text-[12px] z-50 min-w-[140px]">
                <div className="space-y-1.5">
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex justify-between items-center gap-4">
                            <span className="text-gray-500 capitalize">{entry.name.replace(/_/g, ' ')}:</span>
                            <span className="font-bold" style={{ color: entry.fill || '#8b5cf6' }}>{entry.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};
