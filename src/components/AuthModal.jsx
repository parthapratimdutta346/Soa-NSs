import React, { useState } from 'react';
import { 
  X, 
  User, 
  Shield, 
  Lock, 
  Mail, 
  Phone, 
  Droplets, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { SOA_COLLEGES, loginUser, registerStudent } from '../services/nssService';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, initialMode = 'login', initialRole = 'student' }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [role, setRole] = useState(initialRole); // 'student' | 'admin'

  // Login form state
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regId, setRegId] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regBloodGroup, setRegBloodGroup] = useState('O+');
  const [regCollege, setRegCollege] = useState(SOA_COLLEGES[0]);
  const [isCollegeDropdownOpen, setIsCollegeDropdownOpen] = useState(false);

  // Status state
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      const res = loginUser({
        userId: loginId || (role === 'admin' ? 'admin' : 'SOA2022NSS101'),
        password: loginPassword || 'password',
        role
      });

      setIsSubmitting(false);
      if (res.success) {
        onAuthSuccess(res.user);
        onClose();
      } else {
        setErrorMsg(res.message || "Failed to sign in.");
      }
    }, 450);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regName.trim() || !regId.trim() || !regEmail.trim()) {
      setErrorMsg("Please fill in all mandatory fields (Name, Registration ID, Email).");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = registerStudent({
        name: regName,
        id: regId,
        email: regEmail,
        phone: regPhone,
        bloodGroup: regBloodGroup,
        college: regCollege
      });

      setIsSubmitting(false);
      if (res.success) {
        onAuthSuccess(res.user);
        onClose();
      } else {
        setErrorMsg(res.message);
      }
    }, 500);
  };

  const handleQuickDemo = (demoType) => {
    setErrorMsg('');
    if (demoType === 'student') {
      setRole('student');
      setLoginId('SOA2022NSS101');
      setLoginPassword('nss2024');
    } else {
      setRole('admin');
      setLoginId('ADMIN-SOA-001');
      setLoginPassword('soaAdmin2024');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-xl bg-[#081838]/80 animate-in fade-in duration-200">
      
      {/* 3D Glassmorphism Auth Card */}
      <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#142d5c]/95 to-[#0e2145]/98 border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-slate-100 overflow-hidden transform transition-all">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-amber-400/20 via-sky-400/25 to-rose-400/20 blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/15 p-1.5 flex items-center justify-center shadow-inner">
            <img src={`${import.meta.env.BASE_URL}assets/soa-logo.png`} alt="SOA Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              SOA NSS Portal
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-brand-nssRed/20 text-rose-300 border border-brand-nssRed/30">
                Secure Access
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {mode === 'login' ? 'Authenticate into your service dashboard' : 'Register new student volunteer profile'}
            </p>
          </div>
        </div>

        {/* Role Selector (Volunteer vs Admin) */}
        {mode === 'login' && (
          <div className="grid grid-cols-2 gap-2 p-1.5 mb-6 rounded-2xl bg-[#090e24] border border-white/10">
            <button
              type="button"
              onClick={() => { setRole('student'); setErrorMsg(''); }}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                role === 'student'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-900/40 border border-blue-400/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Student / Volunteer</span>
            </button>

            <button
              type="button"
              onClick={() => { setRole('admin'); setErrorMsg(''); }}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                role === 'admin'
                  ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-md shadow-amber-900/40 border border-amber-400/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>NSS Officer / Admin</span>
            </button>
          </div>
        )}

        {/* Quick Demo Autofill Notice */}
        {mode === 'login' && (
          <div className="mb-5 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Quick Demo Fill:</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="px-2.5 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 font-medium text-[11px] transition-colors"
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-medium text-[11px] transition-colors"
              >
                Admin
              </button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {role === 'admin' ? 'Officer / Admin ID' : 'Student University Roll / Reg ID'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder={role === 'admin' ? 'admin' : 'e.g. SOA2022NSS101'}
                  className="w-full pl-10 pr-4 py-3 bg-[#080d22]/80 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#080d22]/80 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-nssRed via-rose-600 to-brand-nssOrange hover:from-rose-600 hover:to-orange-500 shadow-lg shadow-rose-900/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to {role === 'admin' ? 'Admin Cell' : 'Volunteer Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {role === 'student' && (
              <div className="pt-2 text-center">
                <p className="text-xs text-slate-400">
                  New volunteer to SOA NSS?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('register'); setErrorMsg(''); }}
                    className="text-rose-400 hover:text-rose-300 font-semibold underline underline-offset-4"
                  >
                    Register / Profile Setup
                  </button>
                </p>
              </div>
            )}
          </form>
        ) : (
          /* REGISTRATION / PROFILE SETUP FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="e.g. Sourav Mohanty"
                className="w-full px-3.5 py-2.5 bg-[#080d22]/80 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  University Reg ID *
                </label>
                <input
                  type="text"
                  required
                  value={regId}
                  onChange={(e) => setRegId(e.target.value)}
                  placeholder="e.g. 2301020456"
                  className="w-full px-3.5 py-2.5 bg-[#080d22]/80 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Blood Group
                </label>
                <select
                  value={regBloodGroup}
                  onChange={(e) => setRegBloodGroup(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#080d22]/80 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="O+">O+</option>
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="AB+">AB+</option>
                  <option value="O-">O-</option>
                  <option value="A-">A-</option>
                  <option value="B-">B-</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="name@soa.ac.in"
                  className="w-full px-3.5 py-2.5 bg-[#080d22]/80 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  className="w-full px-3.5 py-2.5 bg-[#080d22]/80 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* MANDATORY CUSTOM DROPDOWN: SELECT COLLEGE (Strictly 9 specified options) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>Select College *</span>
                <span className="text-[10px] text-amber-400 font-normal">9 SOA Constituent Units</span>
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCollegeDropdownOpen(!isCollegeDropdownOpen)}
                  className="w-full px-3.5 py-2.5 bg-[#080d22] border border-white/15 rounded-xl text-sm text-white flex items-center justify-between hover:border-rose-500 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-rose-400" />
                    <span className="font-semibold text-amber-300">{regCollege}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isCollegeDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCollegeDropdownOpen && (
                  <div className="absolute left-0 right-0 mt-1.5 max-h-48 overflow-y-auto z-50 bg-[#090e24] border border-white/20 rounded-xl shadow-2xl backdrop-blur-2xl divide-y divide-white/5 py-1">
                    {SOA_COLLEGES.map((col) => (
                      <div
                        key={col}
                        onClick={() => {
                          setRegCollege(col);
                          setIsCollegeDropdownOpen(false);
                        }}
                        className={`px-3.5 py-2 text-xs flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors ${
                          regCollege === col ? 'bg-rose-500/20 text-rose-300 font-bold' : 'text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${regCollege === col ? 'bg-rose-400' : 'bg-slate-600'}`} />
                          <span>{col}</span>
                        </div>
                        {regCollege === col && <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 mt-2 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-nssRed via-rose-600 to-brand-nssOrange hover:from-rose-600 hover:to-orange-500 shadow-lg shadow-rose-900/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Registering Volunteer...</span>
              ) : (
                <>
                  <span>Complete Registration & Launch Portal</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-1">
              <p className="text-xs text-slate-400">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMsg(''); }}
                  className="text-rose-400 hover:text-rose-300 font-semibold underline underline-offset-4"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
