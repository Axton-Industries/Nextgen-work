import { FILTER_OPTIONS } from '@/constants';
import { getWeeksInMonth } from '@/utils/chartUtils';
import type { StatCardData, StudentChartData, TimePerAssignment, WeekActivity, PerformanceTrend, SkillLevel, DateRange, FilterMode } from '@/types';

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
    },
    currentWeeks: number[],
    rangeStart: DateRange | null,
    rangeEnd: DateRange | null,
    filterMode: FilterMode
): StudentChartData => {
    const filterSeed = FILTER_OPTIONS.indexOf(timeFilter as any) !== -1
        ? FILTER_OPTIONS.indexOf(timeFilter as any)
        : timeFilter.length;
    const seed = studentName.length + filterSeed;

    // 1. Determine the exact set of weeks to display on the X-axis
    let displayedWeeks: { year: number, week: string | number }[] = [];

    if (rangeStart) {
        if (filterMode === 'weeks') {
            const startVal = rangeStart.year * 100 + rangeStart.month;
            const endWeek = rangeEnd ? rangeEnd : rangeStart;
            const endVal = endWeek.year * 100 + endWeek.month;

            const [s, e] = startVal <= endVal ? [rangeStart, endWeek] : [endWeek, rangeStart];

            // Generate range
            let curYear = s.year;
            let curWeek = s.month;
            while (curYear < e.year || (curYear === e.year && curWeek <= e.month)) {
                displayedWeeks.push({ year: curYear, week: curWeek });
                curWeek++;
                if (curWeek > 52) {
                    curWeek = 1;
                    curYear++;
                }
            }
        } else if (filterMode === 'months') {
            const startTotal = rangeStart.year * 12 + rangeStart.month;
            const endMonth = rangeEnd ? rangeEnd : rangeStart;
            const endTotal = endMonth.year * 12 + endMonth.month;

            const [minT, maxT] = startTotal <= endTotal ? [startTotal, endTotal] : [endTotal, startTotal];

            for (let t = minT; t <= maxT; t++) {
                const y = Math.floor(t / 12);
                const m = t % 12;
                const weeks = getWeeksInMonth(m);
                weeks.forEach(w => displayedWeeks.push({ year: y, week: w }));
            }
        }
    } else if (filterMode === 'presets') {
        const now = new Date();
        const year = now.getFullYear();
        if (timeFilter === 'Last week') {
            // Updated: Show days of the week instead of week numbers
            const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
            displayedWeeks = days.map(d => ({ year, week: d }));
        } else if (timeFilter === 'Last month') {
            const monthWeeks = getWeeksInMonth(0); // Simulated Jan
            displayedWeeks = monthWeeks.map(w => ({ year, week: w }));
        } else if (timeFilter === 'Current semester') {
            for (let m = 0; m < 4; m++) {
                const weeks = getWeeksInMonth(m);
                weeks.forEach(w => displayedWeeks.push({ year, week: w }));
            }
        } else {
            for (let w = 1; w <= 52; w++) {
                displayedWeeks.push({ year, week: w });
            }
        }
    }

    // Default to current pagination weeks if no specific range
    if (displayedWeeks.length === 0) {
        const year = new Date().getFullYear();
        displayedWeeks = currentWeeks.map(w => ({ year, week: w }));
    }

    // 2. Transformed data for the charts
    const getWeekSeed = (wObj: { year: number, week: string | number }) => {
        const weekVal = typeof wObj.week === 'string'
            ? wObj.week.charCodeAt(0) + wObj.week.charCodeAt(1)
            : wObj.week;
        return (seed + weekVal * 7 + wObj.year) % 100;
    };

    const getWeekActivityData = (wObj: { year: number, week: string | number }) => {
        const wSeed = getWeekSeed(wObj);
        const baseItem = typeof wObj.week === 'number'
            ? baseData.week.find(w => w.week === wObj.week)
            : null;

        if (baseItem) {
            return {
                ...baseItem,
                erik: Math.max(2, baseItem.erik + (wSeed % 10) - 5),
                avg: Math.max(5, baseItem.avg + (wSeed % 6) - 3)
            };
        }
        return {
            week: wObj.week,
            erik: 5 + (wSeed % 20),
            avg: 10 + (wSeed % 15)
        };
    };

    const getPerformanceData = (wObj: { year: number, week: string | number }) => {
        const wSeed = getWeekSeed(wObj);
        const baseItem = typeof wObj.week === 'number'
            ? baseData.performance.find(w => w.week === wObj.week)
            : null;

        if (baseItem) {
            return {
                ...baseItem,
                erik: Math.min(100, Math.max(30, baseItem.erik + (wSeed % 30) - 15)),
                class: Math.min(95, Math.max(40, baseItem.class + (wSeed % 20) - 10))
            };
        }
        return {
            week: wObj.week,
            erik: 60 + (wSeed % 35),
            class: 65 + (wSeed % 25)
        };
    };

    return {
        time: baseData.time.map((item, idx) => {
            const itemSeed = (seed + idx * 13) % 100;
            return {
                ...item,
                erik: Math.max(5, item.erik + (itemSeed % 12) - 6)
            };
        }),
        week: displayedWeeks.map(w => getWeekActivityData(w)),
        performance: displayedWeeks.map(w => getPerformanceData(w)),
        skills: baseData.skills.map((item, idx) => {
            const itemSeed = (seed + idx * 17) % 50;
            return {
                ...item,
                erik: Math.min(10, Math.max(2, item.erik + (itemSeed % 4) - 2))
            };
        })
    };
};
