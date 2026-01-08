interface StatCardProps {
    title: string;
    value: string;
    subtext: string;
    onClick?: () => void;
}

export const StatCard = ({ title, value, subtext, onClick }: StatCardProps) => (
    <div
        onClick={onClick}
        className={`bg-white p-2.5 rounded-lg border border-gray-200 flex flex-col gap-0.5 shadow-md ${onClick ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}`}
    >
        <p className="text-gray-500 font-bold text-[9px] uppercase tracking-wider">{title}</p>
        <div className="flex items-baseline gap-1.5">
            <h3 className="text-lg font-black text-gray-900 leading-tight">{value}</h3>
            <span className="text-gray-400 font-medium text-[15px]">{subtext}</span>
        </div>
    </div>
);
