import { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilterButton } from './FilterButton';
import { cn } from "@/lib/utils";

interface TimeFilterProps {
    timeFilter: string;
    setTimeFilter: (val: string) => void;
    isFilterDropdownOpen: boolean;
    setIsFilterDropdownOpen: (open: boolean) => void;
    filterMode: 'presets' | 'months' | 'weeks';
    setFilterMode: (mode: 'presets' | 'months' | 'weeks') => void;
    rangeStart: { year: number; month: number } | null;
    setRangeStart: (val: { year: number; month: number } | null) => void;
    rangeEnd: { year: number; month: number } | null;
    setRangeEnd: (val: { year: number; month: number } | null) => void;
    selectedYear: number;
    setSelectedYear: (val: number | ((prev: number) => number)) => void;
    weekOffset: number;
    setWeekOffset: (val: number | ((prev: number) => number)) => void;
    FILTER_OPTIONS: string[];
    MONTHS: string[];
    CURRENT_WEEKS: number[];
}

/**
 * Maps a week number (1-52) to its corresponding month index (0-11)
 * Follows a standard 4-4-5 accounting calendar pattern for consistency
 */
import { getMonthIdxFromWeek } from '@/utils/chartUtils';

/**
 * Checks if a week number (1-52) falls within a specific month index (0-11)
 */
const isWeekInMonth = (week: number, monthIdx: number) => {
    return getMonthIdxFromWeek(week) === monthIdx;
};

export const TimeFilter = ({
    timeFilter,
    setTimeFilter,
    isFilterDropdownOpen,
    setIsFilterDropdownOpen,
    filterMode,
    setFilterMode,
    rangeStart,
    setRangeStart,
    rangeEnd,
    setRangeEnd,
    selectedYear,
    setSelectedYear,
    weekOffset,
    setWeekOffset,
    FILTER_OPTIONS,
    MONTHS,
    CURRENT_WEEKS
}: TimeFilterProps) => {
    // Local state for the UI tab, so switching tabs doesn't immediately change the charts
    const [localTab, setLocalTab] = useState<'presets' | 'months' | 'weeks'>(filterMode);

    // Sync local tab with global filter mode when the dropdown opens
    useEffect(() => {
        if (isFilterDropdownOpen) {
            setLocalTab(filterMode);
        }
    }, [isFilterDropdownOpen, filterMode]);

    return (
        <Popover open={isFilterDropdownOpen} onOpenChange={setIsFilterDropdownOpen}>
            <PopoverAnchor asChild>
                <div className="min-w-[180px] flex justify-start">
                    <PopoverTrigger asChild>
                        <div className="cursor-pointer">
                            <FilterButton
                                icon={Calendar}
                                text={timeFilter}
                                hasArrow
                                active={isFilterDropdownOpen}
                            />
                        </div>
                    </PopoverTrigger>
                </div>
            </PopoverAnchor>
            <PopoverContent className="w-[280px] p-0 overflow-hidden" align="start">
                <Tabs
                    value={localTab}
                    onValueChange={(v) => setLocalTab(v as 'presets' | 'months' | 'weeks')}
                    className="flex"
                >
                    <TabsList className="flex flex-col h-auto w-20 bg-muted rounded-none p-1.5 space-y-1 items-stretch border-r">
                        <TabsTrigger
                            value="presets"
                            className="justify-start px-2 py-1.5 text-[10px] font-black uppercase tracking-tighter transition-all data-[state=active]:bg-background data-[state=active]:text-primary"
                        >
                            Presets
                        </TabsTrigger>
                        <TabsTrigger
                            value="months"
                            className="justify-start px-2 py-1.5 text-[10px] font-black uppercase tracking-tighter transition-all data-[state=active]:bg-background data-[state=active]:text-primary"
                        >
                            Months
                        </TabsTrigger>
                        <TabsTrigger
                            value="weeks"
                            className="justify-start px-2 py-1.5 text-[10px] font-black uppercase tracking-tighter transition-all data-[state=active]:bg-background data-[state=active]:text-primary"
                        >
                            Weeks
                        </TabsTrigger>
                    </TabsList>

                    <div className="flex-1 overflow-hidden">
                        <TabsContent value="presets" className="p-2 m-0 bg-background h-[170px] overflow-y-auto custom-scrollbar">
                            <div className="space-y-0 text-left">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 px-1">Quick Select</p>
                                {FILTER_OPTIONS.map(option => (
                                    <Button
                                        key={option}
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-between px-2 h-7 text-[11px] font-bold rounded-md transition-all",
                                            timeFilter === option ? "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary" : "text-muted-foreground hover:bg-muted"
                                        )}
                                        onClick={() => {
                                            setFilterMode('presets');
                                            setRangeStart(null);
                                            setRangeEnd(null);
                                            setTimeFilter(option);
                                            setIsFilterDropdownOpen(false);
                                        }}
                                    >
                                        {option}
                                        {timeFilter === option && <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>}
                                    </Button>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="months" className="p-2 m-0 bg-background h-[170px] overflow-y-auto custom-scrollbar">
                            <div className="flex items-center justify-between mb-1.5 px-1">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">
                                    Year {selectedYear}
                                </p>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setSelectedYear(prev => prev - 1)}>
                                        <ChevronLeft size={10} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setSelectedYear(prev => prev + 1)}>
                                        <ChevronRight size={10} />
                                    </Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-1 px-1">
                                {MONTHS.map((month, idx) => {
                                    // Detect if the stored range is actually a week-based range
                                    const isWeekRange = timeFilter.startsWith('W') || timeFilter.includes('Week');

                                    // Interpret the stored 'month' property accordingly
                                    const startMonthIdx = rangeStart
                                        ? (isWeekRange ? getMonthIdxFromWeek(rangeStart.month) : rangeStart.month)
                                        : null;
                                    const endMonthIdx = rangeEnd
                                        ? (isWeekRange ? getMonthIdxFromWeek(rangeEnd.month) : rangeEnd.month)
                                        : null;

                                    const currentTotal = selectedYear * 12 + idx;
                                    const startTotal = rangeStart !== null && startMonthIdx !== null ? rangeStart.year * 12 + startMonthIdx : null;
                                    const endTotal = rangeEnd !== null && endMonthIdx !== null ? rangeEnd.year * 12 + endMonthIdx : null;

                                    // Only show highlighting if we have a valid range
                                    const hasRange = rangeStart !== null;

                                    const isStart = hasRange && rangeStart?.year === selectedYear && startMonthIdx === idx;
                                    const isEnd = hasRange && rangeEnd?.year === selectedYear && endMonthIdx === idx;

                                    let inRange = false;
                                    if (hasRange && startTotal !== null && endTotal !== null) {
                                        const min = Math.min(startTotal, endTotal);
                                        const max = Math.max(startTotal, endTotal);
                                        inRange = currentTotal >= min && currentTotal <= max;
                                    }

                                    const isSelected = isStart || isEnd;

                                    return (
                                        <Button
                                            key={month}
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setFilterMode('months');
                                                const isStart = rangeStart?.year === selectedYear && rangeStart.month === idx && filterMode === 'months';
                                                const isEnd = rangeEnd?.year === selectedYear && rangeEnd.month === idx && filterMode === 'months';

                                                if (isStart || isEnd) {
                                                    if (isStart && rangeEnd) {
                                                        const remaining = rangeEnd;
                                                        setRangeStart(remaining);
                                                        setRangeEnd(null);
                                                        setTimeFilter(`${MONTHS[remaining.month]} ${remaining.year}`);
                                                    } else if (isEnd && rangeStart) {
                                                        setRangeEnd(null);
                                                        setTimeFilter(`${MONTHS[rangeStart.month]} ${rangeStart.year}`);
                                                    } else {
                                                        setRangeStart(null);
                                                        setRangeEnd(null);
                                                        setFilterMode('presets');
                                                        setTimeFilter('Current academic year');
                                                    }
                                                    return;
                                                }

                                                const newPoint = { year: selectedYear, month: idx };
                                                if (rangeStart === null || rangeEnd !== null || filterMode !== 'months') {
                                                    setRangeStart(newPoint);
                                                    setRangeEnd(null);
                                                    setTimeFilter(`${month} ${selectedYear}`);
                                                } else {
                                                    setRangeEnd(newPoint);
                                                    const s = rangeStart;
                                                    const e = newPoint;
                                                    const sTotal = s.year * 12 + s.month;
                                                    const eTotal = e.year * 12 + e.month;
                                                    const [start, end] = sTotal <= eTotal ? [s, e] : [e, s];
                                                    const startLabel = `${MONTHS[start.month].substring(0, 3)} ${start.year}`;
                                                    const endLabel = `${MONTHS[end.month].substring(0, 3)} ${end.year}`;
                                                    setTimeFilter(`${startLabel} - ${endLabel}`);
                                                }
                                            }}
                                            className={cn(
                                                "h-7 px-1 py-1.5 text-[11px] font-bold rounded-md transition-all border",
                                                isSelected ? "bg-primary border-primary text-primary-foreground z-10 shadow-md hover:bg-primary/90" : inRange ? "bg-primary/10 border-primary/20 text-primary hover:bg-primary/20" : "border-transparent text-muted-foreground hover:bg-muted"
                                            )}
                                        >
                                            {month.substring(0, 3)}
                                        </Button>
                                    );
                                })}
                            </div>
                        </TabsContent>

                        <TabsContent value="weeks" className="p-2 m-0 bg-background h-[170px] overflow-y-auto custom-scrollbar">
                            <div className="flex items-center justify-between mb-1.5 px-1 pb-1 border-b border-muted/50">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">
                                    Year {selectedYear}
                                </p>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5 hover:scale-110 active:scale-90 transition-all"
                                        onClick={() => {
                                            if (weekOffset === 0) {
                                                setSelectedYear(prev => prev - 1);
                                                setWeekOffset(48);
                                            } else {
                                                setWeekOffset(prev => prev - 12);
                                            }
                                        }}
                                    >
                                        <ChevronLeft size={10} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5 hover:scale-110 active:scale-90 transition-all"
                                        onClick={() => {
                                            if (weekOffset >= 48) {
                                                setSelectedYear(prev => prev + 1);
                                                setWeekOffset(0);
                                            } else {
                                                setWeekOffset(prev => prev + 12);
                                            }
                                        }}
                                    >
                                        <ChevronRight size={10} />
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-1 px-1 mt-1.5">
                                {CURRENT_WEEKS.filter(w => w <= 52).map((weekNum) => {
                                    const currentPoint = { year: selectedYear, month: weekNum };

                                    // Detect if the stored range is month-based
                                    const isWeekRange = timeFilter.startsWith('W') || timeFilter.includes('Week');
                                    const isMonthRange = !isWeekRange && rangeStart !== null &&
                                        (MONTHS.some(m => timeFilter.includes(m)) || timeFilter.includes(' - '));

                                    // If it's a month selection, a week belongs if it maps to that month
                                    const isStart = rangeStart?.year === selectedYear && (
                                        isMonthRange ? isWeekInMonth(weekNum, rangeStart.month) : rangeStart.month === weekNum
                                    );
                                    const isEnd = rangeEnd?.year === selectedYear && (
                                        isMonthRange ? isWeekInMonth(weekNum, rangeEnd.month) : rangeEnd.month === weekNum
                                    );

                                    let inRange = false;
                                    if (rangeStart && rangeEnd) {
                                        const pVal = selectedYear * 100 + weekNum;

                                        if (isMonthRange) {
                                            const startTotal = rangeStart.year * 12 + rangeStart.month;
                                            const endTotal = rangeEnd.year * 12 + rangeEnd.month;
                                            const minT = Math.min(startTotal, endTotal);
                                            const maxT = Math.max(startTotal, endTotal);
                                            const currentT = selectedYear * 12 + getMonthIdxFromWeek(weekNum);
                                            inRange = currentT >= minT && currentT <= maxT;
                                        } else {
                                            const startVal = rangeStart.year * 100 + rangeStart.month;
                                            const endVal = rangeEnd.year * 100 + rangeEnd.month;
                                            const minVal = Math.min(startVal, endVal);
                                            const maxVal = Math.max(startVal, endVal);
                                            inRange = pVal >= minVal && pVal <= maxVal;
                                        }
                                    }

                                    const isSelected = isStart || isEnd;

                                    return (
                                        <Button
                                            key={weekNum}
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setFilterMode('weeks');
                                                const isStart = rangeStart?.year === selectedYear && rangeStart.month === weekNum && filterMode === 'weeks';
                                                const isEnd = rangeEnd?.year === selectedYear && rangeEnd.month === weekNum && filterMode === 'weeks';

                                                if (isStart || isEnd) {
                                                    if (isStart && rangeEnd) {
                                                        const remaining = rangeEnd;
                                                        setRangeStart(remaining);
                                                        setRangeEnd(null);
                                                        setTimeFilter(`Week ${remaining.month} ${remaining.year}`);
                                                    } else if (isEnd && rangeStart) {
                                                        setRangeEnd(null);
                                                        setTimeFilter(`Week ${rangeStart.month} ${rangeStart.year}`);
                                                    } else {
                                                        setRangeStart(null);
                                                        setRangeEnd(null);
                                                        setFilterMode('presets');
                                                        setTimeFilter('Current academic year');
                                                    }
                                                    return;
                                                }

                                                if (!rangeStart || rangeEnd || filterMode !== 'weeks') {
                                                    // Start new selection
                                                    setRangeStart(currentPoint);
                                                    setRangeEnd(null);
                                                    setTimeFilter(`Week ${weekNum} ${selectedYear}`);
                                                } else {
                                                    // Complete the range
                                                    setRangeEnd(currentPoint);

                                                    // Determine chronological order for the label
                                                    const startVal = rangeStart.year * 100 + rangeStart.month;
                                                    const endVal = currentPoint.year * 100 + currentPoint.month;

                                                    if (startVal <= endVal) {
                                                        setTimeFilter(`W${rangeStart.month} ${rangeStart.year} - W${weekNum} ${selectedYear}`);
                                                    } else {
                                                        setTimeFilter(`W${weekNum} ${selectedYear} - W${rangeStart.month} ${rangeStart.year}`);
                                                    }
                                                }
                                            }}
                                            className={cn(
                                                "h-7 px-1 py-1.5 text-[11px] font-bold rounded-md transition-all border",
                                                isSelected ? "bg-primary border-primary text-primary-foreground z-10 shadow-md hover:bg-primary/90" : inRange ? "bg-primary/10 border-primary/20 text-primary hover:bg-primary/20" : "border-transparent text-muted-foreground hover:bg-muted"
                                            )}
                                        >
                                            W{weekNum}
                                        </Button>
                                    );
                                })}
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </PopoverContent>
        </Popover>
    );
};
