import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, Treemap
} from 'recharts';
import {
  Home, BookOpen, MessageSquare, LayoutGrid, CheckSquare,
  Bot, GraduationCap, Sparkles, Binary, Video, Headphones,
  Search, X, Calendar, UserCircle
} from 'lucide-react';

// Components
import { IconButton } from './components/IconButton';
import { StatCard } from './components/StatCard';
import { FilterButton } from './components/FilterButton';
import { CustomTooltip as CustomTreemapTooltip } from './components/CustomTooltip';
import { WritingTooltip } from './components/WritingTooltip';
import { GeneralChartTooltip } from './components/GeneralChartTooltip';

// Data (Simulated Postgres Rows)
import {
  writing_overview_rows,
  engagement_metrics,
  improvement_stats,
  error_analysis_treemap,
  top_error_questions,
  summary_stats
} from '../data/mockData';

const App = () => {
  const [searchValue, setSearchValue] = useState('');

  // Professional Purple-themed Palette
  const PURPLE_PALETTE = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe', '#ffb7e4'];

  const dataWithColors = error_analysis_treemap.map((item, index) => ({
    ...item,
    fill: PURPLE_PALETTE[index % PURPLE_PALETTE.length]
  }));

  // Automatic Bubble Layout Calculation
  const layoutBubbles = useMemo(() => {
    // 1. Prepare items with dimensions
    const items = top_error_questions.map((q, index) => {
      // Scale down slightly: errors * 1.5 + 15
      const diameter = q.errors * 1.8 + 20;
      return {
        ...q,
        radius: diameter / 2,
        diameter,
        color: PURPLE_PALETTE[(index + 1) % PURPLE_PALETTE.length],
        x: 0,
        y: 0
      };
    }).sort((a, b) => b.radius - a.radius); // Place largest first

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
    <div className="h-screen bg-[#f3f4f6] flex font-sans text-gray-900 overflow-hidden">
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
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="px-4 py-3 space-y-3 max-w-[1700px] mx-auto w-full flex-1 flex flex-col overflow-hidden">

          {/* Top Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0">
            {summary_stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          {/* Main Grid: Charts */}
          <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">

            {/* Writing Overview */}
            <div className="col-span-12 lg:col-span-3 bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm flex flex-col min-h-0">
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
                    <Tooltip content={<WritingTooltip />} cursor={{ fill: '#f3f4f6', opacity: 0.4 }} />
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
                      <Tooltip content={<GeneralChartTooltip />} />
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
                      <Tooltip content={<GeneralChartTooltip />} />
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
                      const isDark = q.color === '#8b5cf6' || q.color === '#7c3aed';
                      const textColor = isDark ? '#ffffff' : '#1f2937';

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
                            color: textColor,
                            // Center the bubble on its coord
                            transform: 'translate(-50%, -50%)',
                            fontSize: q.diameter > 100 ? '10px' : q.diameter > 60 ? '8px' : '7px'
                          }}
                        >
                          {/* Truncate text */}
                          {q.question.length > 20 && q.diameter < 100 ? q.question.substring(0, 15) + '...' : q.question}

                          {/* Floating Tooltip */}
                          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white p-3 border border-gray-200 shadow-xl rounded-xl text-[12px] z-[9999] pointer-events-none w-max max-w-[200px]">
                            <p className="font-bold text-gray-800 mb-1.5 text-[13px] leading-tight">{q.question}</p>
                            <div className="flex justify-between items-center gap-4">
                              <span className="text-gray-500">Errors:</span>
                              <span className="text-violet-600 font-bold">{q.errors}</span>
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
                      aspectRatio={4 / 3}
                      stroke="#fff"
                      content={(props: any) => {
                        const { x, y, width, height, word, fill } = props;
                        return (
                          <g>
                            <rect
                              x={x}
                              y={y}
                              width={width}
                              height={height}
                              style={{
                                fill,
                                stroke: '#fff',
                                strokeWidth: 2,
                              }}
                            />
                            {width > 30 && height > 20 && (
                              <text
                                x={x + width / 2}
                                y={y + height / 2}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="#000000"
                                stroke="none"
                                fontSize={9}
                                fontWeight="bold"
                              >
                                {word}
                              </text>
                            )}
                          </g>
                        );
                      }}
                    >
                      <Tooltip content={<CustomTreemapTooltip />} />
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
