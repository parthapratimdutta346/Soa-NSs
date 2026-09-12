import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  Calendar, 
  Building2, 
  Download, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  FileSpreadsheet, 
  Eye, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { SOA_COLLEGES, COLLEGE_DETAILS, exportRecordsToCSV, updateStudentStatus } from '../services/nssService';
import confetti from 'canvas-confetti';

export default function AdminDashboard({ students, onRefreshStudents, onReplayGlobe }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [inspectedStudent, setInspectedStudent] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const totalVolunteers = students.length;
  const totalHours = students.reduce((sum, s) => sum + (s.serviceHours || 0), 0);
  const totalEventsAttended = students.reduce((sum, s) => sum + (s.eventsAttended || 0), 0);
  
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCollege = selectedCollege === 'ALL' || student.college === selectedCollege;
    const matchesStatus = selectedStatus === 'ALL' || student.status === selectedStatus;

    return matchesSearch && matchesCollege && matchesStatus;
  });

  const handleDownloadCSV = () => {
    exportRecordsToCSV(filteredStudents);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleToggleStatus = (student) => {
    const newStatus = student.status === 'Verified' ? 'Pending Review' : 'Verified';
    updateStudentStatus(student.id, newStatus);
    onRefreshStudents();
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Admin Top Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow">
                <ShieldCheck className="w-3.5 h-3.5" />
                Administrative Command Center
              </span>
              <span className="text-xs text-blue-200">SOA NSS Central Directorate</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              University Volunteer Master Registry
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-2xl">
              Consolidated operational records, service logs, and attendance tallies across all 9 affiliated colleges of Siksha 'O' Anusandhan.
            </p>
          </div>

          {/* ACTION BUTTONS (Replay Globe & Download Records) */}
          <div className="flex flex-col items-end gap-2 w-full md:w-auto">
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              {onReplayGlobe && (
                <button
                  onClick={onReplayGlobe}
                  className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl font-bold text-xs sm:text-sm text-white bg-white/15 hover:bg-white/25 border border-white/25 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                  title="Replay 3D Globe Animation"
                >
                  <RotateCcw className="w-4 h-4 text-amber-300" />
                  <span className="hidden sm:inline">Replay Globe</span>
                </button>
              )}
              <button
                onClick={handleDownloadCSV}
                className="w-full sm:w-auto group relative overflow-hidden px-6 py-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 shadow-xl border border-white/25 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs uppercase tracking-wider text-emerald-200 font-bold">
                    Official Export
                  </div>
                  <div className="text-base font-black flex items-center gap-1.5">
                    <span>Download Records</span>
                    <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </button>
            </div>
            <span className="text-[11px] text-blue-200 font-medium">
              Exports CSV compatible with Microsoft Excel & Google Sheets
            </span>
          </div>
        </div>
      </div>

      {/* Download Success Notice */}
      {downloadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/25 border border-emerald-400/50 text-white text-xs flex items-center justify-between animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-3 font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            <span>Volunteer records CSV downloaded successfully! Contains {filteredStudents.length} entries.</span>
          </div>
          <span className="text-[11px] text-emerald-200 font-mono">Status: 200 OK</span>
        </div>
      )}

      {/* Overview Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        <div className="rounded-3xl p-5 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-blue-200">Total Registered Cadre</span>
            <div className="p-2 rounded-xl bg-white/15 text-white">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{totalVolunteers}</div>
          <div className="text-[11px] text-blue-200/80 mt-1">Across 9 Constituent Colleges</div>
        </div>

        <div className="rounded-3xl p-5 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-blue-200">Cumulative Service Hours</span>
            <div className="p-2 rounded-xl bg-white/15 text-cyan-300">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{totalHours} <span className="text-sm font-semibold text-blue-200">Hrs</span></div>
          <div className="text-[11px] text-blue-200/80 mt-1">Logged Community Welfare</div>
        </div>

        <div className="rounded-3xl p-5 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-blue-200">Total Participations</span>
            <div className="p-2 rounded-xl bg-white/15 text-rose-300">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{totalEventsAttended}</div>
          <div className="text-[11px] text-blue-200/80 mt-1">Drives, Camps & Initiatives</div>
        </div>

        <div className="rounded-3xl p-5 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-blue-200">Active Units</span>
            <div className="p-2 rounded-xl bg-white/15 text-amber-300">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">9 / 9</div>
          <div className="text-[11px] text-blue-200/80 mt-1">100% Institution Coverage</div>
        </div>

      </div>

      {/* Comprehensive Data Table Card */}
      <div className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden">
        
        {/* Table Controls */}
        <div className="p-5 sm:p-6 border-b border-white/15 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-200">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Student Name, ID, or Email..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/15 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-blue-200/60 focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative min-w-[200px]">
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full pl-3 pr-8 py-2.5 bg-[#12274e] border border-white/20 rounded-xl text-xs text-amber-300 font-bold focus:outline-none focus:border-white appearance-none cursor-pointer"
              >
                <option value="ALL">All 9 Colleges</option>
                {SOA_COLLEGES.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-blue-200 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative min-w-[130px]">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full pl-3 pr-8 py-2.5 bg-[#12274e] border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-white appearance-none cursor-pointer"
              >
                <option value="ALL">All Status</option>
                <option value="Verified">Verified</option>
                <option value="Pending Review">Pending Review</option>
              </select>
              <ChevronDown className="w-4 h-4 text-blue-200 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <span className="text-xs text-blue-200 pl-1 font-medium">
              Showing <span className="text-white font-bold">{filteredStudents.length}</span> of {students.length}
            </span>
          </div>

        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-blue-100 divide-y divide-white/15">
            <thead className="bg-black/20 text-[11px] uppercase tracking-wider text-blue-200 font-bold">
              <tr>
                <th className="py-3.5 px-5">Reg ID / Student</th>
                <th className="py-3.5 px-5">Selected College</th>
                <th className="py-3.5 px-5 text-center">Events Attended</th>
                <th className="py-3.5 px-5 text-center">Service Hours</th>
                <th className="py-3.5 px-5">Latest Contribution Summary</th>
                <th className="py-3.5 px-5 text-center">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-transparent">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((s) => {
                  const latestContribution = (s.contributions && s.contributions[0]) || null;
                  return (
                    <tr key={s.id} className="hover:bg-white/[0.06] transition-colors">
                      
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/20 p-0.5 shrink-0">
                            <div className="w-full h-full rounded-[6px] bg-[#12274e] flex items-center justify-center font-bold text-[11px] text-white">
                              {s.name ? s.name[0] : 'S'}
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-white text-xs sm:text-sm">
                              {s.name}
                            </div>
                            <div className="text-[11px] font-mono text-blue-200 flex items-center gap-1.5">
                              <span>{s.id}</span>
                              <span>•</span>
                              <span className="text-rose-300 font-medium">{s.bloodGroup}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-5">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white/15 text-white border border-white/20 whitespace-nowrap">
                          {s.college}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-center">
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-xl text-sm font-black bg-white text-slate-900 shadow">
                          {s.eventsAttended || 0}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-center">
                        <span className="font-bold text-white text-xs">
                          {s.serviceHours || 0} <span className="text-blue-200 font-normal">hrs</span>
                        </span>
                      </td>

                      <td className="py-4 px-5 max-w-xs">
                        {latestContribution ? (
                          <div>
                            <div className="font-bold text-white truncate">
                              {latestContribution.title}
                            </div>
                            <div className="text-[11px] text-blue-200/90 truncate">
                              {latestContribution.description}
                            </div>
                          </div>
                        ) : (
                          <span className="text-blue-300/60 italic text-[11px]">No log recorded</span>
                        )}
                      </td>

                      <td className="py-4 px-5 text-center">
                        <button
                          onClick={() => handleToggleStatus(s)}
                          title="Click to toggle status"
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors inline-flex items-center gap-1 ${
                            s.status === 'Verified'
                              ? 'bg-emerald-400 text-slate-950 border-emerald-300 font-black'
                              : 'bg-amber-400 text-slate-950 border-amber-300 font-black'
                          }`}
                        >
                          {s.status === 'Verified' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          <span>{s.status || 'Verified'}</span>
                        </button>
                      </td>

                      <td className="py-4 px-5 text-right">
                        <button
                          onClick={() => setInspectedStudent(s)}
                          className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-semibold transition-all inline-flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-300" />
                          <span>View Dossier</span>
                        </button>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-blue-200 text-xs">
                    No student records match the specified filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* MODAL: STUDENT DOSSIER INSPECTOR */}
      {inspectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-[#091b3b]/80">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-7 bg-[#102752] border border-white/25 shadow-2xl text-slate-100">
            <button
              onClick={() => setInspectedStudent(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 text-blue-200 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 p-1 shadow-lg">
                <div className="w-full h-full rounded-xl bg-[#12274e] flex items-center justify-center text-xl font-bold text-white">
                  {inspectedStudent.name ? inspectedStudent.name[0] : 'S'}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{inspectedStudent.name}</h3>
                <p className="text-xs text-amber-300 font-mono">Reg ID: {inspectedStudent.id} • {inspectedStudent.college}</p>
                <p className="text-xs text-blue-200">{inspectedStudent.email} • {inspectedStudent.phone}</p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-center">
                <span className="text-[11px] text-blue-200">Events Attended</span>
                <span className="block text-2xl font-black text-white">{inspectedStudent.eventsAttended || 0}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-center">
                <span className="text-[11px] text-blue-200">Service Hours</span>
                <span className="block text-2xl font-black text-cyan-300">{inspectedStudent.serviceHours || 0}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-center">
                <span className="text-[11px] text-blue-200">Blood Group</span>
                <span className="block text-2xl font-black text-rose-300">{inspectedStudent.bloodGroup}</span>
              </div>
            </div>

            {/* Contributions Log */}
            <h4 className="text-sm font-bold text-white mb-2">Verified Community Contributions</h4>
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {inspectedStudent.contributions && inspectedStudent.contributions.map((c, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <div className="flex justify-between font-bold text-white">
                    <span>{c.title}</span>
                    <span className="text-amber-300">+{c.hours} hrs</span>
                  </div>
                  <p className="text-blue-100 mt-1">{c.description}</p>
                  <span className="text-[10px] text-blue-300/80 mt-1 block">Date: {c.date} • {c.type}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/15">
              <button
                onClick={() => setInspectedStudent(null)}
                className="px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold text-white"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
