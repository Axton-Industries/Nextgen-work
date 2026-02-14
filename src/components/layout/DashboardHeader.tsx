import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StudentSearch } from '../filters/StudentSearch';
import { TimeFilter } from '../filters/TimeFilter';

interface DashboardHeaderProps {
    isStudentView: boolean;
    onBackToOverview: () => void;
    searchValue: string;
    setSearchValue: (val: string) => void;
    isSearchFocused: boolean;
    setIsSearchFocused: (focused: boolean) => void;
    searchSuggestions: any[];
    setSelectedStudent: (student: string | null) => void;
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

export const DashboardHeader = ({
    isStudentView,
    onBackToOverview,
    searchValue,
    setSearchValue,
    isSearchFocused,
    setIsSearchFocused,
    searchSuggestions,
    setSelectedStudent,
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
}: DashboardHeaderProps) => {
    return (
        <header className="bg-background px-5 py-1.5 border-b shadow-sm flex items-center justify-between sticky top-0 z-10 w-full shrink-0">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <h1 className="text-lg font-black text-foreground font-display">Analytics</h1>
                    {isStudentView && (
                        <>
                            <Separator orientation="vertical" className="h-4" />
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={onBackToOverview}
                                className="h-7 gap-1.5 px-2 bg-primary/5 text-primary rounded-lg border border-primary/10 hover:bg-primary/10 transition-all text-[10px] font-bold group shadow-sm"
                            >
                                <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
                                Back to Overview
                            </Button>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <StudentSearch
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        isSearchFocused={isSearchFocused}
                        setIsSearchFocused={setIsSearchFocused}
                        searchSuggestions={searchSuggestions}
                        setSelectedStudent={setSelectedStudent}
                    />
                    <TimeFilter
                        timeFilter={timeFilter}
                        setTimeFilter={setTimeFilter}
                        isFilterDropdownOpen={isFilterDropdownOpen}
                        setIsFilterDropdownOpen={setIsFilterDropdownOpen}
                        filterMode={filterMode}
                        setFilterMode={setFilterMode}
                        rangeStart={rangeStart}
                        setRangeStart={setRangeStart}
                        rangeEnd={rangeEnd}
                        setRangeEnd={setRangeEnd}
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        weekOffset={weekOffset}
                        setWeekOffset={setWeekOffset}
                        FILTER_OPTIONS={FILTER_OPTIONS}
                        MONTHS={MONTHS}
                        CURRENT_WEEKS={CURRENT_WEEKS}
                    />
                </div>
            </div>
        </header>
    );
};
