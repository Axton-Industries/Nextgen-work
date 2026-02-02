import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Treemap } from 'recharts';
import { Card } from "@/components/ui/card";
import { DashboardTooltip } from './DashboardTooltip';

interface StudentChartsProps {
    studentCharts: any;
    displayedStudentName: string | null;
    dataWithColors: any[];
    erik_time_per_assignment: any[];
    erik_week_activity: any[];
    erik_performance_trend: any[];
    erik_skills: any[];
}

export const StudentCharts = ({
    studentCharts,
    displayedStudentName,
    dataWithColors,
    erik_time_per_assignment,
    erik_week_activity,
    erik_performance_trend,
    erik_skills
}: StudentChartsProps) => {
    return (
        <>
            <Card className="col-span-3 p-3 shadow-md flex flex-col min-h-0">
                <h3 className="font-bold text-muted-foreground mb-2 text-[10px] uppercase tracking-wider">Time spent per assignment</h3>
                <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={studentCharts?.time || erik_time_per_assignment} layout="vertical" margin={{ left: 10, right: 0, top: 10, bottom: 10 }} barCategoryGap="65%">
                            <XAxis type="number" tick={{ fontSize: 9, fill: 'currentColor' }} className="text-foreground" axisLine={{ stroke: 'currentColor', opacity: 0.1 }} tickLine={false} label={{ value: 'Minutes', position: 'insideBottom', offset: 0, fontSize: 8, fill: 'currentColor', fontWeight: 'bold' }} />
                            <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 10, fill: 'currentColor' }} className="text-foreground" axisLine={{ stroke: 'currentColor', opacity: 0.1 }} tickLine={false} />
                            <Tooltip content={<DashboardTooltip />} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                            <Bar name={`${displayedStudentName} Time`} dataKey="erik" fill="var(--primary)" radius={[10, 10, 10, 10]} barSize={6} />
                            <Bar name="Class Avg." dataKey="class" fill="var(--muted-foreground)" opacity={0.5} radius={[10, 10, 10, 10]} barSize={6} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <div className="col-span-9 grid grid-cols-2 grid-rows-2 gap-4 min-h-0">
                <Card className="p-3 shadow-md flex flex-col min-h-0">
                    <h3 className="font-bold text-muted-foreground mb-2 text-[10px] uppercase tracking-wider">Total Week activity - {displayedStudentName}</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={studentCharts?.week || erik_week_activity} margin={{ top: 5, right: 10, bottom: 15, left: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.05} />
                                <XAxis dataKey="week" tick={{ fontSize: 9, fill: 'currentColor' }} className="text-muted-foreground" axisLine={false} tickLine={false} label={{ value: 'Week', position: 'insideBottom', offset: -10, fontSize: 8, fill: 'currentColor', fontWeight: 'bold' }} />
                                <YAxis tick={{ fontSize: 9, fill: 'currentColor' }} className="text-muted-foreground" axisLine={false} tickLine={false} label={{ value: 'Min', angle: -90, position: 'insideLeft', offset: 12, fontSize: 8, fill: 'currentColor', fontWeight: 'bold' }} />
                                <Tooltip content={<DashboardTooltip />} />
                                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '9px', paddingBottom: '10px' }} />
                                <Line name={displayedStudentName || 'Student'} type="monotone" dataKey="erik" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary)', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                <Line name="Avg. Minutes" type="monotone" dataKey="avg" stroke="var(--muted-foreground)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: 'var(--background)', stroke: 'var(--muted-foreground)', strokeWidth: 2 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="p-3 shadow-md flex flex-col min-h-0">
                    <h3 className="font-bold text-muted-foreground mb-2 text-[10px] uppercase tracking-wider">Performance Trend</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={studentCharts?.performance || erik_performance_trend} margin={{ top: 5, right: 10, bottom: 15, left: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.05} />
                                <XAxis dataKey="week" tick={{ fontSize: 9, fill: 'currentColor' }} className="text-muted-foreground" axisLine={false} tickLine={false} label={{ value: 'Week', position: 'insideBottom', offset: -10, fontSize: 8, fill: 'currentColor', fontWeight: 'bold' }} />
                                <YAxis tick={{ fontSize: 9, fill: 'currentColor' }} className="text-muted-foreground" axisLine={false} tickLine={false} label={{ value: 'Score %', angle: -90, position: 'insideLeft', offset: 12, fontSize: 8, fill: 'currentColor', fontWeight: 'bold' }} />
                                <Tooltip content={<DashboardTooltip />} />
                                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '9px', paddingBottom: '10px' }} />
                                <Line name={displayedStudentName || 'Student'} type="monotone" dataKey="erik" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary)', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                <Line name="Class" type="monotone" dataKey="class" stroke="var(--muted-foreground)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: 'var(--background)', stroke: 'var(--muted-foreground)', strokeWidth: 2 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="p-3 shadow-md flex flex-col min-h-0">
                    <h3 className="font-bold text-muted-foreground mb-2 text-[10px] uppercase tracking-wider">{displayedStudentName} skills level</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="100%" data={studentCharts?.skills || erik_skills}>
                                <PolarGrid stroke="currentColor" opacity={0.1} />
                                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'currentColor' }} className="text-foreground" />
                                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                                <Radar name={displayedStudentName || 'Student'} dataKey="erik" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.4} />
                                <Radar name="Class Avg." dataKey="avg" stroke="var(--muted-foreground)" fill="var(--muted-foreground)" fillOpacity={0.25} />
                                <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                                <Tooltip content={<DashboardTooltip />} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="p-3 shadow-md flex flex-col min-h-0">
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
