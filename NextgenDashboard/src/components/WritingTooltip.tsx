
export const WritingTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-gray-200 shadow-xl rounded-xl text-[12px] z-50 min-w-[120px]">
                <p className="font-bold text-gray-800 mb-1.5 text-[13px]">{payload[0].payload.full_name}</p>
                <div className="flex justify-between items-center gap-4">
                    <span className="text-gray-500">Word Count:</span>
                    <span className="text-violet-600 font-bold">{payload[0].value}</span>
                </div>
            </div>
        );
    }
    return null;
};
