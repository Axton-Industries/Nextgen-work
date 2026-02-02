import { FILTER_OPTIONS } from '@/constants';
import type { StatCardData, StudentChartData, TimePerAssignment, WeekActivity, PerformanceTrend, SkillLevel } from '@/types';

/**
 * Generates student statistics based on name and time filter
 */
export const getStudentStats = (name: string, timeFilter: string): StatCardData[] => {
    const filterSeed = FILTER_OPTIONS.indexOf(timeFilter as any) !== -1
        ? FILTER_OPTIONS.indexOf(timeFilter as any)
        : timeFilter.length;
    const seed = name.length + filterSeed;

    return [
        { title: "Student Name", value: name, subtext: "" },
        {
            title: "Time spent on the app",
            value: `${15 + (seed % 10)}min`,
            subtext: "+5% from last week"
        },
        {
            title: "Avg score in the assignments",
            value: `${65 + (seed % 25)}%`,
            subtext: "+10% from last week"
        },
        {
            title: "Avg completion per assignment",
            value: `${70 + (seed % 15)}%`,
            subtext: "-8% from last week"
        }
    ];
};

/**
 * Generates student chart data with variation based on student name and filter
 */
export const generateStudentChartData = (
    studentName: string,
    timeFilter: string,
    baseData: {
        time: TimePerAssignment[];
        week: WeekActivity[];
        performance: PerformanceTrend[];
        skills: SkillLevel[];
    }
): StudentChartData => {
    const filterSeed = FILTER_OPTIONS.indexOf(timeFilter as any) !== -1
        ? FILTER_OPTIONS.indexOf(timeFilter as any)
        : timeFilter.length;
    const seed = studentName.length + filterSeed;

    return {
        time: baseData.time.map(item => ({
            ...item,
            erik: Math.max(0, item.erik + (seed % 10) - 5)
        })),
        week: baseData.week.map(item => ({
            ...item,
            erik: Math.max(0, item.erik + (seed % 6) - 3)
        })),
        performance: baseData.performance.map(item => ({
            ...item,
            erik: Math.min(100, Math.max(0, item.erik + (seed % 20) - 10))
        })),
        skills: baseData.skills.map(item => ({
            ...item,
            erik: Math.min(10, Math.max(0, item.erik + (seed % 4) - 2))
        }))
    };
};
