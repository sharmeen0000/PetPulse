
import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Search, 
  Clock, 
  Filter, 
  Stethoscope, 
  FileText, 
  TrendingUp, 
  DollarSign,
  BrainCircuit,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  XCircle,
  MoreHorizontal
} from 'lucide-react';
import { useApp } from '../App';
import { assistDiagnosis } from '../services/geminiService';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const earningsData = [
  { name: 'Mon', amount: 400 },
  { name: 'Tue', amount: 700 },
  { name: 'Wed', amount: 500 },
  { name: 'Thu', amount: 900 },
  { name: 'Fri', amount: 1200 },
  { name: 'Sat', amount: 600 },
  { name: 'Sun', amount: 200 },
];

const VetDashboard: React.FC = () => {
  const { pets, appointments, updateAppointmentStatus } = useApp();
  
  const [diagnosisHistory, setDiagnosisHistory] = useState('');
  const [currentObservations, setCurrentObservations] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState<'SCHEDULE' | 'REQUESTS'>('SCHEDULE');

  const handleAIDiagnosis = async () => {
    if (!currentObservations.trim()) return;
    setLoading(true);
    const result = await assistDiagnosis(diagnosisHistory || 'None provided.', currentObservations);
    setAiAnalysis(result);
    setLoading(false);
  };

  const pendingRequests = appointments.filter(a => a.status === 'PENDING_APPROVAL');
  const scheduledAppointments = appointments.filter(a => a.status === 'SCHEDULED');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Dynamic Summary Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-outfit font-bold text-slate-900">Veterinary Control Panel</h1>
          <p className="text-slate-500 text-sm">You have {pendingRequests.length} new patient requests waiting for review.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setActiveView('SCHEDULE')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeView === 'SCHEDULE' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Today's Schedule ({scheduledAppointments.length})
          </button>
          <button 
            onClick={() => setActiveView('REQUESTS')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeView === 'REQUESTS' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Pending Requests ({pendingRequests.length})
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="text-blue-600" />} title="My Patients" value={pets.length.toString()} trend="+3 new this week" />
        <StatCard icon={<Calendar className="text-purple-600" />} title="Confirmed" value={scheduledAppointments.length.toString()} trend="Next: 10:30 AM" />
        <StatCard icon={<Clock className="text-orange-600" />} title="Pending Review" value={pendingRequests.length.toString()} trend="Action required" />
        <StatCard icon={<DollarSign className="text-green-600" />} title="Weekly Earnings" value="$4,520" trend="+12% vs last week" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main List Section */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">
                {activeView === 'SCHEDULE' ? 'Today\'s Confirmed Sessions' : 'Incoming Patient Requests'}
              </h3>
              <div className="flex gap-2">
                <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors">
                  <Filter size={18} />
                </button>
              </div>
            </div>

            <div className="divide-y divide-slate-50">
              {activeView === 'SCHEDULE' ? (
                scheduledAppointments.length > 0 ? scheduledAppointments.map(appt => {
                  const pet = pets.find(p => p.id === appt.petId);
                  return (
                    <div key={appt.id} className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 hover:bg-slate-50/50 transition-colors group">
                      <div className="flex-1 flex items-center gap-5">
                        <img src={pet?.image} className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm" alt="Pet" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900">{pet?.name}</h4>
                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold uppercase">{pet?.species}</span>
                          </div>
                          <p className="text-sm text-slate-500 font-medium">{appt.reason}</p>
                          <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                            <span className="flex items-center gap-1"><Clock size={12} /> {appt.time}</span>
                            <span className="flex items-center gap-1 text-indigo-500"><Stethoscope size={12} /> {appt.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                         <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                           Open Chart
                         </button>
                         <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl">
                           <MoreHorizontal size={18} />
                         </button>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="p-20 text-center flex flex-col items-center gap-3">
                    <Calendar className="text-slate-200" size={48} />
                    <p className="text-slate-400 font-medium">No consultations confirmed for today.</p>
                  </div>
                )
              ) : (
                pendingRequests.length > 0 ? pendingRequests.map(appt => {
                  const pet = pets.find(p => p.id === appt.petId);
                  return (
                    <div key={appt.id} className="p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-6 hover:bg-amber-50/30 transition-colors border-l-4 border-amber-400">
                      <div className="flex-1 flex items-start gap-5">
                        <img src={pet?.image} className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm" alt="Pet" />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-lg">{pet?.name}</h4>
                            <span className="text-xs font-bold text-slate-400">{pet?.breed} • {pet?.age} yrs</span>
                          </div>
                          <div className="bg-amber-100/50 p-3 rounded-xl border border-amber-200/50">
                            <p className="text-xs font-bold text-amber-800 uppercase tracking-tighter mb-1">Reason for Visit</p>
                            <p className="text-sm text-slate-700 italic">"{appt.reason}"</p>
                          </div>
                          <div className="flex items-center gap-4 mt-3 text-xs font-bold text-slate-500">
                            <span className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm"><Calendar size={14} className="text-amber-500" /> {appt.date}</span>
                            <span className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm"><Clock size={14} className="text-amber-500" /> {appt.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex md:flex-col gap-2 w-full md:w-32">
                        <button 
                          onClick={() => updateAppointmentStatus(appt.id, 'SCHEDULED')}
                          className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 size={14} /> Accept
                        </button>
                        <button 
                          onClick={() => updateAppointmentStatus(appt.id, 'REJECTED')}
                          className="flex-1 py-2.5 border border-red-100 text-red-600 rounded-xl text-xs font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                        >
                          <XCircle size={14} /> Decline
                        </button>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="p-20 text-center flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="text-slate-200" size={32} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Clear Skies!</p>
                      <p className="text-sm text-slate-400">All incoming requests have been processed.</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-8 px-2">Performance Analytics</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earningsData}>
                  <defs>
                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                  <YAxis hide />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar Tools */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100/20 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl"></div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center"><BrainCircuit className="text-white" /></div>
              <div>
                <h3 className="font-bold text-lg leading-tight">AI Diagnostic Pilot</h3>
                <p className="text-indigo-300 text-[10px] uppercase font-bold tracking-widest">Medical Intelligence</p>
              </div>
            </div>

            {!aiAnalysis ? (
              <div className="space-y-4 relative z-10">
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-indigo-500 text-white placeholder:text-white/30 h-32 resize-none"
                  placeholder="Paste patient observations or clinical notes for AI analysis..."
                  value={currentObservations}
                  onChange={(e) => setCurrentObservations(e.target.value)}
                />
                <button 
                  onClick={handleAIDiagnosis}
                  disabled={loading || !currentObservations.trim()}
                  className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all disabled:opacity-50 shadow-lg shadow-indigo-500/20"
                >
                   {loading ? (
                     <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Processing...</>
                   ) : <><BrainCircuit size={18} /> Generate Insights</>}
                </button>
              </div>
            ) : (
              <div className="space-y-4 relative z-10">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs leading-relaxed max-h-96 overflow-y-auto custom-scrollbar">
                  <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                    <span className="font-bold text-indigo-400 uppercase tracking-tighter">Clinical Report</span>
                    <button onClick={() => setAiAnalysis('')} className="text-white/40 hover:text-white text-[10px] font-bold">RESET</button>
                  </div>
                  <div className="prose prose-invert prose-sm whitespace-pre-wrap text-indigo-50/90 leading-relaxed font-medium">
                    {aiAnalysis}
                  </div>
                </div>
                <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors">
                   <FileText size={16} /> Save to Medical Records
                </button>
              </div>
            )}
          </div>

          {/* Productivity Tracker */}
          <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100">
            <h4 className="font-bold text-indigo-900 mb-6 flex items-center gap-2"><TrendingUp size={18} /> Daily Quota</h4>
            <div className="space-y-6">
              <ProgressItem label="Patients Seen" current={scheduledAppointments.length} total={12} />
              <ProgressItem label="Reports Filed" current={5} total={10} />
              <ProgressItem label="New Requests" current={pendingRequests.length} total={pendingRequests.length} />
            </div>
          </div>

          {/* Quick Notice */}
          <div className="p-6 bg-white rounded-3xl border border-slate-100">
             <div className="flex gap-3">
               <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center shrink-0">
                 <AlertCircle size={20} />
               </div>
               <div>
                 <p className="text-xs font-bold text-slate-800">Review Required</p>
                 <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Appointments marked as 'Pending' must be confirmed or rescheduled within 2 hours of submission to maintain platform rating.</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, title: string, value: string, trend: string }> = ({ icon, title, value, trend }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-1 hover:shadow-md transition-shadow">
    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-2">{icon}</div>
    <p className="text-sm font-semibold text-slate-500">{title}</p>
    <p className="text-2xl font-bold text-slate-900 font-outfit">{value}</p>
    <p className="text-xs text-slate-400 mt-2 font-medium">{trend}</p>
  </div>
);

const ProgressItem: React.FC<{ label: string, current: number, total: number }> = ({ label, current, total }) => {
  const percent = total === 0 ? 0 : Math.min((current / total) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-[10px] mb-2 font-bold text-slate-500 uppercase tracking-widest">
        <span>{label}</span>
        <span>{current}/{total}</span>
      </div>
      <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden shadow-inner">
        <div className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

export default VetDashboard;
