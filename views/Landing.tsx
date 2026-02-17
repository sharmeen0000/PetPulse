
import React from 'react';
import { Dog, ShieldCheck, Stethoscope, Video, Heart, Zap, ChevronRight } from 'lucide-react';
import { UserRole } from '../types';
import { Link } from 'react-router-dom';

interface LandingProps {
  onLogin: (role: UserRole) => void;
}

const Landing: React.FC<LandingProps> = ({ onLogin }) => {
  return (
    <div className="bg-white min-h-screen flex flex-col relative">
      {/* Navigation Header */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Dog className="text-white w-6 h-6" />
          </div>
          <span className="font-outfit font-bold text-xl text-slate-900 tracking-tight">PetPulse</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors hidden sm:block">
            Sign In
          </Link>
          <Link to="/signup" className="px-5 py-2.5 bg-indigo-600 text-white rounded-full text-sm font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-32 overflow-hidden px-4 md:px-0">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 text-center lg:text-left z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold mb-8 border border-indigo-100 shadow-sm">
                <Zap size={16} className="fill-indigo-700" />
                <span>AI-Powered Veterinary Care</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-outfit font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
                Next-Gen Care for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Furry Friends.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                PetPulse combines cutting-edge AI diagnostics with real-time veterinary expertise to provide 24/7 healthcare monitoring for your beloved pets.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/signup"
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-1"
                >
                  Start as Owner
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-100 rounded-xl font-bold text-lg hover:bg-indigo-50 hover:border-indigo-200 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 flex items-center justify-center"
                >
                  Join as Vet
                </Link>
              </div>

              <div className="mt-14 flex items-center justify-center lg:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <img src="https://picsum.photos/id/1/100/40?grayscale" alt="Partner" className="h-8 md:h-10 object-contain hover:opacity-100 transition-opacity" />
                <img src="https://picsum.photos/id/2/100/40?grayscale" alt="Partner" className="h-8 md:h-10 object-contain hover:opacity-100 transition-opacity" />
                <img src="https://picsum.photos/id/3/100/40?grayscale" alt="Partner" className="h-8 md:h-10 object-contain hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="lg:w-1/2 relative w-full max-w-lg lg:max-w-none mx-auto lg:mx-0">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-200/50 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-pink-200/50 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white transform hover:scale-[1.01] transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800"
                  alt="Happy Pets"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="absolute bottom-8 -left-4 md:-left-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 animate-bounce duration-[3000ms] border border-white/50">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
                  <Heart className="text-green-600 fill-green-600" size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Monthly Wellness</p>
                  <p className="font-outfit font-bold text-slate-900 text-lg">100% Health Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-slate-900 mb-6">Everything Your Pet Needs</h2>
            <p className="text-lg text-slate-600 leading-relaxed">Our all-in-one platform handles everything from routine checkups to emergency AI triage, giving you peace of mind.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
            <FeatureCard
              icon={<Video className="text-white" size={28} />}
              color="bg-indigo-600"
              title="Virtual Consults"
              desc="Instant high-definition video calls with verified veterinarians from anywhere in the world. No waiting rooms."
            />
            <FeatureCard
              icon={<Zap className="text-white" size={28} />}
              color="bg-amber-500"
              title="AI Symptom Checker"
              desc="Proprietary Gemini AI engine analyzes symptoms instantly to provide triage advice before you see a vet."
            />
            <FeatureCard
              icon={<ShieldCheck className="text-white" size={28} />}
              color="bg-emerald-600"
              title="Medical Records"
              desc="Blockchain-secured history of your pet's vaccines, surgeries, and treatments, accessible anywhere."
            />
          </div>
        </div>
      </section>

      {/* Admin Quick Entry */}
      <footer className="py-12 border-t bg-white mt-auto">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <Dog className="text-white w-5 h-5" />
            </div>
            <span className="font-outfit font-bold text-xl text-slate-900">PetPulse AI</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact Support</a>
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Staff Portal
            </Link>
          </div>
          <div className="text-slate-400 text-sm">
            © 2024 PetPulse AI Inc.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, color: string, title: string, desc: string }> = ({ icon, color, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 group">
    <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold font-outfit text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

export default Landing;
