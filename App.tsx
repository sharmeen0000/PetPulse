
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Dog,
  Stethoscope,
  ShieldCheck,
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Video,
  Settings,
  LogOut,
  User as UserIcon,
  Bell,
  Menu,
  X,
  CreditCard,
  Activity,
  Plus
} from 'lucide-react';
import { UserRole, User, Pet, Appointment } from './types';

// Context for global state
interface AppState {
  user: User | null;
  pets: Pet[];
  appointments: Appointment[];
  login: (role: UserRole) => void;
  register: (user: Omit<User, 'id'>) => void;
  logout: () => void;
  addPet: (pet: Omit<Pet, 'id'>) => void;
  addAppointment: (appt: Omit<Appointment, 'id'>) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  deleteAppointment: (id: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

// Lazy load views
import Landing from './views/Landing';
import CustomerDashboard from './views/CustomerDashboard';
import VetDashboard from './views/VetDashboard';
import AdminDashboard from './views/AdminDashboard';
import Messages from './views/Messages';
import Consultations from './views/Consultations';
import PetsView from './views/PetsView';
import AppointmentsView from './views/AppointmentsView';
import Profile from './views/Profile';
import Login from './views/Login';
import Signup from './views/Signup';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('petpulse_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [pets, setPets] = useState<Pet[]>(() => {
    const saved = localStorage.getItem('petpulse_pets');
    return saved ? JSON.parse(saved) : [
      { id: 'p1', ownerId: 'c1', name: 'Buddy', species: 'Dog', breed: 'Golden Retriever', age: 3, weight: 32, image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200' },
      { id: 'p2', ownerId: 'c1', name: 'Luna', species: 'Cat', breed: 'Siamese', age: 5, weight: 4.5, image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200' },
    ];
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('petpulse_appts');
    return saved ? JSON.parse(saved) : [
      { id: 'a1', petId: 'p1', vetId: 'v1', date: '2024-05-15', time: '10:30 AM', type: 'VIRTUAL', status: 'SCHEDULED', reason: 'Annual Checkup' }
    ];
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('petpulse_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('petpulse_pets', JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    localStorage.setItem('petpulse_appts', JSON.stringify(appointments));
  }, [appointments]);

  const login = (role: UserRole) => {
    const mockUsers: Record<UserRole, User> = {
      [UserRole.CUSTOMER]: { id: 'c1', name: 'John Doe', email: 'john@example.com', role: UserRole.CUSTOMER, avatar: 'https://picsum.photos/id/64/100/100' },
      [UserRole.VETERINARIAN]: { id: 'v1', name: 'Dr. Sarah Smith', email: 'sarah@petpulse.vet', role: UserRole.VETERINARIAN, avatar: 'https://picsum.photos/id/65/100/100' },
      [UserRole.ADMIN]: { id: 'a1', name: 'Admin User', email: 'admin@petpulse.com', role: UserRole.ADMIN, avatar: 'https://picsum.photos/id/66/100/100' },
    };
    setUser(mockUsers[role]);
    setIsSidebarOpen(false);
  };

  const register = (newUser: Omit<User, 'id'>) => {
    const user: User = {
      ...newUser,
      id: `u${Date.now()}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newUser.name}` // Generate dynamic avatar
    };
    setUser(user);
    setIsSidebarOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('petpulse_user');
  };

  const addPet = (newPet: Omit<Pet, 'id'>) => {
    const pet: Pet = { ...newPet, id: `p${Date.now()}` };
    setPets(prev => [...prev, pet]);
  };

  const addAppointment = (newAppt: Omit<Appointment, 'id'>) => {
    const appt: Appointment = { ...newAppt, id: `a${Date.now()}` };
    setAppointments(prev => [...prev, appt]);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  return (
    <AppContext.Provider value={{ user, pets, appointments, login, register, logout, addPet, addAppointment, updateAppointmentStatus, deleteAppointment }}>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
          {user && (
            <>
              {/* Mobile Nav Header */}
              <div className="md:hidden bg-white/80 backdrop-blur-md border-b px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
                    <Dog className="text-white w-5 h-5" />
                  </div>
                  <span className="font-outfit font-bold text-xl text-indigo-900">PetPulse</span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 -mr-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* Sidebar Overlay */}
              {isSidebarOpen && (
                <div
                  className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
                  onClick={() => setIsSidebarOpen(false)}
                />
              )}

              {/* Sidebar Component */}
              <aside className={`
                fixed md:sticky top-0 h-screen w-72 bg-white border-r border-slate-100 z-50 transform transition-transform duration-300 ease-out shadow-xl md:shadow-none
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
              `}>
                <div className="p-6 h-full flex flex-col">
                  <Link to="/" className="hidden md:flex items-center gap-3 mb-10 px-2" onClick={() => setIsSidebarOpen(false)}>
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                      <Dog className="text-white w-6 h-6" />
                    </div>
                    <span className="font-outfit font-bold text-2xl text-indigo-900 tracking-tight">PetPulse</span>
                  </Link>

                  <nav className="space-y-1.5 flex-1 overflow-y-auto custom-scrollbar pr-2">
                    <div className="px-2 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Menu</div>
                    <SidebarItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" onClick={() => setIsSidebarOpen(false)} />

                    {user.role === UserRole.CUSTOMER && (
                      <>
                        <SidebarItem to="/pets" icon={<Activity size={20} />} label="My Pets" onClick={() => setIsSidebarOpen(false)} />
                        <SidebarItem to="/appointments" icon={<Calendar size={20} />} label="Appointments" onClick={() => setIsSidebarOpen(false)} />
                        <SidebarItem to="/consultations" icon={<Video size={20} />} label="Video Consults" onClick={() => setIsSidebarOpen(false)} />
                      </>
                    )}
                    {user.role === UserRole.VETERINARIAN && (
                      <>
                        <SidebarItem to="/patients" icon={<Stethoscope size={20} />} label="Patients" onClick={() => setIsSidebarOpen(false)} />
                        <SidebarItem to="/schedule" icon={<Calendar size={20} />} label="Schedule" onClick={() => setIsSidebarOpen(false)} />
                      </>
                    )}
                    {user.role === UserRole.ADMIN && (
                      <>
                        <SidebarItem to="/users" icon={<UserIcon size={20} />} label="User Management" onClick={() => setIsSidebarOpen(false)} />
                        <SidebarItem to="/subscriptions" icon={<CreditCard size={20} />} label="Plans & Revenue" onClick={() => setIsSidebarOpen(false)} />
                        <SidebarItem to="/verification" icon={<ShieldCheck size={20} />} label="Vet Verification" onClick={() => setIsSidebarOpen(false)} />
                      </>
                    )}
                    <SidebarItem to="/messages" icon={<MessageSquare size={20} />} label="Messages" onClick={() => setIsSidebarOpen(false)} />
                  </nav>

                  <div className="mt-auto pt-6 border-t border-slate-100 space-y-2">
                    <div className="px-2 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Account</div>
                    <SidebarItem to="/settings" icon={<Settings size={20} />} label="Settings" onClick={() => setIsSidebarOpen(false)} />
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200 font-medium group"
                    >
                      <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </aside>
            </>
          )}

          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            {user && (
              <header className="hidden md:flex bg-white border-b px-8 py-4 items-center justify-between sticky top-0 z-30">
                <h2 className="text-xl font-outfit font-bold text-slate-800">
                  Welcome back, {user.name.split(' ')[0]}!
                </h2>
                <div className="flex items-center gap-4">
                  <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                  </button>
                  <Link to="/settings" className="flex items-center gap-3 border-l pl-4 hover:opacity-80 transition-opacity">
                    <div className="text-right">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{user.role.toLowerCase()}</p>
                    </div>
                    <img src={user.avatar} className="w-10 h-10 rounded-full object-cover border" alt="User" />
                  </Link>
                </div>
              </header>
            )}

            <div className={`${user ? 'p-4 md:p-8' : ''}`}>
              {!user ? (
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="*" element={<Landing onLogin={login} />} />
                </Routes>
              ) : (
                <Routes>
                  <Route path="/" element={
                    user.role === UserRole.CUSTOMER ? <CustomerDashboard /> :
                      user.role === UserRole.VETERINARIAN ? <VetDashboard /> :
                        <AdminDashboard />
                  } />
                  <Route path="/messages" element={<Messages user={user} />} />
                  <Route path="/consultations" element={<Consultations />} />
                  <Route path="/pets" element={<PetsView />} />
                  <Route path="/appointments" element={<AppointmentsView />} />
                  <Route path="/settings" element={<Profile />} />
                  <Route path="*" element={<PlaceholderView title="Working on it..." />} />
                </Routes>
              )}
            </div>
          </main>
        </div>
      </Router >
    </AppContext.Provider >
  );
};

const SidebarItem: React.FC<{ to: string, icon: React.ReactNode, label: string, onClick: () => void }> = ({ to, icon, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${isActive
        ? 'bg-indigo-50 text-indigo-700'
        : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
        }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const PlaceholderView: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-dashed border-slate-200">
    <Activity className="w-12 h-12 text-slate-300 mb-4" />
    <h3 className="text-lg font-medium text-slate-500">{title}</h3>
    <p className="text-slate-400">This specialized feature is coming in the next update!</p>
  </div>
);

export default App;
