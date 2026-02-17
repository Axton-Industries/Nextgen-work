import { useMemo } from 'react';
import { addColorsToErrorData, layoutBubbles, generateWeekNumbers } from '@/utils/chartUtils';
import { getStudentStats, generateStudentChartData } from '@/utils/studentUtils';
import type {
    StatCardData,
    ErrorAnalysis,
    ErrorQuestion,
    TimePerAssignment,
    WeekActivity,
    PerformanceTrend,
    SkillLevel,
    DateRange
} from '@/types';

interface UseChartDataProps {
    selectedStudent: string | null;
    timeFilter: string;
    weekOffset: number;
    summaryStats: StatCardData[];
    errorAnalysisData: ErrorAnalysis[];
    topErrorQuestions: ErrorQuestion[];
    baseStudentData: {
        time: TimePerAssignment[];
        week: WeekActivity[];
        performance: PerformanceTrend[];
        skills: SkillLevel[];
    };
    rangeStart: DateRange | null;
    rangeEnd: DateRange | null;
    filterMode: 'presets' | 'months' | 'weeks';
}

export const useChartData = ({
    selectedStudent,
    timeFilter,
    weekOffset,
    summaryStats,
    errorAnalysisData,
    topErrorQuestions,
    baseStudentData,
    rangeStart,
    rangeEnd,
    filterMode
}: UseChartDataProps) => {
    // Active stats based on view
    const activeStats = useMemo(() => {
        if (!selectedStudent) return summaryStats;
        return getStudentStats(selectedStudent, timeFilter);
    }, [selectedStudent, timeFilter, summaryStats]);

    // Current weeks for filter
    const currentWeeks = useMemo(() => {
        return generateWeekNumbers(weekOffset);
    }, [weekOffset]);

    // Student-specific chart data
    const studentCharts = useMemo(() => {
        if (!selectedStudent) return null;
        return generateStudentChartData(
            selectedStudent,
            timeFilter,
            baseStudentData,
            currentWeeks,
            rangeStart,
            rangeEnd,
            filterMode
        );
    }, [selectedStudent, timeFilter, baseStudentData, currentWeeks, rangeStart, rangeEnd, filterMode]);

    // Error analysis with colors
    const dataWithColors = useMemo(() => {
        return addColorsToErrorData(errorAnalysisData);
    }, [errorAnalysisData]);

    // Bubble layout for error questions
    const layoutBubblesData = useMemo(() => {
        return layoutBubbles(topErrorQuestions);
    }, [topErrorQuestions]);

    return {
        activeStats,
        studentCharts,
        dataWithColors,
        layoutBubblesData,
        currentWeeks
    };
};
