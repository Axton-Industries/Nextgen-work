import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, Treemap, LineChart, Line, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';
import {
  Home, BookOpen, MessageSquare, LayoutGrid, CheckSquare,
  Bot, GraduationCap, Sparkles, Binary, Video, Headphones,
  X, Calendar, UserCircle, ArrowLeft, ChevronLeft, ChevronRight
} from 'lucide-react';

// Components
import { IconButton } from './components/IconButton';
import { StatCard } from './components/StatCard';
import { FilterButton } from './components/FilterButton';
import { DashboardTooltip } from './components/DashboardTooltip';

// Data (Simulated Postgres Rows)
import {
  writing_overview_rows,
  engagement_metrics,
  improvement_stats,
  error_analysis_treemap,
  top_error_questions,
  summary_stats,
  erik_time_per_assignment,
  erik_week_activity,
  erik_performance_trend,
  erik_skills,
  students
} from '../data/mockData';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [timeFilter, setTimeFilter] = useState('Current academic year');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [filterMode, setFilterMode] = useState<'presets' | 'months' | 'weeks'>('presets');
  const [rangeStart, setRangeStart] = useState<{ year: number; month: number } | null>(null);
  const [rangeEnd, setRangeEnd] = useState<{ year: number; month: number } | null>(null);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [weekOffset, setWeekOffset] = useState(0);

  const FILTER_OPTIONS = [
    'Current academic year',
    'Last 6 months',
    'Last 3 months',
    'Last month',
    'Last week'
  ];

  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const CURRENT_WEEKS = Array.from({ length: 12 }, (_, i) => i + weekOffset + 1);

  const searchSuggestions = useMemo(() => {
    if (!searchValue.trim()) return [];
    return students.filter(s =>
      s.full_name.toLowerCase().includes(searchValue.toLowerCase())
    ).slice(0, 5);
  }, [searchValue]);

  const displayedStudentName = selectedStudent;
  const isStudentView = !!displayedStudentName;

  // Helper to generate "unique" stats for each student based on their name
  const getStudentStats = (name: string) => {
    // Simple deterministic variation based on name length/chars AND time filter
    const filterSeed = FILTER_OPTIONS.indexOf(timeFilter) !== -1
      ? FILTER_OPTIONS.indexOf(timeFilter)
      : timeFilter.length;

    const seed = name.length + filterSeed;
    const timeVal = (15 + (seed % 10)).toString() + "min";
    const scoreVal = (65 + (seed % 25)).toString() + "%";
    const completionVal = (70 + (seed % 15)).toString() + "%";

    return [
      { title: "Student Name", value: name, subtext: "" },
      { title: "Time spent on the app", value: timeVal, subtext: "+5% from last week" },
      { title: "Avg score in the assignments", value: scoreVal, subtext: "+10% from last week" },
      { title: "Avg completion per assignment", value: completionVal, subtext: "-8% from last week" }
    ];
  };

  const currentStudentStats = useMemo(() => {
    if (!displayedStudentName) return summary_stats;
    return getStudentStats(displayedStudentName);
  }, [displayedStudentName]);

  const activeStats = currentStudentStats;

  // Derive unique chart data for the selected student
  const studentCharts = useMemo(() => {
    if (!displayedStudentName) return null;
    if (displayedStudentName === 'Erik') return {
      time: erik_time_per_assignment,
      week: erik_week_activity,
      performance: erik_performance_trend,
      skills: erik_skills
    };

    // Deterministic variation for other students so that I don't have to generate data for each indiv
    const filterSeed = FILTER_OPTIONS.indexOf(timeFilter) !== -1
      ? FILTER_OPTIONS.indexOf(timeFilter)
      : timeFilter.length;

    const seed = displayedStudentName.length + filterSeed;
    return {
      time: erik_time_per_assignment.map(item => ({ ...item, erik: Math.max(0, item.erik + (seed % 10) - 5) })),
      week: erik_week_activity.map(item => ({ ...item, erik: Math.max(0, item.erik + (seed % 6) - 3) })),
      performance: erik_performance_trend.map(item => ({ ...item, erik: Math.min(100, Math.max(0, item.erik + (seed % 20) - 10)) })),
      skills: erik_skills.map(item => ({ ...item, erik: Math.min(10, Math.max(0, item.erik + (seed % 4) - 2)) }))
    };
  }, [displayedStudentName, timeFilter]);

  // Professional High-Contrast Palette (Lighter Intensity Scale)
  const INTENSITY_PALETTE = ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'];

  const dataWithColors = useMemo(() => {
    return [...error_analysis_treemap]
      .sort((a, b) => b.occurrence_count - a.occurrence_count)
      .map((item, index) => ({
        ...item,
        fill: INTENSITY_PALETTE[Math.min(index, INTENSITY_PALETTE.length - 1)]
      }));
  }, []);

  // Automatic Bubble Layout Calculation
  const layoutBubbles = useMemo(() => {
    // 1. Prepare items with dimensions and value-based colors
    const items = [...top_error_questions]
      .sort((a, b) => b.errors - a.errors)
      .map((q, index) => {
        // Scale down slightly: errors * 1.5 + 15
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

    // 2. Simple Spiral Packing
    const placed = [] as typeof items;

    items.forEach((item, i) => {
      // First item in exact center
      if (i === 0) {
        placed.push(item);
        return;
      }

      // Spiral probe for others
      let angle = 0;
      let distance = item.radius + placed[0].radius; // Start search just outside the center bubble
      const angleStep = 0.5; // radian step - coarser is faster

      let safe = false;
      let failsafe = 0;

      while (!safe && failsafe < 5000) {
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        // Check collision
        let collision = false;
        for (const p of placed) {
          const dist = Math.sqrt(Math.pow(x - p.x, 2) + Math.pow(y - p.y, 2));
          // Allow a tiny bit of overlap (-2) for "touching" feel or exact 0
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
          angle += angleStep;
          // Slowly increase distance to spiral out
          distance += 0.5;
        }

        failsafe++;
      }
    });

    return placed;
  }, []);

  return (
    <div className="h-screen bg-[#e5e7eb] flex font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-12 bg-white border-r border-gray-200 flex flex-col items-center py-2 gap-2 sticky top-0 h-screen shadow-sm hidden md:flex">
        <div className="w-6 h-6 rounded-full border border-rose-400 flex items-center justify-center text-rose-500 font-bold text-[9px] mb-2">
          NF
        </div>
        <IconButton icon={Home} />
        <IconButton icon={BookOpen} />
        <IconButton icon={MessageSquare} />
        <IconButton icon={LayoutGrid} active />
        <IconButton icon={CheckSquare} />
        <IconButton icon={Bot} />
        <IconButton icon={GraduationCap} />
        <IconButton icon={Sparkles} />
        <IconButton icon={Binary} />
        <IconButton icon={Video} />
        <IconButton icon={Headphones} />
        <IconButton icon={BookOpen} />
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white px-5 py-1.5 border-b border-gray-200 shadow-sm flex items-center justify-between sticky top-0 z-10 w-full shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-black text-gray-800 font-display">Analytics</h1>
              {isStudentView && (
                <>
                  <div className="h-4 w-[1px] bg-gray-200"></div>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="flex items-center gap-1.5 px-2 py-1 bg-purple-50 text-purple-700 rounded-lg border border-purple-100 hover:bg-purple-100 transition-all text-[10px] font-bold group shadow-sm"
                  >
                    <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
                    Back to Overview
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-[150px]">
                <input
                  type="text"
                  placeholder="Search students..."
                  className="w-full pl-2 pr-6 py-0.5 bg-gray-50 border border-gray-100 rounded-md text-[10px] focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all font-medium"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />
                {isSearchFocused && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-md shadow-lg z-[100] py-1">
                    {searchSuggestions.map(student => (
                      <button
                        key={student.id}
                        className="w-full text-left px-2 py-1.5 hover:bg-purple-50 text-[10px] font-medium flex items-center gap-2 transition-colors"
                        onClick={() => {
                          setSelectedStudent(student.full_name);
                          setSearchValue('');
                        }}
                      >
                        <UserCircle size={10} className="text-purple-400" />
                        {student.full_name}
                      </button>
                    ))}
                  </div>
                )}
                <X
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer hover:text-gray-500"
                  size={10}
                  onClick={() => {
                    setSearchValue('');
                    setSelectedStudent(null);
                  }}
                />
              </div>

              <div className="relative">
                <FilterButton
                  icon={Calendar}
                  text={timeFilter}
                  hasArrow
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  active={isFilterDropdownOpen}
                />
                {isFilterDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1.5 w-[320px] bg-white border border-gray-100 rounded-xl shadow-2xl z-[100] flex overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {/* Left Tabs */}
                    <div className="w-24 bg-gray-50 border-r border-gray-100 p-1.5 space-y-1">
                      <button
                        onClick={() => { setFilterMode('presets'); setRangeStart(null); setRangeEnd(null); }}
                        className={`w-full text-left px-2 py-1.5 rounded-md text-[9px] font-black uppercase tracking-tighter transition-all ${filterMode === 'presets' ? 'bg-white text-purple-700 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        Presets
                      </button>
                      <button
                        onClick={() => { setFilterMode('months'); setRangeStart(null); setRangeEnd(null); }}
                        className={`w-full text-left px-2 py-1.5 rounded-md text-[9px] font-black uppercase tracking-tighter transition-all ${filterMode === 'months' ? 'bg-white text-purple-700 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        Months
                      </button>
                      <button
                        onClick={() => { setFilterMode('weeks'); setRangeStart(null); setRangeEnd(null); }}
                        className={`w-full text-left px-2 py-1.5 rounded-md text-[9px] font-black uppercase tracking-tighter transition-all ${filterMode === 'weeks' ? 'bg-white text-purple-700 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        Weeks
                      </button>
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 p-3 bg-white max-h-[300px] overflow-y-auto custom-scrollbar">
                      {filterMode === 'presets' && (
                        <div className="space-y-0.5">
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Quick Select</p>
                          {FILTER_OPTIONS.map(option => (
                            <button
                              key={option}
                              onClick={() => {
                                setTimeFilter(option);
                                setIsFilterDropdownOpen(false);
                              }}
                              className={`w-full text-left px-2 py-2 text-[10px] font-bold rounded-lg transition-all flex items-center justify-between ${timeFilter === option
                                ? 'bg-purple-50 text-purple-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                                }`}
                            >
                              {option}
                              {timeFilter === option && <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-sm shadow-purple-200"></div>}
                            </button>
                          ))}
                        </div>
                      )}

                      {filterMode === 'months' && (
                        <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1 flex items-center justify-between">
                            Academic Year {selectedYear}
                            <div className="flex gap-1">
                              <button
                                onClick={() => setSelectedYear(prev => prev - 1)}
                                className="p-1 hover:bg-gray-100 rounded text-gray-400 transition-colors"
                              >
                                <ChevronLeft size={10} />
                              </button>
                              <button
                                onClick={() => setSelectedYear(prev => prev + 1)}
                                className="p-1 hover:bg-gray-100 rounded text-gray-400 transition-colors"
                              >
                                <ChevronRight size={10} />
                              </button>
                            </div>
                          </p>
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
                                <button
                                  key={month}
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

                                      // Sort by date
                                      const sTotal = s.year * 12 + s.month;
                                      const eTotal = e.year * 12 + e.month;
                                      const [start, end] = sTotal <= eTotal ? [s, e] : [e, s];

                                      const startLabel = `${MONTHS[start.month].substring(0, 3)} ${start.year}`;
                                      const endLabel = `${MONTHS[end.month].substring(0, 3)} ${end.year}`;
                                      setTimeFilter(`${startLabel} - ${endLabel}`);
                                    }
                                  }}
                                  className={`relative px-1 py-2 text-[9px] font-bold rounded-md transition-all border ${isSelected
                                    ? 'bg-purple-600 border-purple-600 text-white z-10 shadow-md'
                                    : inRange
                                      ? 'bg-purple-100 border-purple-100 text-purple-700'
                                      : 'border-gray-50 hover:border-purple-200 hover:bg-purple-50 text-gray-600'
                                    }`}
                                >
                                  {month.substring(0, 3)}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {filterMode === 'weeks' && (
                        <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1 flex items-center justify-between">
                            Select Range of Weeks
                            <div className="flex gap-1">
                              <button
                                onClick={() => setWeekOffset(prev => Math.max(0, prev - 12))}
                                className="p-1 hover:bg-gray-100 rounded text-gray-400 transition-colors"
                              >
                                <ChevronLeft size={10} />
                              </button>
                              <button
                                onClick={() => setWeekOffset(prev => prev + 12)}
                                className="p-1 hover:bg-gray-100 rounded text-gray-400 transition-colors"
                              >
                                <ChevronRight size={10} />
                              </button>
                            </div>
                          </p>
                          <div className="grid grid-cols-4 gap-1 px-1">
                            {CURRENT_WEEKS.map((weekNum) => {
                              // Use year -1 to distinguish weeks from months in the same range state
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
                                <button
                                  key={weekNum}
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
                                  className={`relative px-1 py-2 text-[9px] font-bold rounded-md transition-all border ${isSelected
                                    ? 'bg-purple-600 border-purple-600 text-white z-10 shadow-md scale-105'
                                    : inRange
                                      ? 'bg-purple-100 border-purple-100 text-purple-700'
                                      : 'border-gray-50 hover:border-purple-200 hover:bg-purple-50 text-gray-600'
                                    }`}
                                >
                                  W{weekNum}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="px-4 py-3 space-y-3 max-w-[1700px] mx-auto w-full flex-1 flex flex-col overflow-hidden">

          {/* Top Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0">
            {activeStats.map((stat, idx) => (
              <StatCard
                key={idx}
                {...stat}
                onClick={(stat.title === "Total Students" || stat.title === "Student Name") ? () => setIsStudentModalOpen(true) : undefined}
              />
            ))}
          </div>

          {/* Main Grid: Charts */}
          <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
            {isStudentView ? (
              <>
                {/* 1. Time spent per assignment (TALL LEFT) */}
                <div className="col-span-3 bg-white p-3 rounded-xl border border-gray-200 shadow-md flex flex-col min-h-0">
                  <h3 className="font-bold text-gray-800 mb-2 text-[10px] uppercase tracking-wider">Time spent per assignment</h3>
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={studentCharts?.time || erik_time_per_assignment} layout="vertical" margin={{ left: 10, right: 0, top: 10, bottom: 10 }} barCategoryGap="65%">
                        <XAxis type="number" tick={{ fontSize: 9, fill: '#000000' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} label={{ value: 'Minutes', position: 'insideBottom', offset: 0, fontSize: 8, fill: '#000', fontWeight: 'bold' }} />
                        <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 10, fill: '#000000' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                        <Tooltip content={<DashboardTooltip />} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                        <Bar name={`${displayedStudentName} Time`} dataKey="erik" fill="#7c3aed" radius={[10, 10, 10, 10]} barSize={6} />
                        <Bar name="Class Avg." dataKey="class" fill="#94a3b8" radius={[10, 10, 10, 10]} barSize={6} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* MIDDLE & RIGHT GROUP */}
                <div className="col-span-9 grid grid-cols-2 grid-rows-2 gap-4 min-h-0">

                  {/* 2. Total Week Activity */}
                  <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-md flex flex-col min-h-0">
                    <h3 className="font-bold text-gray-800 mb-2 text-[10px] uppercase tracking-wider">Total Week activity - {displayedStudentName}</h3>
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={studentCharts?.week || erik_week_activity} margin={{ top: 5, right: 10, bottom: 15, left: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="week" tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} label={{ value: 'Week', position: 'insideBottom', offset: -10, fontSize: 8, fill: '#9ca3af', fontWeight: 'bold' }} />
                          <YAxis tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} label={{ value: 'Min', angle: -90, position: 'insideLeft', offset: 12, fontSize: 8, fill: '#9ca3af', fontWeight: 'bold' }} />
                          <Tooltip content={<DashboardTooltip />} />
                          <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '9px', paddingBottom: '10px' }} />
                          <Line name={displayedStudentName || 'Student'} type="monotone" dataKey="erik" stroke="#7c3aed" strokeWidth={3} dot={{ r: 4, fill: '#7c3aed', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                          <Line name="Avg. Minutes" type="monotone" dataKey="avg" stroke="#475569" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: '#fff', stroke: '#475569', strokeWidth: 2 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 3. Performance Trend */}
                  <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-md flex flex-col min-h-0">
                    <h3 className="font-bold text-gray-800 mb-2 text-[10px] uppercase tracking-wider">Performance Trend</h3>
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={studentCharts?.performance || erik_performance_trend} margin={{ top: 5, right: 10, bottom: 15, left: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="week" tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} label={{ value: 'Week', position: 'insideBottom', offset: -10, fontSize: 8, fill: '#9ca3af', fontWeight: 'bold' }} />
                          <YAxis tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} label={{ value: 'Score %', angle: -90, position: 'insideLeft', offset: 12, fontSize: 8, fill: '#9ca3af', fontWeight: 'bold' }} />
                          <Tooltip content={<DashboardTooltip />} />
                          <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '9px', paddingBottom: '10px' }} />
                          <Line name={displayedStudentName || 'Student'} type="monotone" dataKey="erik" stroke="#7c3aed" strokeWidth={3} dot={{ r: 4, fill: '#7c3aed', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                          <Line name="Class" type="monotone" dataKey="class" stroke="#475569" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: '#fff', stroke: '#475569', strokeWidth: 2 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 4. Erik Skills Level (RADAR) */}
                  <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-md flex flex-col min-h-0">
                    <h3 className="font-bold text-gray-800 mb-2 text-[10px] uppercase tracking-wider">{displayedStudentName} skills level</h3>
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="100%" data={studentCharts?.skills || erik_skills}>
                          <PolarGrid stroke="#f1f5f9" />
                          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#000000' }} />
                          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                          <Radar name={displayedStudentName || 'Student'} dataKey="erik" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.4} />
                          <Radar name="Class Avg." dataKey="avg" stroke="#475569" fill="#475569" fillOpacity={0.25} />
                          <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                          <Tooltip content={<DashboardTooltip />} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 5. Error Words (TREEMAP kept) */}
                  <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-md flex flex-col min-h-0">
                    <h3 className="font-bold text-gray-800 mb-2 text-[10px] uppercase tracking-wider">Top Error-Prone Words</h3>
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <Treemap
                          data={dataWithColors}
                          dataKey="occurrence_count"
                          content={(props: any) => {
                            const { x, y, width, height, word, fill } = props;
                            return (
                              <g>
                                <rect x={x} y={y} width={width} height={height} style={{ fill, stroke: '#fff', strokeWidth: 2 }} />
                                {width > 30 && height > 20 && (
                                  <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="middle" fill="#000000" fontSize={12} fontWeight="bold">
                                    {word}
                                  </text>
                                )}
                              </g>
                            );
                          }}
                        >
                          <Tooltip content={<DashboardTooltip />} />
                        </Treemap>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* ORIGINAL LAYOUT */}
                {/* Writing Overview */}
                <div className="col-span-12 lg:col-span-3 bg-white p-2.5 rounded-xl border border-gray-200 shadow-md flex flex-col min-h-0">
                  <h3 className="font-bold text-gray-800 mb-2 text-[10px] uppercase tracking-wider">Writing Overview</h3>
                  <div className="flex-1 min-h-0 text-[8px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={writing_overview_rows} layout="vertical" margin={{ left: -10, right: 20, top: 5, bottom: 25 }}>
                        <XAxis
                          type="number"
                          tick={{ fontSize: 9, fill: '#9ca3af' }}
                          axisLine={false}
                          tickLine={false}
                          label={{ value: 'Word Count', position: 'insideBottom', offset: -15, fontSize: 8, fill: '#9ca3af', fontWeight: 'bold' }}
                        />
                        <YAxis
                          dataKey="full_name"
                          type="category"
                          width={70}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 500 }}
                        />
                        <Tooltip content={<DashboardTooltip />} cursor={{ fill: '#f3f4f6', opacity: 0.4 }} />
                        <Bar dataKey="word_count" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={5} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Right Group */}
                <div className="col-span-12 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 min-h-0 h-full">

                  {/* Engagement */}
                  <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col min-h-0">
                    <h3 className="font-bold text-gray-800 mb-2 text-[10px] uppercase tracking-wider">Engagement</h3>
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 10, right: 25, bottom: 25, left: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis
                            type="number"
                            dataKey="submission_count"
                            domain={[0, 30]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 9, fill: '#9ca3af' }}
                            label={{ value: 'Submissions', position: 'insideBottom', offset: -20, fontSize: 8, fill: '#9ca3af', fontWeight: 'bold' }}
                          />
                          <YAxis
                            type="number"
                            dataKey="time_spent_min"
                            domain={[0, 200]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 9, fill: '#9ca3af' }}
                            label={{ value: 'Time (min)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 8, fill: '#9ca3af', fontWeight: 'bold' }}
                          />
                          <Tooltip content={<DashboardTooltip />} />
                          <Scatter data={engagement_metrics} fill="#8b5cf6" />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Improvement */}
                  <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col min-h-0">
                    <h3 className="font-bold text-gray-800 mb-2 text-[10px] uppercase tracking-wider">Improvement</h3>
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 10, right: 25, bottom: 25, left: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis
                            type="number"
                            dataKey="resubmission_avg"
                            domain={[0, 14]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 9, fill: '#9ca3af' }}
                            label={{ value: 'Resubmissions', position: 'insideBottom', offset: -20, fontSize: 8, fill: '#9ca3af', fontWeight: 'bold' }}
                          />
                          <YAxis
                            type="number"
                            dataKey="score_avg"
                            domain={[0, 100]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 9, fill: '#9ca3af' }}
                            label={{ value: 'Score (%)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 8, fill: '#9ca3af', fontWeight: 'bold' }}
                          />
                          <Tooltip content={<DashboardTooltip />} />
                          <Scatter data={improvement_stats} fill="#8b5cf6" />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Error Questions */}
                  <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col min-h-0 relative">
                    <h3 className="font-bold text-gray-800 mb-2 text-[10px] uppercase tracking-wider">Top Error-Prone Questions</h3>
                    <div className="flex-1 relative flex items-start justify-center pt-13">
                      {/* Center anchor point */}
                      <div className="relative w-0 h-0">
                        {layoutBubbles.map((q) => {
                          return (
                            <div
                              key={q.id}
                              className={`absolute rounded-full flex items-center justify-center font-bold p-2 text-center shadow-sm transition-transform hover:scale-105 hover:z-[100] cursor-default group`}
                              style={{
                                backgroundColor: q.color,
                                // Position relative to center (0,0)
                                left: q.x,
                                top: q.y,
                                width: `${q.diameter}px`,
                                height: `${q.diameter}px`,
                                color: '#000000',
                                // Center the bubble on its coord
                                transform: 'translate(-50%, -50%)',
                                fontSize: q.diameter > 100 ? '10px' : q.diameter > 60 ? '8px' : '7px'
                              }}
                            >
                              {/* Truncate text */}
                              {q.question.length > 20 && q.diameter < 100 ? q.question.substring(0, 15) + '...' : q.question}

                              {/* Floating Tooltip */}
                              <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white p-3 border border-gray-100 shadow-xl rounded-xl text-[12px] z-[9999] pointer-events-none w-max max-w-[200px] ring-1 ring-black/5">
                                <p className="font-bold text-gray-800 mb-1.5 text-[13px] border-b border-gray-50 pb-1 leading-tight">{q.question}</p>
                                <div className="flex justify-between items-center gap-4">
                                  <span className="text-gray-500 capitalize">Errors:</span>
                                  <span className="text-purple-600 font-bold font-mono">{q.errors}</span>
                                </div>
                                {/* Arrow */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Error Words */}
                  <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col min-h-0">
                    <h3 className="font-bold text-gray-800 mb-2 text-[10px] uppercase tracking-wider">Top Error-Prone Words</h3>
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <Treemap
                          data={dataWithColors}
                          dataKey="occurrence_count"
                          content={(props: any) => {
                            const { x, y, width, height, word, fill } = props;
                            return (
                              <g>
                                <rect x={x} y={y} width={width} height={height} style={{ fill, stroke: '#ffffffff', strokeWidth: 2 }} />
                                {width > 30 && height > 20 && (
                                  <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize={12} fontWeight="bold">
                                    {word}
                                  </text>
                                )}
                              </g>
                            );
                          }}
                        >
                          <Tooltip content={<DashboardTooltip />} />
                        </Treemap>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main >
      {/* Student Selection Modal */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col max-h-[80vh] overflow-hidden border border-gray-100">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Select Student</h2>
              <button
                onClick={() => setIsStudentModalOpen(false)}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-2">Active Students</h3>
                <div className="grid grid-cols-2 gap-2">
                  {students.filter(s => s.active).map(student => (
                    <button
                      key={student.id}
                      onClick={() => {
                        setSelectedStudent(student.full_name);
                        setIsStudentModalOpen(false);
                      }}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${selectedStudent === student.full_name
                        ? 'bg-purple-50 border-purple-200 text-purple-700 ring-1 ring-purple-100'
                        : 'bg-white border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 text-gray-700'
                        }`}
                    >
                      <UserCircle size={14} className={selectedStudent === student.full_name ? 'text-purple-500' : 'text-gray-300'} />
                      <span className="text-xs font-semibold">{student.full_name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-2">Non-Active Students</h3>
                <div className="grid grid-cols-2 gap-2">
                  {students.filter(s => !s.active).map(student => (
                    <button
                      key={student.id}
                      onClick={() => {
                        setSelectedStudent(student.full_name);
                        setIsStudentModalOpen(false);
                      }}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all opacity-70 grayscale-[0.5] hover:opacity-100 hover:grayscale-0 ${selectedStudent === student.full_name
                        ? 'bg-purple-50 border-purple-200 text-purple-700 ring-1 ring-purple-100'
                        : 'bg-white border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 text-gray-700'
                        }`}
                    >
                      <UserCircle size={14} className="text-gray-300" />
                      <span className="text-xs font-semibold">{student.full_name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <button
                onClick={() => {
                  setSelectedStudent(null);
                  setIsStudentModalOpen(false);
                }}
                className="w-full py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors shadow-sm"
              >
                Back to Overview
              </button>
            </div>
          </div>
        </div>
      )}
    </div >
  );
};

export default App;
