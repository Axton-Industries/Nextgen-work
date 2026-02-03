/**
 * Main Application Component
 * 
 * This is the root component of the NextgenDashboard. It orchestrates:
 * 1. State management via custom hooks (Searching, Filtering, Student Selection)
 * 2. Data processing for charts (via useChartData)
 * 3. Conditional rendering between the Overview and Individual Student views
 */

// UI Component Imports
import { Sidebar } from './components/layout/Sidebar';
import { DashboardHeader } from './components/layout/DashboardHeader';
import { StudentCharts } from './components/charts/StudentCharts';
import { OverviewCharts } from './components/charts/OverviewCharts';
import { StudentModal } from './components/modals/StudentModal';
import { StatCard } from './components/cards/StatCard';

// State Management & Data Processing Hooks
import { useStudentSearch, useTimeFilter, useStudentSelection } from './hooks/useDashboard';
import { useChartData } from './hooks/useChartData';

// Static Data & Configuration
import { FILTER_OPTIONS, MONTHS } from './constants';
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
  /** 
   * STATE INITIALIZATION 
   */

  // Handles the global student search functionality
  const searchState = useStudentSearch(students);

  // Manages time-based filtering (Presets, Custom Ranges etc.)
  const timeFilterState = useTimeFilter();

  // Tracks which student is currently being viewed (null = overview)
  const studentState = useStudentSelection();

  /** 
   * DATA PROCESSING 
   * Transforms raw mock data into chart-ready formats based on active filters
   */
  const chartData = useChartData({
    selectedStudent: studentState.selectedStudent,
    timeFilter: timeFilterState.timeFilter,
    weekOffset: timeFilterState.weekOffset,
    summaryStats: summary_stats,
    errorAnalysisData: error_analysis_treemap,
    topErrorQuestions: top_error_questions,
    baseStudentData: {
      time: erik_time_per_assignment,
      week: erik_week_activity,
      performance: erik_performance_trend,
      skills: erik_skills
    }
  });

  return (
    /** 
     * MAIN LAYOUT CONTAINER
     * - h-screen: Full viewport height
     * - overflow-hidden: Prevents window scrolling as we use internal scroll areas
     */
    <div className="h-screen bg-muted/30 flex font-sans text-foreground overflow-hidden">

      {/* Persistant Navigation Sidebar */}
      <Sidebar />

      <main className="flex-1 flex flex-col">
        {/* Top Control Bar: Search, Filters, and Navigation */}
        <DashboardHeader
          isStudentView={studentState.isStudentView}
          onBackToOverview={() => studentState.setSelectedStudent(null)}
          searchValue={searchState.searchValue}
          setSearchValue={searchState.setSearchValue}
          isSearchFocused={searchState.isSearchFocused}
          setIsSearchFocused={searchState.setIsSearchFocused}
          searchSuggestions={searchState.searchSuggestions}
          setSelectedStudent={studentState.setSelectedStudent}
          timeFilter={timeFilterState.timeFilter}
          setTimeFilter={timeFilterState.setTimeFilter}
          isFilterDropdownOpen={timeFilterState.isFilterDropdownOpen}
          setIsFilterDropdownOpen={timeFilterState.setIsFilterDropdownOpen}
          filterMode={timeFilterState.filterMode}
          setFilterMode={timeFilterState.setFilterMode}
          rangeStart={timeFilterState.rangeStart}
          setRangeStart={timeFilterState.setRangeStart}
          rangeEnd={timeFilterState.rangeEnd}
          setRangeEnd={timeFilterState.setRangeEnd}
          selectedYear={timeFilterState.selectedYear}
          setSelectedYear={timeFilterState.setSelectedYear}
          setWeekOffset={timeFilterState.setWeekOffset}
          FILTER_OPTIONS={FILTER_OPTIONS}
          MONTHS={MONTHS}
          CURRENT_WEEKS={chartData.currentWeeks}
        />

        {/* Primary Content Area */}
        <div className="px-4 py-3 space-y-3 max-w-[1700px] mx-auto w-full flex-1 flex flex-col overflow-hidden">

          {/* Top Row: Key Performance Indicators (KPIs) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0">
            {chartData.activeStats.map((stat, idx) => (
              <StatCard
                key={idx}
                {...stat}
                // If the user clicks the "Total Students" or student name card, open the selector modal
                onClick={
                  (stat.title === "Total Students" || stat.title === "Student Name")
                    ? () => studentState.setIsStudentModalOpen(true)
                    : undefined
                }
              />
            ))}
          </div>

          {/* Bottom Row: Detailed Visualizations */}
          <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
            {/* Conditional Rendering between Views */}
            {studentState.isStudentView ? (
              // Individual Student Deep Dive
              <StudentCharts
                studentCharts={chartData.studentCharts}
                displayedStudentName={studentState.selectedStudent}
                dataWithColors={chartData.dataWithColors}
                erik_time_per_assignment={erik_time_per_assignment}
                erik_week_activity={erik_week_activity}
                erik_performance_trend={erik_performance_trend}
                erik_skills={erik_skills}
              />
            ) : (
              // Class-wide General Overview
              <OverviewCharts
                writing_overview_rows={writing_overview_rows}
                engagement_metrics={engagement_metrics}
                improvement_stats={improvement_stats}
                layoutBubbles={chartData.layoutBubblesData}
                dataWithColors={chartData.dataWithColors}
              />
            )}
          </div>
        </div>
      </main>

      {/* Popups & Overlays */}
      <StudentModal
        isOpen={studentState.isStudentModalOpen}
        onOpenChange={studentState.setIsStudentModalOpen}
        students={students}
        selectedStudent={studentState.selectedStudent}
        onSelectStudent={studentState.setSelectedStudent}
      />
    </div>
  );
};

export default App;
