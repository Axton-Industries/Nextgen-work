interface StatCardProps {
    title: string;
    value: string;
    subtext: string;
}

export const StatCard = ({ title, value, subtext }: StatCardProps) => (
    <div className="bg-white p-2.5 rounded-lg border border-gray-100 flex flex-col gap-0.5 shadow-sm">
        <p className="text-gray-500 font-bold text-[9px] uppercase tracking-wider">{title}</p>
        <div className="flex items-baseline gap-1.5">
            <h3 className="text-lg font-black text-gray-900 leading-tight">{value}</h3>
            <span className="text-gray-400 font-medium text-[9px]">{subtext}</span>
        </div>
    </div>
);
