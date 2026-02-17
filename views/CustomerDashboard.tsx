
import React, { useState } from 'react';
import { Plus, Search, Calendar, Video, Clock, ChevronRight, Activity, BrainCircuit, Dog, X, AlertCircle, CheckCircle2, MoreHorizontal, XCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../App';
import { checkSymptoms } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard: React.FC = () => {
  const { pets, appointments, addPet, addAppointment } = useApp();
  const navigate = useNavigate();

  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [isApptModalOpen, setIsApptModalOpen] = useState(false);

  const [symptoms, setSymptoms] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Form states
  const [newPetName, setNewPetName] = useState('');
  const [newPetSpecies, setNewPetSpecies] = useState('Dog');
  const [bookingReason, setBookingReason] = useState('');
  const [bookingDate, setBookingDate] = useState('2024-06-12');
  const [bookingTime, setBookingTime] = useState('02:00 PM');

  const handleSymptomCheck = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    const petInfo = pets.length > 0
      ? `${pets[0].name} is a ${pets[0].age} year old ${pets[0].breed} ${pets[0].species}.`
      : "A general pet health query.";
    const response = await checkSymptoms(petInfo, symptoms);
    setAiResponse(response);
    setLoading(false);
  };

  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPetName) return;
    addPet({
      name: newPetName,
      species: newPetSpecies,
      breed: 'Mixed',
      age: 1,
      weight: 10,
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200',
      ownerId: 'c1'
    });
    setNewPetName('');
    setIsPetModalOpen(false);
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingReason.trim()) return;

    addAppointment({
      petId: pets[0]?.id || 'p1',
      vetId: 'v1',
      date: bookingDate,
      time: bookingTime,
      type: 'VIRTUAL',
      status: 'PENDING_APPROVAL',
      reason: bookingReason
    });

    setBookingReason('');
    setIsApptModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Banner Action */}
      <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
        <div className="relative z-10">
          <h1 className="text-3xl font-outfit font-bold mb-2">Health care at your fingertips!</h1>
          <p className="text-indigo-100 mb-6 max-w-md text-lg">Schedule a consultation with world-class vets today.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setIsPetModalOpen(true)}
              className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Plus size={20} />
              Add New Pet
            </button>
            <button
              onClick={() => setIsApptModalOpen(true)}
              className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-400 transition-all flex items-center justify-center gap-2 active:scale-95 border border-white/20"
            >
              <Calendar size={20} />
              Book Appointment
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none translate-x-1/4 hidden lg:block">
          <Dog className="w-80 h-80" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Side: Pets & AI */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Your Pet Family</h3>
            <button onClick={() => navigate('/pets')} className="text-sm font-semibold text-indigo-600 hover:underline">View All</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {pets.map(pet => (
              <div key={pet.id} className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow group cursor-pointer">
                <img src={pet.image} className="w-16 h-16 rounded-2xl object-cover border" alt={pet.name} />
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">{pet.name}</h4>
                  <p className="text-sm text-slate-500">{pet.breed}</p>
                </div>
                <ChevronRight className="text-slate-300 group-hover:translate-x-1 transition-transform" />
              </div>
            ))}
          </div>

          {/* AI Symptom Tool */}
          <div className="bg-white rounded-3xl border border-indigo-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><BrainCircuit size={24} /></div>
              <div><h3 className="font-bold text-slate-900">AI Symptom Triage</h3><p className="text-sm text-slate-500">Analyze symptoms instantly</p></div>
            </div>
            {!aiResponse ? (
              <div className="space-y-4">
                <textarea
                  className="w-full h-32 p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none resize-none text-sm"
                  placeholder="Describe your pet's symptoms..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
                <button onClick={handleSymptomCheck} disabled={loading || !symptoms.trim()} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                  {loading ? 'Analyzing...' : 'Check Symptoms'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-indigo-50 rounded-xl text-sm leading-relaxed text-slate-700 border border-indigo-100">
                  <p className="font-bold text-indigo-700 mb-2 uppercase text-[10px] tracking-wider">AI Insight</p>
                  {aiResponse}
                </div>
                <button onClick={() => setAiResponse('')} className="text-xs font-bold text-indigo-600 hover:underline">Clear & New Check</button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Appointment Requests */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Visit Status</h3>
            <span className="text-xs font-bold text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded-full">{appointments.length} Total</span>
          </div>
          <div className="space-y-4">
            {appointments.map(appt => {
              const isPending = appt.status === 'PENDING_APPROVAL';
              const isRejected = appt.status === 'REJECTED';
              return (
                <div key={appt.id} className={`bg-white p-5 rounded-2xl border transition-all ${isPending ? 'border-amber-200 bg-amber-50/20 shadow-amber-50 shadow-lg' : isRejected ? 'border-red-100 bg-red-50/20' : 'border-slate-100 shadow-sm'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isPending ? 'bg-amber-100 text-amber-600' : isRejected ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {isPending ? <Clock size={20} /> : isRejected ? <XCircle size={20} /> : <CheckCircle2 size={20} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm truncate max-w-[120px]">{appt.reason}</h4>
                        <p className={`text-[10px] font-bold uppercase tracking-wider ${isPending ? 'text-amber-600' : isRejected ? 'text-red-600' : 'text-green-600'}`}>
                          {isPending ? 'Waiting for Admin' : isRejected ? 'Booking Declined' : 'Confirmed'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {appt.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {appt.time}</span>
                  </div>
                  {appt.status === 'SCHEDULED' && (
                    <button onClick={() => navigate('/consultations')} className="w-full py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                      <Video size={14} /> Join Consultation
                    </button>
                  )}
                  {isPending && (
                    <div className="flex items-center gap-2 text-[10px] text-amber-700 bg-amber-100/50 p-2 rounded-lg border border-amber-200/50">
                      <AlertCircle size={12} /> Pending Admin Verification
                    </div>
                  )}
                </div>
              );
            })}

            <button onClick={() => setIsApptModalOpen(true)} className="w-full p-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group">
              <Plus size={24} className="group-hover:rotate-90 transition-transform" />
              <p className="text-sm font-bold">New Booking Request</p>
            </button>
          </div>
        </div>
      </div>

      {/* Book Appointment Modal */}
      {isApptModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsApptModalOpen(false)} />
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md relative z-10 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-2 border-b border-transparent">
              <h2 className="text-2xl font-outfit font-bold text-slate-900">Book Visit</h2>
              <button
                onClick={() => setIsApptModalOpen(false)}
                className="p-2 -mr-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleBookAppointment} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Select Companion</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none">
                    {pets.map(p => <option key={p.id}>{p.name}</option>)}
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Visit Reason</label>
                <input
                  required
                  value={bookingReason}
                  onChange={(e) => setBookingReason(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
                  placeholder="e.g. Skin Rash, Annual Checkup..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={e => setBookingDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Time</label>
                  <input
                    type="time"
                    value={bookingTime}
                    onChange={e => setBookingTime(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-600"
                  />
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex gap-3 items-start">
                <ShieldCheck size={18} className="text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-indigo-700 mb-1">Verification Process</p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">Your request will be visible to Vets and Admins. Once approved, you'll receive a confirmation.</p>
                </div>
              </div>
              <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98] flex items-center justify-center gap-2">
                <span>Submit Request</span>
                <ChevronRight size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
