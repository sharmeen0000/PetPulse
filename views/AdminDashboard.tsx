
import React, { useState, useEffect } from 'react';
import {
  Users,
  ShieldCheck,
  CreditCard,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  Clock,
  User as UserIcon,
  Dog,
  ExternalLink,
  Info,
  Lock,
  Unlock,
  ShieldAlert,
  Fingerprint,
  Key
} from 'lucide-react';
import { useApp } from '../App';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', users: 4000, revenue: 2400 },
  { name: 'Feb', users: 3000, revenue: 1398 },
  { name: 'Mar', users: 2000, revenue: 9800 },
  { name: 'Apr', users: 2780, revenue: 3908 },
  { name: 'May', users: 1890, revenue: 4800 },
  { name: 'Jun', users: 2390, revenue: 3800 },
  { name: 'Jul', users: 3490, revenue: 4300 },
];

const AdminDashboard: React.FC = () => {
  const { appointments, pets, updateAppointmentStatus } = useApp();
  const [isVerified, setIsVerified] = useState(() => {
    return sessionStorage.getItem('admin_cleared') === 'true';
  });
  const [securityCode, setSecurityCode] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [activeTab, setActiveTab] = useState<'vets' | 'appointments'>('appointments');

  // UPDATED: Security code changed to 9876 as requested
  const ADMIN_PASSWORD = "9876";

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    // Simulate network delay for "Security Handshake"
    setTimeout(() => {
      if (securityCode === ADMIN_PASSWORD) {
        setIsVerified(true);
        sessionStorage.setItem('admin_cleared', 'true');
        setError('');
      } else {
        setAttempts(prev => prev + 1);
        setError('Access Denied: Invalid Clearance Code');
        setSecurityCode('');
      }
      setIsAuthenticating(false);
    }, 1200);
  };

  const handleLock = () => {
    setIsVerified(false);
    sessionStorage.removeItem('admin_cleared');
  };

  const [vetQueue, setVetQueue] = useState([
    { id: 'v1', name: "Dr. Alex Rivera", specialty: "Exotic Pets", status: "PENDING", date: "2h ago" },
    { id: 'v2', name: "Dr. Emily Chen", specialty: "Canine Surgery", status: "REVIEWING", date: "5h ago" },
  ]);

  const handleVetAction = (id: string, newStatus: string) => {
    setVetQueue(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const pendingAppointments = appointments.filter(a => a.status === 'PENDING_APPROVAL');

  // Security Gate UI
  if (!isVerified) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 animate-in fade-in duration-500">
        <div className="w-full max-w-md bg-white rounded-[2rem] border border-slate-200 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-indigo-500 to-indigo-900"></div>

          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-slate-800 shadow-xl">
              <ShieldAlert className="text-indigo-400" size={40} />
            </div>

            <h2 className="text-2xl font-outfit font-bold text-slate-900 mb-2">Restricted Access</h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              Platform Command Center requires Tier-1 Clearance. Please enter your 4-digit authorization code.
            </p>

            <form onSubmit={handleVerify} className="space-y-4 text-left">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 block">Clearance Code</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    type="password"
                    inputMode="numeric"
                    autoFocus
                    maxLength={4}
                    disabled={attempts >= 3}
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value.replace(/\D/g, ''))}
                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl outline-none focus:ring-4 transition-all font-mono tracking-[1em] text-center text-2xl font-bold ${error ? 'border-red-200 focus:ring-red-50 text-red-600' : 'border-slate-200 focus:ring-indigo-50'
                      }`}
                    placeholder="0000"
                  />
                </div>
                {error && (
                  <p className="text-xs text-red-500 font-bold mt-2 flex items-center justify-center gap-1">
                    <AlertCircle size={12} /> {error}
                  </p>
                )}
                {attempts > 0 && attempts < 3 && (
                  <p className="text-[9px] text-center text-slate-400 mt-2 uppercase font-black">
                    Attempt {attempts} of 3
                  </p>
                )}
                {attempts >= 3 && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl animate-bounce">
                    <p className="text-[10px] text-red-700 font-bold uppercase mb-1">Terminal Locked</p>
                    <p className="text-[10px] text-red-600">Security breach protocol initiated. Access suspended.</p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={securityCode.length < 4 || isAuthenticating || attempts >= 3}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
              >
                {isAuthenticating ? (
                  <><div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> Authorizing...</>
                ) : (
                  <><Unlock size={18} /> Enter Secure Zone</>
                )}
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-6">
              <div className="flex items-center gap-1.5 opacity-30">
                <Fingerprint size={14} />
                <span className="text-[9px] font-bold uppercase">Biometric Link</span>
              </div>
              <div className="flex items-center gap-1.5 opacity-30">
                <ShieldCheck size={14} />
                <span className="text-[9px] font-bold uppercase">Encrypted</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-center">
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Login Activity is Recorded (IP: 192.168.1.1)</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-outfit font-bold text-slate-900">Platform Command Center</h1>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-green-700 rounded-full border border-green-100">
              <ShieldCheck size={12} />
              <span className="text-[9px] font-black uppercase tracking-widest">Secure Area</span>
            </div>
          </div>
          <p className="text-slate-500 text-sm">Welcome back, Admin. System status is currently <span className="text-green-600 font-bold underline">OPTIMAL</span>.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLock}
            className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all shadow-sm group"
            title="Lock Panel"
          >
            <Lock size={18} className="group-active:scale-90 transition-transform" />
          </button>
          <div className="flex items-center bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'appointments' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Appointments ({pendingAppointments.length})
            </button>
            <button
              onClick={() => setActiveTab('vets')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'vets' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Vet Verifications
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatItem title="Pending Approvals" value={pendingAppointments.length.toString()} change="High Priority" icon={<AlertCircle className="text-amber-600" />} />
        <StatItem title="Total Revenue" value="$124k" change="+14.2%" icon={<CreditCard className="text-green-600" />} />
        <StatItem title="Approval Rate" value="94%" change="+2%" icon={<ShieldCheck className="text-orange-600" />} />
        <StatItem title="SLA Health" value="100%" change="Normal" icon={<CheckCircle2 className="text-blue-600" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'appointments' ? (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-800">Booking Requests</h3>
                  <p className="text-xs text-slate-400">Verify and approve pet consultations</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full uppercase">Review Queue</span>
                </div>
              </div>
              <div className="divide-y divide-slate-50">
                {pendingAppointments.length > 0 ? pendingAppointments.map(appt => {
                  const pet = pets.find(p => p.id === appt.petId);
                  return (
                    <div key={appt.id} className="p-6 md:p-8 flex flex-col gap-6 hover:bg-slate-50/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0 border-2 border-white shadow-sm overflow-hidden">
                          {pet?.image ? (
                            <img src={pet.image} className="w-full h-full object-cover" alt="Pet" />
                          ) : (
                            <Dog className="text-slate-300" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-slate-900 text-lg">{pet?.name || 'Unknown Pet'}</p>
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase">{pet?.species}</span>
                          </div>
                          <p className="text-sm font-medium text-slate-700">Reason: <span className="text-slate-500 italic">"{appt.reason}"</span></p>
                          <div className="flex flex-wrap items-center gap-4 mt-3">
                            <span className="flex items-center gap-1.5 text-[11px] text-slate-500 font-bold bg-white px-2 py-1 rounded-lg border border-slate-100">
                              <Calendar size={14} className="text-indigo-500" /> {appt.date}
                            </span>
                            <span className="flex items-center gap-1.5 text-[11px] text-slate-500 font-bold bg-white px-2 py-1 rounded-lg border border-slate-100">
                              <Clock size={14} className="text-indigo-500" /> {appt.time}
                            </span>
                            <span className="flex items-center gap-1.5 text-[11px] text-slate-500 font-bold bg-white px-2 py-1 rounded-lg border border-slate-100">
                              <Info size={14} className="text-indigo-500" /> {pet?.breed} • {pet?.age} yrs • {pet?.weight}kg
                            </span>
                          </div>
                        </div>
                        <div className="flex md:flex-col gap-2 w-full md:w-auto">
                          <button
                            onClick={() => updateAppointmentStatus(appt.id, 'SCHEDULED')}
                            className="flex-1 md:w-32 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
                          >
                            <CheckCircle2 size={14} /> Approve
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appt.id, 'REJECTED')}
                            className="flex-1 md:w-32 py-2.5 border border-red-100 text-red-600 rounded-xl text-xs font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                          >
                            <XCircle size={14} /> Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="p-20 text-center flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="text-slate-200" size={32} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Queue is empty</p>
                      <p className="text-sm text-slate-400">Great job! All booking requests have been handled.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-50">
                <h3 className="font-bold text-slate-800">Vet Verification Queue</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {vetQueue.map(item => (
                  <div key={item.id} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold">{item.name[4]}</div>
                      <div>
                        <p className="font-bold text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.specialty}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleVetAction(item.id, 'APPROVED')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><CheckCircle2 size={18} /></button>
                      <button onClick={() => handleVetAction(item.id, 'REJECTED')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><XCircle size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-8">System Traffic</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Unlock size={64} className="rotate-12" />
            </div>
            <h3 className="text-xl font-bold mb-4 relative z-10">Approval SLA</h3>
            <div className="relative z-10 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-indigo-300 uppercase mb-2">
                  <span>Response Time</span>
                  <span>12m / 30m Avg</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full w-[40%]" />
                </div>
              </div>
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-green-400" />
                  <div>
                    <p className="text-sm font-bold">Excellent Performance</p>
                    <p className="text-xs text-indigo-200">Processing speed up by 15%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center justify-between">
              Activity Feed
              <button className="text-[10px] text-indigo-600 font-bold">LIVE</button>
            </h3>
            <div className="space-y-5">
              {appointments.slice(0, 5).map(a => {
                const p = pets.find(pet => pet.id === a.petId);
                return (
                  <div key={a.id} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 shrink-0 group-hover:bg-indigo-50 transition-colors">
                      <Calendar size={14} className="text-indigo-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-700 truncate">{p?.name || 'User'} requested {a.reason}</p>
                      <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Recently</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatItem: React.FC<{ title: string, value: string, change: string, icon: React.ReactNode }> = ({ title, value, change, icon }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${change.includes('+') ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-600'}`}>
        {change}
      </span>
    </div>
    <p className="text-xs font-semibold text-slate-400 mb-1">{title}</p>
    <p className="text-2xl font-bold text-slate-900 font-outfit">{value}</p>
  </div>
);

export default AdminDashboard;
