import React, { useState, useMemo } from 'react';
import {
  Activity,
  Search,
  Filter,
  ArrowUpDown,
  Download,
  AlertTriangle,
  Flame,
  MousePointerClick,
  Undo2,
  Clock,
  AlertOctagon,
  Ban,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FrictionEvents() {
  const { frictionEvents, searchQuery, setSearchQuery, addToast } = useApp();

  const [selectedEventType, setSelectedEventType] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedPage, setSelectedPage] = useState('All');
  const [sortBy, setSortBy] = useState('frequency'); // 'frequency' | 'impact' | 'severity'
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' | 'asc'

  // Extract unique filter options
  const eventTypes = useMemo(
    () => ['All', ...new Set(frictionEvents.map((e) => e.event))],
    [frictionEvents]
  );
  const severities = ['All', 'Critical', 'High', 'Medium', 'Low'];
  const pages = useMemo(
    () => ['All', ...new Set(frictionEvents.map((e) => e.page))],
    [frictionEvents]
  );

  // Filter & Sort
  const filteredEvents = useMemo(() => {
    return frictionEvents
      .filter((e) => {
        const matchesSearch =
          searchQuery === '' ||
          e.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.page.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.element.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedEventType === 'All' || e.event === selectedEventType;
        const matchesSeverity = selectedSeverity === 'All' || e.severity === selectedSeverity;
        const matchesPage = selectedPage === 'All' || e.page === selectedPage;
        return matchesSearch && matchesType && matchesSeverity && matchesPage;
      })
      .sort((a, b) => {
        let diff = 0;
        if (sortBy === 'frequency') {
          diff = b.frequency - a.frequency;
        } else if (sortBy === 'impact') {
          const impactWeight = { High: 3, Medium: 2, Low: 1 };
          diff = (impactWeight[b.impact] || 0) - (impactWeight[a.impact] || 0);
        } else if (sortBy === 'severity') {
          const sevWeight = { Critical: 4, High: 3, Medium: 2, Low: 1 };
          diff = (sevWeight[b.severity] || 0) - (sevWeight[a.severity] || 0);
        }
        return sortOrder === 'asc' ? -diff : diff;
      });
  }, [
    frictionEvents,
    searchQuery,
    selectedEventType,
    selectedSeverity,
    selectedPage,
    sortBy,
    sortOrder,
  ]);

  const handleExportCSV = () => {
    const headers = ['Event,Page,Element,Frequency,Severity,Impact,Trend,AffectedUsers\n'];
    const rows = filteredEvents.map(
      (e) =>
        `"${e.event}","${e.page}","${e.element}",${e.frequency},"${e.severity}","${e.impact}","${e.trend}",${e.affectedUsers}`
    );
    const blob = new Blob([headers + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `fixzy_friction_events_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('CSV Exported', `Exported ${filteredEvents.length} friction events to CSV.`, 'success');
  };

  const toggleSort = (col) => {
    if (sortBy === col) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(col);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Friction Events Log</h1>
            <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
              {filteredEvents.length} of {frictionEvents.length} Events
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Raw behavioral interaction telemetry table with granular frequency and impact weighting.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-bold text-slate-200 hover:bg-slate-750 hover:text-white transition-all active:scale-[0.98]"
        >
          <Download className="h-3.5 w-3.5 text-sky-400" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative w-64">
              <Search className="absolute left-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by event or page..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-sky-500 focus:outline-none"
              />
            </div>

            {/* Event Type Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400 font-medium">Type:</span>
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-200 focus:border-sky-500 focus:outline-none"
              >
                {eventTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Severity Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400 font-medium">Severity:</span>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-200 focus:border-sky-500 focus:outline-none"
              >
                {severities.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Page Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400 font-medium">Page:</span>
              <select
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-200 focus:border-sky-500 focus:outline-none"
              >
                {pages.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(selectedEventType !== 'All' ||
            selectedSeverity !== 'All' ||
            selectedPage !== 'All' ||
            searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedEventType('All');
                setSelectedSeverity('All');
                setSelectedPage('All');
                setSearchQuery('');
              }}
              className="text-xs text-rose-400 hover:text-rose-300 font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Interactive Table */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase font-bold tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Event Type</th>
                <th className="py-3.5 px-4">Page / Location</th>
                <th
                  onClick={() => toggleSort('frequency')}
                  className="py-3.5 px-4 cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>Frequency</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('severity')}
                  className="py-3.5 px-4 cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>Severity</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('impact')}
                  className="py-3.5 px-4 cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>Impact</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Affected Users</th>
                <th className="py-3.5 px-4 text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredEvents.map((row) => (
                <tr key={row.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">
                    <div className="flex items-center gap-2">
                      {row.event.includes('Rage') ? (
                        <Flame className="h-3.5 w-3.5 text-rose-400" />
                      ) : row.event.includes('Error') ? (
                        <AlertOctagon className="h-3.5 w-3.5 text-red-400" />
                      ) : row.event.includes('Backtrack') ? (
                        <Undo2 className="h-3.5 w-3.5 text-purple-400" />
                      ) : row.event.includes('Pause') ? (
                        <Clock className="h-3.5 w-3.5 text-amber-400" />
                      ) : (
                        <MousePointerClick className="h-3.5 w-3.5 text-sky-400" />
                      )}
                      <span>{row.event}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-300">{row.page}</span>
                    <span className="block font-mono text-[10px] text-slate-500 truncate max-w-[180px]">
                      {row.element}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    {row.frequency.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        row.severity === 'Critical'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : row.severity === 'High'
                          ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                          : row.severity === 'Medium'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}
                    >
                      {row.severity}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-semibold ${
                        row.impact === 'High'
                          ? 'text-rose-400'
                          : row.impact === 'Medium'
                          ? 'text-amber-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {row.impact}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    {row.affectedUsers.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`font-semibold text-xs ${
                        row.trend.startsWith('+') ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {row.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
