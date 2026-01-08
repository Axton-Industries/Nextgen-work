
export const DashboardTooltip = ({ active, payload, title }: any) => {
    if (active && payload && payload.length) {
        // Determine the title: explicitly passed > payload header > first entry name/full_name
        const displayTitle = title || payload[0].payload.full_name || payload[0].payload.name || payload[0].payload.word;

        return (
            <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-xl text-[12px] z-50 min-w-[140px] ring-1 ring-black/5">
                {displayTitle && (
                    <p className="font-bold text-gray-800 mb-1.5 text-[13px] border-b border-gray-50 pb-1">
                        {displayTitle}
                    </p>
                )}
                <div className="space-y-1.5">
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex justify-between items-center gap-4">
                            <span className="text-gray-500 capitalize">
                                {(entry.name || 'Errors').replace(/_/g, ' ')}:
                            </span>
                            <span
                                className="font-bold font-mono text-purple-600"
                                style={{ color: entry.color || entry.fill || '#8b5cf6' }}
                            >
                                {entry.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};
