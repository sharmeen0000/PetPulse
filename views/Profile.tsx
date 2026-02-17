
import React from 'react';
import { useApp } from '../App';
import { Mail, User as UserIcon, Shield, Camera, Bell, Lock } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useApp();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-outfit font-bold text-slate-900">Profile Settings</h1>
        <p className="text-slate-500">Manage your account preferences and secure your data.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
            <div className="relative inline-block mb-4">
              <img src={user.avatar} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" alt="Profile" />
              <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full border-2 border-white hover:bg-indigo-700 transition-colors">
                <Camera size={16} />
              </button>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
            <p className="text-sm text-slate-500 mb-6">{user.role}</p>
            <div className="flex gap-2 justify-center">
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase">Active Member</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
             <h4 className="font-bold text-slate-800 mb-4">Security Strength</h4>
             <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-2">
                    <span>Password Health</span>
                    <span>Excellent</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[90%]" />
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-xl text-xs font-medium border border-blue-100">
                  <Shield size={16} />
                  2FA is currently enabled
                </div>
             </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Personal Information</h3>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" defaultValue={user.name} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" defaultValue={user.email} />
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all active:scale-95">Save Changes</button>
            </form>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6">System Preferences</h3>
            <div className="space-y-4">
              <PreferenceToggle icon={<Bell />} title="Email Notifications" desc="Get updates about appointments via email" active={true} />
              <PreferenceToggle icon={<Lock />} title="Privacy Mode" desc="Hide profile from public search results" active={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PreferenceToggle: React.FC<{ icon: React.ReactNode, title: string, desc: string, active: boolean }> = ({ icon, title, desc, active }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-white rounded-lg shadow-sm text-slate-400">{icon}</div>
      <div>
        <p className="font-bold text-slate-800 text-sm">{title}</p>
        <p className="text-[10px] text-slate-500">{desc}</p>
      </div>
    </div>
    <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${active ? 'bg-indigo-600' : 'bg-slate-300'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-7' : 'left-1'}`} />
    </div>
  </div>
);

export default Profile;
