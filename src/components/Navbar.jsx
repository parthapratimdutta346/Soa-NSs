import React from 'react';
import { Shield, User, LogOut, ChevronRight, Sparkles, Building2 } from 'lucide-react';

export default function Navbar({ currentUser, activeView, onNavigate, onOpenAuth, onLogout }) {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-gradient-to-b from-[#0d224d]/80 via-[#11295c]/60 to-[#163573]/30 border-b border-white/15 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand & University Logo Section */}
          <div 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* SOA University Logo */}
            <div className="relative p-1 rounded-xl bg-white/15 border border-white/20 group-hover:border-rose-400 transition-all duration-300 shadow-md">
              <img 
                src={`${import.meta.env.BASE_URL}assets/soa-logo.png`} 
                alt="Siksha 'O' Anusandhan University Logo" 
                className="w-12 h-12 md:w-14 md:h-14 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            {/* University & NSS Title */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base md:text-lg tracking-tight text-white group-hover:text-rose-300 transition-colors">
                  SIKSHA 'O' ANUSANDHAN
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-rose-500/25 text-rose-200 border border-rose-400/30">
                  NAAC A++
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-blue-100 font-medium">
                <span className="text-amber-300 font-bold tracking-wide">NSS CELL</span>
                <span>•</span>
                <span className="hidden md:inline text-blue-200">National Service Scheme</span>
                <span className="text-blue-300/80">"Not Me But You"</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <button 
              onClick={() => onNavigate('landing')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeView === 'landing' 
                  ? 'text-white bg-white/20 border border-white/25 shadow-sm' 
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => onNavigate('units')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeView === 'units' 
                  ? 'text-white bg-white/20 border border-white/25 shadow-sm' 
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              9 College Units
            </button>
            {currentUser && currentUser.role === 'student' && (
              <button 
                onClick={() => onNavigate('student')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeView === 'student' 
                    ? 'text-white bg-sky-500/30 border border-sky-400/40 shadow-sm' 
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                Volunteer Portal
              </button>
            )}
            {currentUser && currentUser.role === 'admin' && (
              <button 
                onClick={() => onNavigate('admin')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeView === 'admin' 
                    ? 'text-amber-300 bg-amber-500/25 border border-amber-400/40 shadow-sm' 
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                Admin Console
              </button>
            )}
          </nav>

          {/* User Status / Action Button */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Active Role Badge */}
                <div 
                  onClick={() => onNavigate(currentUser.role === 'admin' ? 'admin' : 'student')}
                  className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/15 border border-white/20 cursor-pointer hover:bg-white/25 transition-all shadow-sm"
                  title="View your dashboard"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                    currentUser.role === 'admin' 
                      ? 'bg-amber-400 text-slate-950 shadow' 
                      : 'bg-white text-slate-900 shadow'
                  }`}>
                    {currentUser.role === 'admin' ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-semibold text-white leading-tight">
                      {currentUser.name ? currentUser.name.split(' ')[0] : 'User'}
                    </span>
                    <span className="text-[10px] text-blue-200 capitalize">
                      {currentUser.role === 'admin' ? 'NSS Officer' : (currentUser.college ? currentUser.college.split(' ')[0] : 'Volunteer')}
                    </span>
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={onLogout}
                  className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/30 border border-white/15 text-white transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-nssRed via-rose-600 to-brand-nssOrange shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.98] border border-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <span>Enter Portal</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
