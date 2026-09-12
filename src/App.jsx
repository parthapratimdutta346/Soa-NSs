import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import { 
  initializeDataStore, 
  getAllStudents, 
  getCurrentAuthUser, 
  setCurrentAuthUser 
} from './services/nssService';

import PostLoginGlobeTransition from './components/PostLoginGlobeTransition';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeView, setActiveView] = useState('landing');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authRole, setAuthRole] = useState('student');
  const [studentsList, setStudentsList] = useState([]);
  const [isGlobeTransitioning, setIsGlobeTransitioning] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);

  // Initialize data store and restore active user session if available
  useEffect(() => {
    initializeDataStore();
    const students = getAllStudents();
    setStudentsList(students);

    const savedUser = getCurrentAuthUser();
    if (savedUser) {
      setCurrentUser(savedUser);
      if (savedUser.role === 'admin') {
        setActiveView('admin');
      } else {
        setActiveView('student');
      }
    }
  }, []);

  const handleAuthSuccess = (user) => {
    // Trigger cinematic 3D globe transition immediately after signing in
    setPendingUser(user);
    setIsGlobeTransitioning(true);
  };

  const handleGlobeTransitionComplete = () => {
    setIsGlobeTransitioning(false);
    if (pendingUser) {
      setCurrentUser(pendingUser);
      setStudentsList(getAllStudents());
      if (pendingUser.role === 'admin') {
        setActiveView('admin');
      } else {
        setActiveView('student');
      }
    }
  };

  const handleReplayGlobe = () => {
    if (currentUser) {
      setPendingUser(currentUser);
      setIsGlobeTransitioning(true);
    }
  };

  const handleLogout = () => {
    setCurrentAuthUser(null);
    setCurrentUser(null);
    setActiveView('landing');
  };

  const handleOpenAuth = (mode = 'login', role = 'student') => {
    setAuthMode(mode);
    setAuthRole(role);
    setIsAuthModalOpen(true);
  };

  const handleUpdateStudent = (updatedStudent) => {
    setCurrentUser({ ...updatedStudent, role: 'student' });
    setStudentsList(getAllStudents());
  };

  const handleRefreshStudents = () => {
    setStudentsList(getAllStudents());
  };

  const handleNavigate = (view) => {
    if (view === 'student' && (!currentUser || currentUser.role !== 'student')) {
      handleOpenAuth('login', 'student');
      return;
    }
    if (view === 'admin' && (!currentUser || currentUser.role !== 'admin')) {
      handleOpenAuth('login', 'admin');
      return;
    }
    if (view === 'units') {
      setActiveView('landing');
      setTimeout(() => {
        const el = document.getElementById('colleges-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    setActiveView(view);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#10254c] via-[#142d5c] to-[#0c1c38] text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Subtle Starfield & Ambient Sky Light */}
      <div className="fixed inset-0 bg-cyber-grid pointer-events-none opacity-20 z-0" />

      {/* Top Navbar */}
      <Navbar 
        currentUser={currentUser}
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenAuth={(mode) => handleOpenAuth(mode, 'student')}
        onLogout={handleLogout}
      />

      {/* Main Viewport */}
      <main className="flex-1 relative z-10">
        {activeView === 'landing' && (
          <LandingPage 
            onEnterPortal={(mode = 'login') => handleOpenAuth(mode, 'student')}
            onSelectCollegeUnit={() => handleOpenAuth('register', 'student')}
            onAuthSuccess={handleAuthSuccess}
          />
        )}

        {activeView === 'student' && currentUser && (
          <StudentDashboard 
            student={currentUser}
            onUpdateStudent={handleUpdateStudent}
            onReplayGlobe={handleReplayGlobe}
          />
        )}

        {activeView === 'admin' && currentUser && (
          <AdminDashboard 
            students={studentsList}
            onRefreshStudents={handleRefreshStudents}
            onReplayGlobe={handleReplayGlobe}
          />
        )}
      </main>

      {/* Cinematic 3D Post-Login Globe Transition Overlay */}
      {isGlobeTransitioning && (
        <PostLoginGlobeTransition 
          user={pendingUser}
          onComplete={handleGlobeTransitionComplete}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authMode}
        initialRole={authRole}
      />
    </div>
  );
}
