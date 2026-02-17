import { INTENSITY_PALETTE } from '@/constants';
import type { ErrorAnalysis, ErrorQuestion, BubbleData } from '@/types';

/**
 * Adds color to error analysis data based on occurrence count
 */
export const addColorsToErrorData = (data: ErrorAnalysis[]): ErrorAnalysis[] => {
    return [...data]
        .sort((a, b) => b.occurrence_count - a.occurrence_count)
        .map((item, index) => ({
            ...item,
            fill: INTENSITY_PALETTE[Math.min(index, INTENSITY_PALETTE.length - 1)]
        }));
};

/**
 * Layouts bubbles using a circle packing algorithm to prevent overlaps
 */
export const layoutBubbles = (questions: ErrorQuestion[]): BubbleData[] => {
    const items = [...questions]
        .sort((a, b) => b.errors - a.errors)
        .map((q, index) => {
            const diameter = q.errors * 1.8 + 20;
            return {
                ...q,
                radius: diameter / 2,
                diameter,
                color: INTENSITY_PALETTE[Math.min(index, INTENSITY_PALETTE.length - 1)],
                x: 0,
                y: 0
            };
        });

    const placed: BubbleData[] = [];

    items.forEach((item, i) => {
        if (i === 0) {
            placed.push(item);
            return;
        }

        let angle = 0;
        let distance = item.radius + placed[0].radius;
        let safe = false;
        let failsafe = 0;

        while (!safe && failsafe < 5000) {
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            let collision = false;

            for (const p of placed) {
                const dist = Math.sqrt(Math.pow(x - p.x, 2) + Math.pow(y - p.y, 2));
                if (dist < (item.radius + p.radius)) {
                    collision = true;
                    break;
                }
            }

            if (!collision) {
                item.x = x;
                item.y = y;
                placed.push(item);
                safe = true;
            } else {
                angle += 0.5;
                distance += 0.5;
            }
            failsafe++;
        }
    });

    return placed;
};

/**
 * Generates week numbers for the current offset
 */
export const generateWeekNumbers = (offset: number, count: number = 12): number[] => {
    return Array.from({ length: count }, (_, i) => i + offset + 1);
};

/**
 * Maps a week number (1-52) to its corresponding month index (0-11)
 * Follows a standard 4-4-5 accounting calendar pattern
 */
export const getMonthIdxFromWeek = (week: number) => {
    if (week <= 4) return 0;  // Jan
    if (week <= 8) return 1;  // Feb
    if (week <= 13) return 2; // Mar (5 weeks)
    if (week <= 17) return 3; // Apr
    if (week <= 21) return 4; // May
    if (week <= 26) return 5; // Jun (5 weeks)
    if (week <= 30) return 6; // Jul
    if (week <= 34) return 7; // Aug
    if (week <= 39) return 8; // Sep (5 weeks)
    if (week <= 43) return 9; // Oct
    if (week <= 47) return 10;// Nov
    return 11;                // Dec (5 weeks)
};

/**
 * Returns all week numbers that belong to a specific month index
 */
export const getWeeksInMonth = (monthIdx: number): number[] => {
    const weeks: number[] = [];
    for (let i = 1; i <= 52; i++) {
        if (getMonthIdxFromWeek(i) === monthIdx) {
            weeks.push(i);
        }
    }
    return weeks;
};
/**
 * Returns the first and last week numbers for a specific month index
 */
export const getWeekBoundariesForMonth = (monthIdx: number): { start: number; end: number } => {
    const weeks = getWeeksInMonth(monthIdx);
    return {
        start: Math.min(...weeks),
        end: Math.max(...weeks)
    };
};
