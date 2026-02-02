import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
    setWeekOffset: (val: number | ((prev: number) => number)) => void;
    FILTER_OPTIONS: string[];
    MONTHS: string[];
    CURRENT_WEEKS: number[];
}

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
    setWeekOffset,
    FILTER_OPTIONS,
    MONTHS,
    CURRENT_WEEKS
}: TimeFilterProps) => {
    return (
        <Popover open={isFilterDropdownOpen} onOpenChange={setIsFilterDropdownOpen}>
            <PopoverTrigger asChild>
                <div>
                    <FilterButton
                        icon={Calendar}
                        text={timeFilter}
                        hasArrow
                        active={isFilterDropdownOpen}
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-0 overflow-hidden" align="end">
                <Tabs value={filterMode} onValueChange={(v) => setFilterMode(v as any)} className="flex">
                    <TabsList className="flex flex-col h-auto w-24 bg-muted rounded-none p-1.5 space-y-1 items-stretch">
                        <TabsTrigger
                            value="presets"
                            className="justify-start px-2 py-1.5 text-[9px] font-black uppercase tracking-tighter transition-all data-[state=active]:bg-background data-[state=active]:text-primary"
                        >
                            Presets
                        </TabsTrigger>
                        <TabsTrigger
                            value="months"
                            className="justify-start px-2 py-1.5 text-[9px] font-black uppercase tracking-tighter transition-all data-[state=active]:bg-background data-[state=active]:text-primary"
                        >
                            Months
                        </TabsTrigger>
                        <TabsTrigger
                            value="weeks"
                            className="justify-start px-2 py-1.5 text-[9px] font-black uppercase tracking-tighter transition-all data-[state=active]:bg-background data-[state=active]:text-primary"
                        >
                            Weeks
                        </TabsTrigger>
                    </TabsList>

                    <div className="flex-1 overflow-hidden">
                        <TabsContent value="presets" className="p-3 m-0 bg-background h-[300px] overflow-y-auto custom-scrollbar">
                            <div className="space-y-0.5">
                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-2 px-1">Quick Select</p>
                                {FILTER_OPTIONS.map(option => (
                                    <Button
                                        key={option}
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-between px-2 py-1.5 h-8 text-[10px] font-bold rounded-lg transition-all",
                                            timeFilter === option ? "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary" : "text-muted-foreground hover:bg-muted"
                                        )}
                                        onClick={() => {
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

                        <TabsContent value="months" className="p-3 m-0 bg-background h-[300px] overflow-y-auto custom-scrollbar">
                            <div className="flex items-center justify-between mb-3 px-1">
                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none">
                                    Academic Year {selectedYear}
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
                                    const currentTotal = selectedYear * 12 + idx;
                                    const startTotal = rangeStart ? rangeStart.year * 12 + rangeStart.month : null;
                                    const endTotal = rangeEnd ? rangeEnd.year * 12 + rangeEnd.month : null;

                                    const isStart = rangeStart?.year === selectedYear && rangeStart.month === idx;
                                    const isEnd = rangeEnd?.year === selectedYear && rangeEnd.month === idx;

                                    let inRange = false;
                                    if (startTotal !== null && endTotal !== null) {
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
                                                const newPoint = { year: selectedYear, month: idx };
                                                if (rangeStart === null || rangeEnd !== null) {
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
                                                "h-8 px-1 py-2 text-[9px] font-bold rounded-md transition-all border",
                                                isSelected ? "bg-primary border-primary text-primary-foreground z-10 shadow-md hover:bg-primary/90" : inRange ? "bg-primary/10 border-primary/20 text-primary hover:bg-primary/20" : "border-transparent text-muted-foreground hover:bg-muted"
                                            )}
                                        >
                                            {month.substring(0, 3)}
                                        </Button>
                                    );
                                })}
                            </div>
                        </TabsContent>

                        <TabsContent value="weeks" className="p-3 m-0 bg-background h-[300px] overflow-y-auto custom-scrollbar">
                            <div className="flex items-center justify-between mb-3 px-1">
                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none">
                                    Select Weeks Range
                                </p>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setWeekOffset(prev => Math.max(0, prev - 12))}>
                                        <ChevronLeft size={10} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setWeekOffset(prev => prev + 12)}>
                                        <ChevronRight size={10} />
                                    </Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-1 px-1">
                                {CURRENT_WEEKS.map((weekNum) => {
                                    const isStart = rangeStart?.year === -1 && rangeStart.month === weekNum;
                                    const isEnd = rangeEnd?.year === -1 && rangeEnd.month === weekNum;
                                    let inRange = false;
                                    if (rangeStart?.year === -1 && rangeEnd?.year === -1) {
                                        const min = Math.min(rangeStart.month, rangeEnd.month);
                                        const max = Math.max(rangeStart.month, rangeEnd.month);
                                        inRange = weekNum >= min && weekNum <= max;
                                    }
                                    const isSelected = isStart || isEnd;

                                    return (
                                        <Button
                                            key={weekNum}
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                const newPoint = { year: -1, month: weekNum };
                                                if (rangeStart?.year !== -1 || rangeEnd !== null) {
                                                    setRangeStart(newPoint);
                                                    setRangeEnd(null);
                                                    setTimeFilter(`Week ${weekNum}`);
                                                } else {
                                                    setRangeEnd(newPoint);
                                                    const start = Math.min(rangeStart.month, weekNum);
                                                    const end = Math.max(rangeStart.month, weekNum);
                                                    setRangeStart({ year: -1, month: start });
                                                    setRangeEnd({ year: -1, month: end });
                                                    setTimeFilter(`W${start} - W${end}`);
                                                }
                                            }}
                                            className={cn(
                                                "h-8 px-1 py-2 text-[9px] font-bold rounded-md transition-all border",
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
