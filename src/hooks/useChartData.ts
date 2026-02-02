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
    SkillLevel
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
}

export const useChartData = ({
    selectedStudent,
    timeFilter,
    weekOffset,
    summaryStats,
    errorAnalysisData,
    topErrorQuestions,
    baseStudentData
}: UseChartDataProps) => {
    // Active stats based on view
    const activeStats = useMemo(() => {
        if (!selectedStudent) return summaryStats;
        return getStudentStats(selectedStudent, timeFilter);
    }, [selectedStudent, timeFilter, summaryStats]);

    // Student-specific chart data
    const studentCharts = useMemo(() => {
        if (!selectedStudent) return null;
        return generateStudentChartData(selectedStudent, timeFilter, baseStudentData);
    }, [selectedStudent, timeFilter, baseStudentData]);

    // Error analysis with colors
    const dataWithColors = useMemo(() => {
        return addColorsToErrorData(errorAnalysisData);
    }, [errorAnalysisData]);

    // Bubble layout for error questions
    const layoutBubblesData = useMemo(() => {
        return layoutBubbles(topErrorQuestions);
    }, [topErrorQuestions]);

    // Current weeks for filter
    const currentWeeks = useMemo(() => {
        return generateWeekNumbers(weekOffset);
    }, [weekOffset]);

    return {
        activeStats,
        studentCharts,
        dataWithColors,
        layoutBubblesData,
        currentWeeks
    };
};
