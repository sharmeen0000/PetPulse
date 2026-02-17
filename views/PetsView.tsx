
import React, { useState } from 'react';
import { Plus, Trash2, Edit2, ShieldAlert, Activity, Heart, X, Dog, Info, ChevronRight } from 'lucide-react';
import { useApp } from '../App';

const PetsView: React.FC = () => {
  const { pets, addPet } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    species: 'Dog',
    breed: '',
    age: '',
    weight: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.breed) return;

    addPet({
      ownerId: 'c1',
      name: formData.name,
      species: formData.species,
      breed: formData.breed,
      age: parseInt(formData.age) || 0,
      weight: parseFloat(formData.weight) || 0,
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400'
    });

    setFormData({ name: '', species: 'Dog', breed: '', age: '', weight: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-outfit font-bold text-slate-900">Your Pet Family</h1>
          <p className="text-slate-500">Manage health records and profiles for your companions.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100"
        >
          <Plus size={20} />
          Register New Companion
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.length > 0 ? pets.map(pet => (
          <div key={pet.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="h-48 relative overflow-hidden">
              <img src={pet.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={pet.name} />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-indigo-600 uppercase tracking-widest border border-indigo-100">
                {pet.species}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{pet.name}</h3>
                  <p className="text-sm text-slate-500">{pet.breed}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Edit2 size={16} /></button>
                  <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Age</p>
                  <p className="font-bold text-slate-700">{pet.age} Years</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Weight</p>
                  <p className="font-bold text-slate-700">{pet.weight} kg</p>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full py-2 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all flex items-center justify-center gap-2">
                  <Activity size={14} /> View Health History
                </button>
                <button className="w-full py-2 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all flex items-center justify-center gap-2">
                  <ShieldAlert size={14} /> Emergency Triage
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 bg-white rounded-3xl border border-dashed border-slate-200 flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Dog className="text-slate-200" />
            </div>
            <p className="text-slate-400 font-medium">No pets registered yet.</p>
          </div>
        )}

        <button
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center text-center gap-3 text-slate-400 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group min-h-[400px]"
        >
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Heart className="text-slate-300 group-hover:text-indigo-500" />
          </div>
          <p className="font-bold group-hover:text-indigo-600">Add Another Companion</p>
        </button>
      </div>

      {/* Register Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md relative z-10 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-2 border-b border-transparent">
              <h2 className="text-2xl font-outfit font-bold text-slate-900">Add New Pet</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 -mr-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Pet Name</label>
                <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Buddy, Fluffy..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Species</label>
                  <div className="relative">
                    <select value={formData.species} onChange={e => setFormData({ ...formData, species: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none appearance-none focus:ring-2 focus:ring-indigo-500 transition-all">
                      <option>Dog</option>
                      <option>Cat</option>
                      <option>Bird</option>
                      <option>Rabbit</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <ChevronRight className="rotate-90 w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Breed</label>
                  <input required value={formData.breed} onChange={e => setFormData({ ...formData, breed: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Golden Retriever..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Age (Years)</label>
                  <input type="number" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="3" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Weight (kg)</label>
                  <input type="number" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="12" />
                </div>
              </div>
              <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98] mt-4 flex items-center justify-center gap-2">
                <Plus size={18} /> Register Companion
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetsView;
