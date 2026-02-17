
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, CheckCircle2, AlertCircle, ArrowRight, Dog, PawPrint } from 'lucide-react';
import { useApp } from '../App';
import { UserRole } from '../types';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useApp();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            if (email === 'admin@petpulse.com' && password === 'admin') {
                login(UserRole.ADMIN);
                navigate('/');
            } else if (email.includes('@petpulse.vet')) {
                login(UserRole.VETERINARIAN);
                navigate('/');
            } else if (email) {
                login(UserRole.CUSTOMER);
                navigate('/');
            } else {
                setError('Invalid credentials');
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-blob" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
                <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-blue-600/20 rounded-full blur-[120px] animate-blob animation-delay-4000" />
            </div>

            <div className="w-full max-w-md z-10 p-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />

                    <div className="text-center mb-10">
                        <Link to="/" className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg shadow-indigo-500/30 mb-6 group hover:scale-105 transition-transform duration-300">
                            <Dog className="text-white w-8 h-8 group-hover:rotate-12 transition-transform" />
                        </Link>
                        <h1 className="text-3xl font-outfit font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-indigo-200 text-sm">Sign in to manage your pet's health journey</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-indigo-200 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 group-focus-within:text-white transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 outline-none focus:bg-white/10 focus:border-indigo-500/50 transition-all font-medium"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Password</label>
                                <a href="#" className="text-xs text-indigo-300 hover:text-white transition-colors">Forgot Password?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 group-focus-within:text-white transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 outline-none focus:bg-white/10 focus:border-indigo-500/50 transition-all font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-200 text-sm animate-in fade-in slide-in-from-top-2">
                                <AlertCircle size={16} className="shrink-0" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-indigo-200 text-sm">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-white font-bold hover:underline decoration-indigo-500 underline-offset-4">
                                Create Account
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10">
                        <p className="text-[10px] text-center text-indigo-300/50 uppercase tracking-widest mb-4">Or continue with</p>
                        <div className="flex gap-4 justify-center">
                            <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:scale-105">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" className="w-5 h-5" alt="Google" />
                            </button>
                            <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:scale-105">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" className="w-5 h-5 invert" alt="Apple" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6 text-slate-500 text-xs">
                    <p>&copy; 2024 PetPulse AI. Protected by reCAPTCHA.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
