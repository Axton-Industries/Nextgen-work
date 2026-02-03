/**
 * StudentCharts Component
 * Provides a deep dive into an individual student's performance data.
 * Features side-by-side comparisons with class averages.
 */

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Treemap } from 'recharts';
import { Card } from "@/components/ui/card";
import { DashboardTooltip } from './DashboardTooltip';

interface StudentChartsProps {
    studentCharts: any; // Dynamic data filtered by the selected student
    displayedStudentName: string | null;
    dataWithColors: any[];
    erik_time_per_assignment: any[]; // Fallback data
    erik_week_activity: any[];      // Fallback data
    erik_performance_trend: any[]; // Fallback data
    erik_skills: any[];           // Fallback data
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
        /**
         * The Layout:
         * Uses a 12-column grid.
         * Left column (col-span-3) for Time Spent.
         * Right side (col-span-9) for a 2x2 grid of Trends and Skills.
         */
        <>
            {/* 1. Time Spent Per Assignment - Comparison Bar Chart */}
            <Card className="col-span-3 p-3 shadow-md flex flex-col min-h-0">
                <h3 className="font-bold text-muted-foreground mb-2 text-[10px] uppercase tracking-wider">Time spent per assignment</h3>
                <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={studentCharts?.time || erik_time_per_assignment} layout="vertical" margin={{ left: 10, right: 0, top: 10, bottom: 10 }} barCategoryGap="65%">
                            <XAxis type="number" tick={{ fontSize: 9, fill: 'currentColor' }} className="text-foreground" axisLine={{ stroke: 'currentColor', opacity: 0.1 }} tickLine={false} label={{ value: 'Minutes', position: 'insideBottom', offset: 0, fontSize: 8, fill: 'currentColor', fontWeight: 'bold' }} />
                            <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 10, fill: 'currentColor' }} className="text-foreground" axisLine={{ stroke: 'currentColor', opacity: 0.1 }} tickLine={false} />
                            <Tooltip content={<DashboardTooltip />} allowEscapeViewBox={{ x: false, y: false }} animationDuration={0} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />

                            {/* Blue Bar: Student's own time */}
                            <Bar name={`${displayedStudentName} Time`} dataKey="erik" fill="var(--color-primary)" radius={[10, 10, 10, 10]} barSize={6} />

                            {/* Gray Bar: Class average for context */}
                            <Bar name="Class Avg." dataKey="class" fill="var(--color-muted-foreground)" opacity={0.5} radius={[10, 10, 10, 10]} barSize={6} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <div className="col-span-9 grid grid-cols-2 grid-rows-2 gap-4 min-h-0">

                {/* 2. Total Week Activity - Line Chart with Comparison */}
                <Card className="p-3 shadow-md flex flex-col min-h-0">
                    <h3 className="font-bold text-muted-foreground mb-2 text-[10px] uppercase tracking-wider">Total Week activity - {displayedStudentName}</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={studentCharts?.week || erik_week_activity} margin={{ top: 5, right: 10, bottom: 15, left: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.05} />
                                <XAxis dataKey="week" tick={{ fontSize: 9, fill: 'currentColor' }} className="text-muted-foreground" axisLine={false} tickLine={false} label={{ value: 'Week', position: 'insideBottom', offset: -10, fontSize: 8, fill: 'currentColor', fontWeight: 'bold' }} />
                                <YAxis tick={{ fontSize: 9, fill: 'currentColor' }} className="text-muted-foreground" axisLine={false} tickLine={false} label={{ value: 'Min', angle: -90, position: 'insideLeft', offset: 12, fontSize: 8, fill: 'currentColor', fontWeight: 'bold' }} />
                                <Tooltip content={<DashboardTooltip />} allowEscapeViewBox={{ x: false, y: false }} animationDuration={0} />
                                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '9px', paddingBottom: '10px' }} />

                                {/* Solid Line: Student Performance */}
                                <Line name={displayedStudentName || 'Student'} type="monotone" dataKey="erik" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-primary)', strokeWidth: 2 }} activeDot={{ r: 6 }} />

                                {/* Dashed Line: Baseline/Average */}
                                <Line name="Avg. Minutes" type="monotone" dataKey="avg" stroke="var(--color-muted-foreground)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: 'var(--color-background)', stroke: 'var(--color-muted-foreground)', strokeWidth: 2 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* 3. Performance Trend (Percentage Scores) */}
                <Card className="p-3 shadow-md flex flex-col min-h-0">
                    <h3 className="font-bold text-muted-foreground mb-2 text-[10px] uppercase tracking-wider">Performance Trend</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={studentCharts?.performance || erik_performance_trend} margin={{ top: 5, right: 10, bottom: 15, left: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.05} />
                                <XAxis dataKey="week" tick={{ fontSize: 9, fill: 'currentColor' }} className="text-muted-foreground" axisLine={false} tickLine={false} label={{ value: 'Week', position: 'insideBottom', offset: -10, fontSize: 8, fill: 'currentColor', fontWeight: 'bold' }} />
                                <YAxis tick={{ fontSize: 9, fill: 'currentColor' }} className="text-muted-foreground" axisLine={false} tickLine={false} label={{ value: 'Score %', angle: -90, position: 'insideLeft', offset: 12, fontSize: 8, fill: 'currentColor', fontWeight: 'bold' }} />
                                <Tooltip content={<DashboardTooltip />} allowEscapeViewBox={{ x: false, y: false }} animationDuration={0} />
                                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '9px', paddingBottom: '10px' }} />
                                <Line name={displayedStudentName || 'Student'} type="monotone" dataKey="erik" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-primary)', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                <Line name="Class" type="monotone" dataKey="class" stroke="var(--color-muted-foreground)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: 'var(--color-background)', stroke: 'var(--color-muted-foreground)', strokeWidth: 2 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* 4. Skills Level - Radar Chart (Spider Chart)
                    Visualizes different skill dimensions at once.
                */}
                <Card className="p-3 shadow-md flex flex-col min-h-0">
                    <h3 className="font-bold text-muted-foreground mb-2 text-[10px] uppercase tracking-wider">{displayedStudentName} skills level</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="100%" data={studentCharts?.skills || erik_skills}>
                                <PolarGrid stroke="currentColor" opacity={0.1} />
                                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'currentColor' }} className="text-foreground" />
                                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />

                                {/* Radar Area: Student vs Average */}
                                <Radar name={displayedStudentName || 'Student'} dataKey="erik" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.4} />
                                <Radar name="Class Avg." dataKey="avg" stroke="var(--color-muted-foreground)" fill="var(--color-muted-foreground)" fillOpacity={0.25} />

                                <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                                <Tooltip content={<DashboardTooltip />} allowEscapeViewBox={{ x: false, y: false }} animationDuration={0} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* 5. Student-Specific Error Words (Treemap) */}
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
                                            <rect x={x} y={y} width={width} height={height} style={{ fill, stroke: 'var(--color-background)', strokeWidth: 2 }} />
                                            {width > 30 && height > 20 && (
                                                <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="middle" fill="currentColor" className="text-foreground" fontSize={12} fontWeight="bold">
                                                    {word}
                                                </text>
                                            )}
                                        </g>
                                    );
                                }}
                            >
                                <Tooltip content={<DashboardTooltip />} allowEscapeViewBox={{ x: false, y: false }} animationDuration={0} />
                            </Treemap>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </>
    );
};
