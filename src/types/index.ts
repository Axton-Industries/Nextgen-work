// Student Types
export interface Student {
    id: number;
    full_name: string;
    active: boolean;
}

// Chart Data Types
export interface WritingOverview {
    student_id: number;
    full_name: string;
    word_count: number;
    last_submission: string;
}

export interface EngagementMetric {
    id: number;
    full_name: string;
    submission_count: number;
    time_spent_min: number;
}

export interface ImprovementStat {
    id: number;
    full_name: string;
    resubmission_avg: number;
    score_avg: number;
}

export interface ErrorAnalysis {
    word_id: number;
    word: string;
    occurrence_count: number;
    fill?: string;
}

export interface ErrorQuestion {
    id: number;
    question: string;
    errors: number;
}

export interface BubbleData extends ErrorQuestion {
    radius: number;
    diameter: number;
    color: string;
    x: number;
    y: number;
}

// Student Chart Data Types
export interface TimePerAssignment {
    name: string;
    erik: number;
    class: number;
}

export interface WeekActivity {
    week: string | number;
    erik: number;
    avg: number;
}

export interface PerformanceTrend {
    week: string | number;
    erik: number;
    class: number;
}

export interface SkillLevel {
    subject: string;
    erik: number;
    avg: number;
}

export interface StudentChartData {
    time: TimePerAssignment[];
    week: WeekActivity[];
    performance: PerformanceTrend[];
    skills: SkillLevel[];
}

// Stat Card Types
export interface StatCardData {
    title: string;
    value: string;
    subtext: string;
}

// Filter Types
export interface DateRange {
    year: number;
    month: number; // 0-11 for months, 1-52 for weeks
}

export type FilterMode = 'presets' | 'months' | 'weeks';
