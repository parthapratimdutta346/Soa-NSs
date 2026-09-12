import React, { useState } from 'react';
import { 
  Building2, 
  Calendar, 
  Clock, 
  Award, 
  Trophy, 
  Droplets, 
  Sprout, 
  Sparkles, 
  ShieldAlert, 
  PlusCircle, 
  CheckCircle2, 
  FileText, 
  ChevronRight, 
  ExternalLink,
  Heart,
  Share2,
  Download,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { COLLEGE_DETAILS, addStudentContribution } from '../services/nssService';
import confetti from 'canvas-confetti';

export default function StudentDashboard({ student, onUpdateStudent, onReplayGlobe }) {
  const collegeInfo = COLLEGE_DETAILS[student.college] || {
    fullName: student.college,
    campus: "Siksha 'O' Anusandhan University Campus, Bhubaneswar",
    lead: "Dr. Program Officer (SOA NSS Cell)",
    unitCode: "SOA-NSS-UNIT",
    totalVolunteers: 350
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newHours, setNewHours] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newType, setNewType] = useState('Community Welfare');
  const [newDesc, setNewDesc] = useState('');
  const [formError, setFormError] = useState('');

  const [selectedBadge, setSelectedBadge] = useState(null);

  const handleAddContribution = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newHours || !newDesc.trim()) {
      setFormError("Please fill out all contribution details.");
      return;
    }

    const res = addStudentContribution(student.id, {
      title: newTitle,
      hours: newHours,
      date: newDate,
      description: newDesc,
      type: newType
    });

    if (res.success) {
      onUpdateStudent(res.student);
      setIsAddModalOpen(false);
      setNewTitle('');
      setNewHours('');
      setNewDesc('');
      setFormError('');

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const getBadgeIcon = (iconName) => {
    switch (iconName) {
      case 'Droplets': return <Droplets className="w-6 h-6 text-rose-300" />;
      case 'Sprout': return <Sprout className="w-6 h-6 text-emerald-300" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-cyan-300" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-amber-300" />;
      default: return <Trophy className="w-6 h-6 text-amber-300" />;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Top Volunteer Hero Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-sky-400/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-brand-nssRed to-amber-500 p-1 shadow-xl">
                <div className="w-full h-full rounded-xl bg-[#11244e] flex items-center justify-center text-2xl font-black text-white">
                  {student.name ? student.name.split(' ').map(n => n[0]).slice(0, 2).join('') : 'ST'}
                </div>
              </div>
              <span className="absolute -bottom-2 -right-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-400 text-slate-950 shadow">
                ACTIVE
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {student.name}
                </h1>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-rose-200 border border-white/25">
                  {student.bloodGroup} Blood Donor
                </span>
              </div>
              <p className="text-xs sm:text-sm text-blue-100 mt-1 flex items-center gap-2 font-medium">
                <span className="text-amber-300 font-bold">NSS ID: {student.id}</span>
                <span>•</span>
                <span className="text-blue-200/80">{student.email}</span>
              </p>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Unit Affiliation: <span className="text-white font-semibold">{student.unitBatch || 'SOA NSS Corps'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {onReplayGlobe && (
              <button
                onClick={onReplayGlobe}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-white/15 hover:bg-white/25 border border-white/25 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                title="Replay 3D Globe Animation"
              >
                <RotateCcw className="w-4 h-4 text-amber-300" />
                <span className="hidden sm:inline">Replay 3D Globe</span>
              </button>
            )}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm text-slate-900 bg-white hover:bg-slate-100 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4 text-brand-nssRed" />
              <span>Log Contribution</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Main Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* SECTION 1: PROMINENT EVENTS ATTENDED - 5 Cols */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          
          {/* Main 3D Styled Numerical Counter Card */}
          <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl glass-card-isometric">
            <div className="absolute top-0 right-0 w-44 h-44 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Service Activity Counter
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/15 text-white border border-white/20">
                Tier: Silver Star
              </span>
            </div>

            <div className="py-2">
              <div className="flex items-baseline gap-3">
                <span className="text-6xl sm:text-7xl font-black text-white drop-shadow-md tracking-tight">
                  {student.eventsAttended || 0}
                </span>
                <span className="text-lg font-bold text-blue-100">
                  Events Attended
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-2">
                Total sanctioned camps, blood donation drives, tree plantations, and rural social service camps.
              </p>
            </div>

            {/* Attendance Progress Meter */}
            <div className="mt-5 pt-5 border-t border-white/15">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-blue-100 font-semibold">National Youth Award Milestone</span>
                <span className="text-amber-300 font-bold">{Math.min(100, Math.round(((student.eventsAttended || 0) / 30) * 100))}% (30 Target)</span>
              </div>
              <div className="w-full h-3 bg-black/25 rounded-full overflow-hidden p-0.5 border border-white/15">
                <div 
                  className="h-full bg-gradient-to-r from-brand-nssRed via-amber-400 to-emerald-400 rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: `${Math.min(100, ((student.eventsAttended || 0) / 30) * 100)}%` }}
                />
              </div>
            </div>

            {/* Service Hours Quick Stat */}
            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
                <span className="block text-[11px] text-blue-200 font-medium">Total Service Hours</span>
                <span className="text-xl font-extrabold text-white mt-0.5 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cyan-300" />
                  {student.serviceHours || 0} Hrs
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
                <span className="block text-[11px] text-blue-200 font-medium">Campus Blood Unit</span>
                <span className="text-xl font-extrabold text-white mt-0.5 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-rose-300" />
                  {student.bloodGroup} Verified
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 2: DEDICATED COLLEGE DETAILS CARD */}
          <div className="rounded-3xl p-6 sm:p-7 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Selected College Institution
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/15 text-white border border-white/20">
                Official Unit
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
              <h3 className="text-lg font-bold text-white leading-snug">
                {student.college}
              </h3>
              <p className="text-xs text-blue-100 font-medium mt-1">
                {collegeInfo.fullName}
              </p>
            </div>

            <div className="mt-4 space-y-2.5 text-xs text-blue-100">
              <div className="flex items-start gap-2.5">
                <span className="font-semibold text-blue-300 w-24 shrink-0">Campus Zone:</span>
                <span className="text-white">{collegeInfo.campus}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="font-semibold text-blue-300 w-24 shrink-0">Program Lead:</span>
                <span className="text-amber-300 font-medium">{collegeInfo.lead}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="font-semibold text-blue-300 w-24 shrink-0">Unit Registry:</span>
                <span className="text-white font-mono">{collegeInfo.unitCode}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="font-semibold text-blue-300 w-24 shrink-0">Active Cadre:</span>
                <span className="text-emerald-300 font-semibold">{collegeInfo.totalVolunteers}+ Enrolled Volunteers</span>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 3 & 4: NSS CONTRIBUTIONS & ACHIEVEMENTS - 7 Cols */}
        <div className="lg:col-span-7 space-y-6">

          {/* SECTION 3: NSS CONTRIBUTIONS (Log & Summary Text Area) */}
          <div className="rounded-3xl p-6 sm:p-7 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-300" />
                  NSS Contributions Log & Summary
                </h3>
                <p className="text-xs text-blue-100">
                  Verified record of volunteer service and social impact initiatives.
                </p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 shadow transition-all flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5 text-brand-nssRed" />
                <span>Add Record</span>
              </button>
            </div>

            <div className="space-y-3.5 max-h-[360px] overflow-y-auto pr-1">
              {student.contributions && student.contributions.length > 0 ? (
                student.contributions.map((c, i) => (
                  <div 
                    key={c.id || i}
                    className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                          {c.title}
                        </h4>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-white/15 text-white border border-white/20 shrink-0">
                        +{c.hours} Hours
                      </span>
                    </div>

                    <p className="text-xs text-blue-100 leading-relaxed pl-4">
                      {c.description}
                    </p>

                    <div className="flex items-center gap-3 mt-2 pl-4 text-[11px] text-blue-200/80">
                      <span>Date: {c.date}</span>
                      <span>•</span>
                      <span className="text-cyan-300 font-medium">{c.type || 'Community Welfare'}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-blue-200 text-xs">
                  No contribution logged yet. Click "Add Record" to submit your community work.
                </div>
              )}
            </div>
          </div>

          {/* SECTION 4: ACHIEVEMENTS (Badge & Trophy Showcase) */}
          <div className="rounded-3xl p-6 sm:p-7 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-300" />
                  Achievements & Badge Showcase
                </h3>
                <p className="text-xs text-blue-100">
                  Honors and credentials unlocked through meritorious service.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-300">
                {student.achievements ? student.achievements.length : 0} Honors
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {student.achievements && student.achievements.map((ach) => (
                <div
                  key={ach.id}
                  onClick={() => setSelectedBadge(ach)}
                  className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/15 hover:border-amber-300/50 cursor-pointer transition-all duration-300 flex items-center gap-3.5 group hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shadow-md">
                    {getBadgeIcon(ach.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 truncate">
                      {ach.title}
                    </h4>
                    <p className="text-[11px] text-blue-100 truncate mt-0.5">
                      {ach.desc}
                    </p>
                    <span className="text-[10px] text-blue-300/70 font-mono">
                      Issued {ach.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* MODAL: ADD CONTRIBUTION */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-[#091b3b]/80">
          <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-7 bg-[#102752] border border-white/25 shadow-2xl text-white">
            <h3 className="text-lg font-bold text-white mb-1">
              Log New NSS Community Contribution
            </h3>
            <p className="text-xs text-blue-200 mb-4">
              Submit your recent social service or camp activities to update your official tally.
            </p>

            {formError && (
              <div className="mb-4 p-2.5 rounded-xl bg-rose-500/30 text-white text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleAddContribution} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-blue-100 font-semibold mb-1">
                  Activity / Initiative Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Mega Tree Plantation Drive at Khandagiri"
                  className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-blue-100 font-semibold mb-1">
                    Hours Contributed *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={newHours}
                    onChange={(e) => setNewHours(e.target.value)}
                    placeholder="e.g. 12"
                    className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-blue-100 font-semibold mb-1">
                    Activity Date
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-blue-100 font-semibold mb-1">
                  Category / Focus Area
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white"
                >
                  <option value="Health & Blood Donation" className="bg-[#102752]">Health & Blood Donation</option>
                  <option value="Swachh Bharat & Cleanliness" className="bg-[#102752]">Swachh Bharat & Cleanliness</option>
                  <option value="Environment & Plantation" className="bg-[#102752]">Environment & Plantation</option>
                  <option value="Education & Literacy" className="bg-[#102752]">Education & Literacy</option>
                  <option value="Disaster Relief & Care" className="bg-[#102752]">Disaster Relief & Care</option>
                  <option value="Community Welfare" className="bg-[#102752]">Community Welfare</option>
                </select>
              </div>

              <div>
                <label className="block text-blue-100 font-semibold mb-1">
                  Description / Work Summary *
                </label>
                <textarea
                  rows="3"
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Summarize your role, responsibilities, and measurable impact created..."
                  className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-blue-200 hover:text-white bg-white/10 hover:bg-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 shadow"
                >
                  Save Contribution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: BADGE INSPECTION */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-[#091b3b]/80">
          <div className="relative w-full max-w-md rounded-3xl p-6 text-center bg-[#102752] border border-amber-400/40 shadow-2xl">
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 text-blue-200 hover:text-white"
            >
              ✕
            </button>

            <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-600 p-1 shadow-xl animate-float">
              <div className="w-full h-full rounded-2xl bg-[#0d1d40] flex items-center justify-center">
                {getBadgeIcon(selectedBadge.icon)}
              </div>
            </div>

            <h3 className="text-xl font-black text-white">
              {selectedBadge.title}
            </h3>
            <p className="text-xs text-amber-300 font-bold uppercase tracking-wider mt-0.5">
              {selectedBadge.category} Excellence
            </p>

            <p className="text-xs text-blue-100 mt-3 leading-relaxed">
              {selectedBadge.desc}
            </p>

            <div className="mt-5 p-3 rounded-2xl bg-white/10 border border-white/15 text-xs text-blue-100 space-y-1 text-left font-mono">
              <div>Certificate ID: SOA-NSS-{selectedBadge.id.toUpperCase()}-2024</div>
              <div>Recipient: {student.name}</div>
              <div>Affiliation: {student.college}</div>
              <div>Issued: {selectedBadge.date}</div>
            </div>

            <button
              onClick={() => setSelectedBadge(null)}
              className="mt-5 w-full py-2.5 rounded-xl font-bold text-xs text-slate-900 bg-white hover:bg-slate-100"
            >
              Close Showcase
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
