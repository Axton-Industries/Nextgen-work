import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, Treemap, Cell
} from 'recharts';
import {
  Home, BookOpen, MessageSquare, LayoutGrid, CheckSquare,
  Bot, GraduationCap, Sparkles, Binary, Video, Headphones,
  Search, X, Calendar, PlusCircle, UserCircle
} from 'lucide-react';

// Components
import { IconButton } from './components/IconButton';
import { StatCard } from './components/StatCard';
import { FilterButton } from './components/FilterButton';

// Data (Simulated Postgres Rows)
import {
  writing_overview_rows,
  engagement_metrics,
  improvement_stats,
  error_analysis_treemap
} from '../data/mockData';

const App = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-12 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-3 sticky top-0 h-screen shadow-sm hidden md:flex">
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
        <header className="bg-white px-5 py-2 border-b border-gray-200 shadow-sm flex items-center justify-between sticky top-0 z-10 w-full">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-black text-gray-800 font-display">Analytics</h1>

            <div className="flex items-center gap-2">
              <div className="relative w-[150px]">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-2 pr-6 py-0.5 bg-gray-50 border border-gray-100 rounded-md text-[10px] focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <X className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer" size={12} />
              </div>

              <FilterButton icon={Calendar} text="Academic Year" />
              <FilterButton icon={PlusCircle} text="Type" hasArrow />

              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-purple-200 bg-purple-50 text-purple-700 text-[9px] font-bold">
                <div className="w-3 h-3 rounded border border-purple-400 bg-purple-100 flex items-center justify-center">
                  <div className="w-1 h-1 bg-purple-600 rounded-sm"></div>
                </div>
                <span>COMPRESSED</span>
              </div>

              <FilterButton icon={UserCircle} text="Overview" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 space-y-4 max-w-[1400px] mx-auto w-full">

          {/* Top Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Total Students" value="20" subtext="18 Active" />
            <StatCard title="App Time" value="30min" subtext="+5%" />
            <StatCard title="Avg Score" value="80%" subtext="+10%" />
            <StatCard title="Completion" value="75%" subtext="-8%" />
          </div>

          {/* Main Grid: Charts */}
          <div className="grid grid-cols-12 gap-4">

            {/* Writing Overview */}
            <div className="col-span-12 lg:col-span-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col min-h-[500px]">
              <h3 className="font-bold text-gray-800 mb-4 text-[10px] uppercase tracking-wider">Writing Overview</h3>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={writing_overview_rows} layout="vertical" margin={{ left: -15, right: 10 }}>
                    <XAxis type="number" hide />
                    <YAxis
                      dataKey="full_name"
                      type="category"
                      width={60}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 8 }}
                    />
                    <Tooltip />
                    <Bar dataKey="word_count" fill="#a78bfa" radius={[0, 4, 4, 0]} barSize={8} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-[8px] text-gray-400 mt-2 font-bold uppercase tracking-[0.2em]">Total word count</p>
            </div>

            {/* Right Group */}
            <div className="col-span-12 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Engagement */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col h-[280px]">
                <h3 className="font-bold text-gray-800 mb-2 text-[10px] uppercase tracking-wider">Engagement</h3>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 5, right: 10, bottom: 5, left: -25 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis type="number" dataKey="submission_count" domain={[0, 30]} axisLine={false} tickLine={false} tick={{ fontSize: 8 }} />
                      <YAxis type="number" dataKey="time_spent_min" domain={[0, 200]} axisLine={false} tickLine={false} tick={{ fontSize: 8 }} />
                      <Tooltip />
                      <Scatter data={engagement_metrics} fill="#818cf8" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Improvement */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col h-[280px]">
                <h3 className="font-bold text-gray-800 mb-2 text-[10px] uppercase tracking-wider">Improvement</h3>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 5, right: 10, bottom: 5, left: -25 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis type="number" dataKey="resubmission_avg" domain={[0, 14]} axisLine={false} tickLine={false} tick={{ fontSize: 8 }} />
                      <YAxis type="number" dataKey="score_avg" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 8 }} />
                      <Tooltip />
                      <Scatter data={improvement_stats} fill="#818cf8" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Error Questions */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm h-[280px] flex flex-col">
                <h3 className="font-bold text-gray-800 mb-2 text-[10px] uppercase tracking-wider">Error Questions</h3>
                <div className="flex-1 relative overflow-hidden">
                  <div className="absolute top-[10%] left-[10%] w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-[6px] text-pink-700 font-bold p-1 text-center border-2 border-pink-50">What's the...</div>
                  <div className="absolute top-[20%] right-[15%] w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center text-[7px] text-indigo-700 font-bold p-1 text-center">The nick...</div>
                  <div className="absolute bottom-[10%] left-[10%] w-28 h-28 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full flex items-center justify-center text-[9px] text-black font-black p-4 text-center shadow-md">How old was Lucía?</div>
                  <div className="absolute bottom-[5%] right-[10%] w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-[8px] text-white font-black p-4 text-center shadow-lg border-2 border-indigo-200">1492?</div>
                  <div className="absolute top-[45%] left-[45%] w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-[6px] text-blue-700 font-bold p-1 text-center tracking-tighter">Uncle?</div>
                </div>
              </div>

              {/* Error Words */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm h-[280px] flex flex-col">
                <h3 className="font-bold text-gray-800 mb-2 text-[10px] uppercase tracking-wider">Error Words</h3>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                      data={error_analysis_treemap}
                      dataKey="occurrence_count"
                      aspectRatio={4 / 3}
                      stroke="#fff"
                      fill="#8b5cf6"
                    >
                      <Tooltip />
                      {error_analysis_treemap.map((entry, index) => (
                        <Cell key={index} fill={entry.severity_color} />
                      ))}
                    </Treemap>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
