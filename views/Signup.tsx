
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, CheckCircle2, AlertCircle, ArrowRight, Dog, User, Stethoscope, ChevronRight } from 'lucide-react';
import { useApp } from '../App';
import { UserRole } from '../types';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const { register } = useApp();
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<UserRole>(UserRole.CUSTOMER);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            register({
                name: formData.name,
                email: formData.email,
                role: role,
                avatar: '' // App.tsx will handle avatar generation
            });
            navigate('/');
        }, 1500);
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-blob" />
                <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
            </div>

            <div className="w-full max-w-lg z-10 p-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">

                    <div className="text-center mb-10">
                        <Link to="/" className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg shadow-purple-500/30 mb-6 group hover:scale-105 transition-transform duration-300">
                            <Dog className="text-white w-8 h-8 group-hover:-rotate-12 transition-transform" />
                        </Link>
                        <h1 className="text-3xl font-outfit font-bold text-white mb-2">Join PetPulse</h1>
                        <p className="text-purple-200 text-sm">Create your intelligent pet care account</p>
                    </div>

                    {step === 1 ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                            <p className="text-white font-bold text-center mb-4">I am a...</p>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setRole(UserRole.CUSTOMER)}
                                    className={`p-6 rounded-3xl border-2 transition-all group relative overflow-hidden ${role === UserRole.CUSTOMER
                                        ? 'bg-gradient-to-br from-indigo-600 to-indigo-800 border-transparent shadow-xl'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${role === UserRole.CUSTOMER ? 'bg-white/20' : 'bg-white/10'}`}>
                                        <User className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-white font-bold mb-1">Pet Owner</h3>
                                    <p className="text-indigo-200 text-xs">Managing my pets</p>
                                    {role === UserRole.CUSTOMER && <div className="absolute top-4 right-4 text-white"><CheckCircle2 size={16} /></div>}
                                </button>

                                <button
                                    onClick={() => setRole(UserRole.VETERINARIAN)}
                                    className={`p-6 rounded-3xl border-2 transition-all group relative overflow-hidden ${role === UserRole.VETERINARIAN
                                        ? 'bg-gradient-to-br from-emerald-600 to-emerald-800 border-transparent shadow-xl'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${role === UserRole.VETERINARIAN ? 'bg-white/20' : 'bg-white/10'}`}>
                                        <Stethoscope className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-white font-bold mb-1">Veterinarian</h3>
                                    <p className="text-emerald-200 text-xs">Providing care</p>
                                    {role === UserRole.VETERINARIAN && <div className="absolute top-4 right-4 text-white"><CheckCircle2 size={16} /></div>}
                                </button>
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                className="w-full mt-8 bg-white text-slate-900 font-bold py-4 rounded-2xl shadow-lg hover:bg-indigo-50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                Continue <ChevronRight size={20} />
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSignup} className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-purple-200 uppercase tracking-widest ml-1">Full Name</label>
                                <input
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/30 outline-none focus:bg-white/10 focus:border-purple-500/50 transition-all font-medium"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-purple-200 uppercase tracking-widest ml-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/30 outline-none focus:bg-white/10 focus:border-purple-500/50 transition-all font-medium"
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-purple-200 uppercase tracking-widest ml-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/30 outline-none focus:bg-white/10 focus:border-purple-500/50 transition-all font-medium"
                                    placeholder="Create a strong password"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="px-6 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Creating Account...' : 'Complete Signup'}
                                    {!isLoading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-purple-200 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-white font-bold hover:underline decoration-purple-500 underline-offset-4">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
