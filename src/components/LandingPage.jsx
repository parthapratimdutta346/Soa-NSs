import React, { useRef, useState } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  Shield, 
  Users, 
  HeartHandshake, 
  Sprout, 
  Droplets, 
  Award, 
  ArrowUpRight, 
  Building2, 
  Compass, 
  BookOpen, 
  Mail, 
  Lock, 
  User, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import CinematicIntro from './CinematicIntro';
import ThreeHeroAnimation from './ThreeHeroAnimation';
import { SOA_COLLEGES, COLLEGE_DETAILS, registerStudent } from '../services/nssService';

export default function LandingPage({ onEnterPortal, onSelectCollegeUnit, onAuthSuccess }) {
  const contentSectionRef = useRef(null);

  // Minimal form fields for sign-up as shown in the bottom of the user's mockup
  const [quickEmail, setQuickEmail] = useState('');
  const [quickUsername, setQuickUsername] = useState('');
  const [quickPassword, setQuickPassword] = useState('');
  const [quickCollege, setQuickCollege] = useState(SOA_COLLEGES[0]);
  const [quickRegistered, setQuickRegistered] = useState(false);

  const handleScrollToContent = () => {
    if (contentSectionRef.current) {
      contentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickSignUp = (e) => {
    e.preventDefault();
    if (!quickEmail || !quickUsername) return;

    const res = registerStudent({
      name: quickUsername,
      id: 'SOA2024' + Math.floor(1000 + Math.random() * 9000),
      email: quickEmail,
      phone: "+91 98000 00000",
      bloodGroup: "O+",
      college: quickCollege
    });

    if (res.success) {
      setQuickRegistered(true);
      setTimeout(() => {
        onAuthSuccess(res.user);
      }, 700);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 overflow-hidden bg-gradient-to-b from-[#162f5e] via-[#12274e] to-[#0c1c38]">
      
      {/* 1. CINEMATIC 3D INTRO SEQUENCE AT THE START OF THE PAGE */}
      <CinematicIntro 
        onAuthSuccess={onAuthSuccess}
        onOpenFullAuth={onEnterPortal}
        onScrollToContent={handleScrollToContent}
      />

      {/* 2. MAIN WEBSITE CONTENT (Seamlessly continuing the authentic blue theme) */}
      <div ref={contentSectionRef} className="relative z-10">

        {/* DETAILS & MINIMAL FORM FIELDS SECTION (From reference mockup lower half) */}
        <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/15">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Details Overview */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-bold text-amber-300 uppercase tracking-wider backdrop-blur-md">
                <Shield className="w-3.5 h-3.5" />
                SOA National Service Scheme
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
                Details & Objectives of the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-white">
                  SOA University NSS Cell
                </span>
              </h2>

              <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-2xl font-normal">
                The National Service Scheme at Siksha 'O' Anusandhan (Deemed to be University) provides students with hands-on experiential opportunities to engage in selfless nation-building. Under the guiding motto <span className="text-amber-300 font-bold font-mono">"NOT ME BUT YOU"</span>, our volunteers spearhead transformative community initiatives across Odisha.
              </p>

              {/* Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all shadow-md">
                  <div className="font-bold text-white text-sm flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>9 Constituent Units</span>
                  </div>
                  <p className="text-xs text-blue-100/80">
                    Dedicated wings across engineering, medicine, agriculture, law, and nursing.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all shadow-md">
                  <div className="font-bold text-white text-sm flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Certified Service Hours</span>
                  </div>
                  <p className="text-xs text-blue-100/80">
                    Officially endorsed records towards the National Youth Award and university diplomas.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all shadow-md">
                  <div className="font-bold text-white text-sm flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Blood Donation Registry</span>
                  </div>
                  <p className="text-xs text-blue-100/80">
                    Lifesaving partnership with SUM Hospital Blood Centre for emergency donor dispatch.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all shadow-md">
                  <div className="font-bold text-white text-sm flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Environmental Action</span>
                  </div>
                  <p className="text-xs text-blue-100/80">
                    Vriksharopan Pakhwada, seed ball dispersal, and coastal Odisha cleanliness drives.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Minimal Form Fields for Sign-Up (From reference mockup lower half) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl p-6 sm:p-8 bg-white/15 backdrop-blur-2xl border border-white/25 shadow-2xl">
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-white">
                    Quick Volunteer Sign Up
                  </h3>
                  <p className="text-xs text-blue-100 mt-0.5">
                    Enroll instantly into your college's NSS Unit.
                  </p>
                </div>

                {quickRegistered ? (
                  <div className="p-4 rounded-2xl bg-emerald-500/25 border border-emerald-400/50 text-white text-xs flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                    <span>Registration successful! Launching your volunteer portal...</span>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSignUp} className="space-y-3.5">
                    <div>
                      <input
                        type="email"
                        required
                        value={quickEmail}
                        onChange={(e) => setQuickEmail(e.target.value)}
                        placeholder="Email Address (e.g. name@soa.ac.in)"
                        className="w-full px-4 py-3 rounded-2xl bg-white/20 hover:bg-white/25 focus:bg-white/30 border border-white/30 text-xs sm:text-sm text-white placeholder-blue-200/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors shadow-inner"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        value={quickUsername}
                        onChange={(e) => setQuickUsername(e.target.value)}
                        placeholder="Full Name / Username"
                        className="w-full px-4 py-3 rounded-2xl bg-white/20 hover:bg-white/25 focus:bg-white/30 border border-white/30 text-xs sm:text-sm text-white placeholder-blue-200/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors shadow-inner"
                      />
                    </div>

                    <div>
                      <input
                        type="password"
                        required
                        value={quickPassword}
                        onChange={(e) => setQuickPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-3 rounded-2xl bg-white/20 hover:bg-white/25 focus:bg-white/30 border border-white/30 text-xs sm:text-sm text-white placeholder-blue-200/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-blue-100 mb-1">
                        Select College Unit
                      </label>
                      <select
                        value={quickCollege}
                        onChange={(e) => setQuickCollege(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-2xl bg-white/20 border border-white/30 text-xs text-amber-300 font-bold focus:outline-none focus:ring-2 focus:ring-white/50"
                      >
                        {SOA_COLLEGES.map(c => (
                          <option key={c} value={c} className="bg-[#12274e] text-white font-normal">{c}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-full font-extrabold text-xs sm:text-sm text-slate-900 bg-white hover:bg-slate-100 active:scale-[0.98] shadow-lg shadow-black/20 transition-all flex items-center justify-center gap-2"
                    >
                      <span>SIGN UP & ENTER PORTAL</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                <div className="mt-4 pt-4 border-t border-white/15 text-center">
                  <button
                    onClick={() => onEnterPortal('login')}
                    className="text-xs text-blue-100 hover:text-white"
                  >
                    Already registered? <span className="text-amber-300 font-bold underline underline-offset-2">Sign in here</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. IMPACT STATISTICS STRIP (Authentic Clean Cards) */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/15">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 rounded-3xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md text-center shadow-lg transition-all">
              <div className="text-3xl sm:text-4xl font-black text-white">2,850+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-300 mt-1">Student Volunteers</div>
              <div className="text-[11px] text-blue-100/80 mt-0.5">Enrolled Across 9 Units</div>
            </div>

            <div className="p-6 rounded-3xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md text-center shadow-lg transition-all">
              <div className="text-3xl sm:text-4xl font-black text-white">18,400+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-300 mt-1">Service Hours</div>
              <div className="text-[11px] text-blue-100/80 mt-0.5">Dedicated to Social Welfare</div>
            </div>

            <div className="p-6 rounded-3xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md text-center shadow-lg transition-all">
              <div className="text-3xl sm:text-4xl font-black text-white">4,120+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-rose-300 mt-1">Blood Units</div>
              <div className="text-[11px] text-blue-100/80 mt-0.5">Safely Donated at SUM Hospital</div>
            </div>

            <div className="p-6 rounded-3xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md text-center shadow-lg transition-all">
              <div className="text-3xl sm:text-4xl font-black text-white">25,000+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 mt-1">Trees Planted</div>
              <div className="text-[11px] text-blue-100/80 mt-0.5">Vriksharopan Pakhwada</div>
            </div>
          </div>
        </section>

        {/* 4. THE 9 CONSTITUENT COLLEGE UNITS DIRECTORY */}
        <section id="colleges-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/15">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-bold text-white uppercase tracking-wider mb-3">
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              University Network
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              The 9 NSS Constituent College Units
            </h2>
            <p className="text-sm text-blue-100 mt-2">
              Every college under Siksha 'O' Anusandhan maintains a specialized NSS wing executing impactful grassroots programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SOA_COLLEGES.map((colName) => {
              const info = COLLEGE_DETAILS[colName] || {};
              return (
                <div 
                  key={colName}
                  onClick={() => onEnterPortal('register')}
                  className="group relative overflow-hidden rounded-3xl p-6 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-amber-400/50 shadow-xl cursor-pointer transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none group-hover:bg-amber-400/10 transition-colors" />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-black/20 border border-white/15 text-amber-300">
                        {info.unitCode}
                      </span>
                      <span className="text-xs text-blue-100 font-semibold">
                        {info.totalVolunteers}+ Volunteers
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {colName}
                    </h3>
                    
                    <p className="text-xs text-blue-100 mt-1 font-medium line-clamp-2">
                      {info.fullName}
                    </p>

                    <p className="text-[11px] text-blue-200/80 mt-3 flex items-start gap-1.5">
                      <span className="text-blue-300 font-semibold">Lead:</span>
                      <span>{info.lead}</span>
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-amber-300 font-bold group-hover:translate-x-1 transition-transform">
                    <span>Enroll In This Unit</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. 3D INTERACTIVE NSS EMBLEM INSPECTION */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/15 text-center">
          <div className="max-w-3xl mx-auto mb-6">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              The Emblem of the National Service Scheme
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1">
              Based on the legendary Konark Sun Temple chariot wheel, embodying continuous progress and service across day and night.
            </p>
          </div>
          <ThreeHeroAnimation onEnterPortal={() => onEnterPortal('login')} />
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/15 bg-black/25 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200">
          <div className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}assets/soa-logo.png`} alt="SOA Logo" className="w-8 h-8 object-contain" />
            <span>© {new Date().getFullYear()} Siksha 'O' Anusandhan (Deemed to be University) • National Service Scheme Cell</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-blue-300">Bhubaneswar, Odisha, India</span>
            <span>•</span>
            <button onClick={() => onEnterPortal('login')} className="text-amber-300 hover:text-white font-bold">
              Volunteer & Admin Portal
            </button>
          </div>
        </footer>

      </div>

    </div>
  );
}
