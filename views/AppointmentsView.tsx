
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Video, MoreHorizontal, Filter, Plus, Trash2, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { useApp } from '../App';
import { useNavigate } from 'react-router-dom';

const AppointmentsView: React.FC = () => {
  const { appointments, pets, deleteAppointment } = useApp();
  const [filter, setFilter] = useState<string>('ALL');
  const navigate = useNavigate();

  const filteredAppointments = appointments.filter(appt => {
    if (filter === 'ALL') return true;
    return appt.status === filter;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return 'bg-green-50 text-green-700 border-green-100';
      case 'PENDING_APPROVAL': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'REJECTED': return 'bg-red-50 text-red-700 border-red-100';
      case 'COMPLETED': return 'bg-slate-50 text-slate-700 border-slate-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-outfit font-bold text-slate-900">Your Appointments</h1>
          <p className="text-slate-500">Track and manage your scheduled visits and requests.</p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100"
        >
          <Plus size={20} />
          Book New Visit
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="px-6 py-4 border-b border-slate-50 flex flex-wrap items-center gap-2">
          {['ALL', 'PENDING_APPROVAL', 'SCHEDULED', 'COMPLETED', 'REJECTED'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === f 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="divide-y divide-slate-50">
          {filteredAppointments.length > 0 ? filteredAppointments.map(appt => {
            const pet = pets.find(p => p.id === appt.petId);
            return (
              <div key={appt.id} className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 hover:bg-slate-50/50 transition-colors">
                <div className="flex-1 flex items-start gap-5">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-sm">
                    {pet?.image ? (
                      <img src={pet.image} className="w-full h-full object-cover" alt="Pet" />
                    ) : (
                      <Calendar className="w-full h-full p-3 text-slate-300" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900">{appt.reason}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${getStatusStyle(appt.status)}`}>
                        {appt.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">Patient: <span className="font-bold text-indigo-600">{pet?.name || 'Unknown'}</span></p>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Calendar size={14} className="text-indigo-400" /> {appt.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Clock size={14} className="text-indigo-400" /> {appt.time}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        {appt.type === 'VIRTUAL' ? <Video size={14} className="text-indigo-400" /> : <MapPin size={14} className="text-indigo-400" />}
                        {appt.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:self-center">
                  {appt.status === 'SCHEDULED' && appt.type === 'VIRTUAL' && (
                    <button 
                      onClick={() => navigate('/consultations')}
                      className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
                    >
                      <Video size={14} /> Join Now
                    </button>
                  )}
                  {appt.status === 'PENDING_APPROVAL' && (
                    <button 
                      onClick={() => deleteAppointment(appt.id)}
                      className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      title="Cancel Request"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                  <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
              </div>
            );
          }) : (
            <div className="p-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="text-slate-200" size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No appointments found</h3>
              <p className="text-slate-500 max-w-sm mx-auto mb-8">It looks like you don't have any appointments matching this filter.</p>
              <button 
                onClick={() => setFilter('ALL')}
                className="text-indigo-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsView;
