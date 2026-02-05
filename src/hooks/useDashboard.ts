import { useState, useMemo } from 'react';
import type { Student, DateRange, FilterMode } from '@/types';

export const useStudentSearch = (students: Student[]) => {
    const [searchValue, setSearchValue] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const searchSuggestions = useMemo(() => {
        if (!searchValue.trim()) return [];
        return students
            .filter(s => s.full_name.toLowerCase().includes(searchValue.toLowerCase()))
            .slice(0, 5);
    }, [searchValue, students]);

    return {
        searchValue,
        setSearchValue,
        isSearchFocused,
        setIsSearchFocused,
        searchSuggestions
    };
};

export const useTimeFilter = () => {
    const [timeFilter, setTimeFilter] = useState('Current academic year');
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [filterMode, setFilterMode] = useState<FilterMode>('presets');
    const [rangeStart, setRangeStart] = useState<DateRange | null>(null);
    const [rangeEnd, setRangeEnd] = useState<DateRange | null>(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [weekOffset, setWeekOffset] = useState(0);

    return {
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
        setWeekOffset
    };
};

export const useStudentSelection = () => {
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

    const isStudentView = !!selectedStudent;

    return {
        selectedStudent,
        setSelectedStudent,
        isStudentModalOpen,
        setIsStudentModalOpen,
        isStudentView
    };
};
