
import React, { useState } from 'react';
import { Video, Mic, MicOff, VideoOff, PhoneOff, Settings, Maximize, MessageSquare, Shield, Calendar, Clock, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const Consultations: React.FC = () => {
  const navigate = useNavigate();
  const { appointments, pets } = useApp();
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeCall, setActiveCall] = useState<any>(null);

  const availableCalls = appointments.filter(a => a.status === 'SCHEDULED' && a.type === 'VIRTUAL');

  if (!isJoined) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-outfit font-bold text-slate-900">Video Consultations</h1>
            <p className="text-slate-500">Secure telemedicine room for your scheduled vet visits.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-bold text-slate-800 px-1">Upcoming Sessions</h3>
            <div className="grid gap-4">
              {availableCalls.length > 0 ? availableCalls.map(call => {
                const pet = pets.find(p => p.id === call.petId);
                return (
                  <div key={call.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold overflow-hidden border">
                        {pet?.image ? <img src={pet.image} className="w-full h-full object-cover" /> : <Video />}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{call.reason}</h4>
                        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mt-1">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {call.date}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {call.time}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setActiveCall(call);
                        setIsJoined(true);
                      }}
                      className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
                    >
                      Join Room <ChevronRight size={14} />
                    </button>
                  </div>
                );
              }) : (
                <div className="p-16 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="text-slate-200" />
                  </div>
                  <p className="text-slate-400 font-medium">No active scheduled consultations.</p>
                  <p className="text-xs text-slate-300 mt-1">Book an appointment to start a virtual visit.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col items-center text-center justify-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-indigo-900/40">
              <Shield className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tele-Health Privacy</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">All consultations are end-to-end encrypted and comply with pet healthcare security standards.</p>
            <div className="flex gap-2">
              <div className="p-2 bg-white/5 rounded-lg text-indigo-400"><Video size={16} /></div>
              <div className="p-2 bg-white/5 rounded-lg text-indigo-400"><Mic size={16} /></div>
              <div className="p-2 bg-white/5 rounded-lg text-indigo-400"><Shield size={16} /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl">
      <div className="flex-1 relative bg-black">
        {/* Main Remote Video Simulation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-80" alt="Doctor" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-8 left-8 flex items-center gap-3 bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <Shield className="text-green-400" size={16} />
            <p className="text-xs font-bold text-white uppercase tracking-widest">Secure Room: {activeCall?.id.slice(-6)}</p>
          </div>
        </div>

        {/* Local Video Simulation */}
        <div className="absolute bottom-8 right-8 w-48 h-64 bg-slate-800 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
          {!isVideoOff ? (
            <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover" alt="Me" />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-600"><VideoOff /></div>
          )}
          <div className="absolute bottom-3 left-3 bg-black/50 px-2 py-1 rounded-md text-[10px] text-white">You (Pet Owner)</div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 md:gap-6 px-4 py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl w-[90%] md:w-auto justify-center max-w-lg">
          <button onClick={() => setIsMuted(!isMuted)} className={`p-3 rounded-xl transition-all ${isMuted ? 'bg-red-500 text-white' : 'text-white hover:bg-white/10'}`}>
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <button onClick={() => setIsVideoOff(!isVideoOff)} className={`p-3 rounded-xl transition-all ${isVideoOff ? 'bg-red-500 text-white' : 'text-white hover:bg-white/10'}`}>
            {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
          </button>
          <button onClick={() => setIsJoined(false)} className="p-4 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-900/20">
            <PhoneOff size={24} />
          </button>
          <button className="p-3 text-white hover:bg-white/10 rounded-xl hidden sm:block"><MessageSquare size={20} /></button>
          <button className="p-3 text-white hover:bg-white/10 rounded-xl hidden sm:block"><Settings size={20} /></button>

          <button className="p-3 text-white hover:bg-white/10 rounded-xl sm:hidden"><MoreHorizontal size={20} /></button>
        </div>

        {/* User Info Overlay */}
        <div className="absolute top-8 right-8 text-right">
          <h3 className="text-white font-bold">Dr. Sarah Smith</h3>
          <p className="text-indigo-300 text-xs">PetPulse Certified Veterinarian</p>
        </div>
      </div>
    </div>
  );
};

export default Consultations;
