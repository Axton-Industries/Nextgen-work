import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Treemap } from 'recharts';
import { Card } from "@/components/ui/card";
import { DashboardTooltip } from './DashboardTooltip';

interface OverviewChartsProps {
    writing_overview_rows: any[];
    engagement_metrics: any[];
    improvement_stats: any[];
    layoutBubbles: any[];
    dataWithColors: any[];
}

export const OverviewCharts = ({
    writing_overview_rows,
    engagement_metrics,
    improvement_stats,
    layoutBubbles,
    dataWithColors
}: OverviewChartsProps) => {
    return (
        <>
            <Card className="col-span-12 lg:col-span-3 p-2.5 shadow-md flex flex-col min-h-0">
                <h3 className="font-bold text-muted-foreground mb-2 text-[10px] uppercase tracking-wider">Writing Overview</h3>
                <div className="flex-1 min-h-0 text-[8px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={writing_overview_rows} layout="vertical" margin={{ left: -10, right: 20, top: 5, bottom: 25 }}>
                            <XAxis
                                type="number"
                                tick={{ fontSize: 9, fill: 'currentColor' }}
                                className="text-muted-foreground"
                                axisLine={false}
                                tickLine={false}
                                label={{ value: 'Word Count', position: 'insideBottom', offset: -15, fontSize: 8, fill: 'currentColor', fontWeight: 'bold' }}
                            />
                            <YAxis
                                dataKey="full_name"
                                type="category"
                                width={70}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 500 }}
                                className="text-foreground"
                            />
                            <Tooltip content={<DashboardTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
                            <Bar dataKey="word_count" fill="var(--primary)" radius={[0, 4, 4, 0]} barSize={5} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <div className="col-span-12 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 min-h-0 h-full">
                <Card className="p-3 shadow-sm flex flex-col min-h-0">
                    <h3 className="font-bold text-muted-foreground mb-2 text-[10px] uppercase tracking-wider">Engagement</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 10, right: 25, bottom: 25, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.05} />
                                <XAxis
                                    type="number"
                                    dataKey="submission_count"
                                    domain={[0, 30]}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fill: 'currentColor' }}
                                    className="text-muted-foreground"
                                    label={{ value: 'Submissions', position: 'insideBottom', offset: -20, fontSize: 8, fill: 'currentColor', fontWeight: 'bold' }}
                                />
                                <YAxis
                                    type="number"
                                    dataKey="time_spent_min"
                                    domain={[0, 200]}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fill: 'currentColor' }}
                                    className="text-muted-foreground"
                                    label={{ value: 'Time (min)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 8, fill: 'currentColor', fontWeight: 'bold' }}
                                />
                                <Tooltip content={<DashboardTooltip />} />
                                <Scatter data={engagement_metrics} fill="var(--primary)" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="p-3 shadow-sm flex flex-col min-h-0">
                    <h3 className="font-bold text-muted-foreground mb-2 text-[10px] uppercase tracking-wider">Improvement</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 10, right: 25, bottom: 25, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.05} />
                                <XAxis
                                    type="number"
                                    dataKey="resubmission_avg"
                                    domain={[0, 14]}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fill: 'currentColor' }}
                                    className="text-muted-foreground"
                                    label={{ value: 'Resubmissions', position: 'insideBottom', offset: -20, fontSize: 8, fill: 'currentColor', fontWeight: 'bold' }}
                                />
                                <YAxis
                                    type="number"
                                    dataKey="score_avg"
                                    domain={[0, 100]}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fill: 'currentColor' }}
                                    className="text-muted-foreground"
                                    label={{ value: 'Score (%)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 8, fill: 'currentColor', fontWeight: 'bold' }}
                                />
                                <Tooltip content={<DashboardTooltip />} />
                                <Scatter data={improvement_stats} fill="var(--primary)" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="p-3 shadow-sm flex flex-col min-h-0 relative overflow-hidden">
                    <h3 className="font-bold text-muted-foreground mb-2 text-[10px] uppercase tracking-wider">Top Error-Prone Questions</h3>
                    <div className="flex-1 relative flex items-start justify-center pt-13">
                        <div className="relative w-0 h-0">
                            {layoutBubbles.map((q) => (
                                <div
                                    key={q.id}
                                    className={`absolute rounded-full flex items-center justify-center font-bold p-2 text-center shadow-sm transition-transform hover:scale-105 hover:z-[100] cursor-default group`}
                                    style={{
                                        backgroundColor: q.color,
                                        left: q.x,
                                        top: q.y,
                                        width: `${q.diameter}px`,
                                        height: `${q.diameter}px`,
                                        color: '#000000',
                                        transform: 'translate(-50%, -50%)',
                                        fontSize: q.diameter > 100 ? '10px' : q.diameter > 60 ? '8px' : '7px'
                                    }}
                                >
                                    {q.question.length > 20 && q.diameter < 100 ? q.question.substring(0, 15) + '...' : q.question}
                                    <Card className="absolute opacity-0 group-hover:opacity-100 transition-opacity bottom-full mb-3 left-1/2 -translate-x-1/2 p-3 border shadow-xl text-[12px] z-[9999] pointer-events-none w-max max-w-[200px]">
                                        <p className="font-bold text-foreground mb-1.5 text-[13px] border-b pb-1 leading-tight">{q.question}</p>
                                        <div className="flex justify-between items-center gap-4">
                                            <span className="text-muted-foreground capitalize">Errors:</span>
                                            <span className="text-primary font-bold font-mono">{q.errors}</span>
                                        </div>
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-background"></div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                <Card className="p-3 shadow-sm flex flex-col min-h-0">
                    <h3 className="font-bold text-muted-foreground mb-2 text-[10px] uppercase tracking-wider">Top Error-Prone Words</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <Treemap
                                data={dataWithColors}
                                dataKey="occurrence_count"
                                content={(props: any) => {
                                    const { x, y, width, height, word, fill } = props;
                                    return (
                                        <g>
                                            <rect x={x} y={y} width={width} height={height} style={{ fill, stroke: 'var(--background)', strokeWidth: 2 }} />
                                            {width > 30 && height > 20 && (
                                                <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="middle" fill="currentColor" className="text-foreground" fontSize={12} fontWeight="bold">
                                                    {word}
                                                </text>
                                            )}
                                        </g>
                                    );
                                }}
                            >
                                <Tooltip content={<DashboardTooltip />} />
                            </Treemap>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </>
    );
};
