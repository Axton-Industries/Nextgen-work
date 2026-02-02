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
