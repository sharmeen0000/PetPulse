
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Search, 
  Sparkles, 
  Paperclip, 
  MoreVertical, 
  Phone,
  Video,
  ChevronLeft,
  Circle,
  BrainCircuit,
  MessageSquare,
  History,
  AlertCircle,
  Zap
} from 'lucide-react';
import { User } from '../types';
import { getAIAssistantResponse } from '../services/geminiService';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isAI?: boolean;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  role: string;
  lastMessage: string;
  isAI?: boolean;
}

const Messages: React.FC<{ user: User }> = ({ user }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [inputText, setInputText] = useState('');
  const [aiMode, setAiMode] = useState<'GENERAL' | 'TRIAGE'>('GENERAL');
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    'ai-assistant': [
      { id: '1', senderId: 'ai-assistant', text: "Hello! I'm your PetPulse AI Health Assistant. Are we doing a general wellness check today, or do you have a specific medical concern?", timestamp: new Date(), isAI: true }
    ],
    'v1': [
      { id: '1', senderId: 'v1', text: "Hi John, how is Buddy doing after the medication?", timestamp: new Date(Date.now() - 3600000) }
    ]
  });
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const contacts: Contact[] = [
    { id: 'ai-assistant', name: 'PetPulse AI Assistant', avatar: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png', status: 'online', role: 'Advanced AI Health Bot', lastMessage: 'Ask me anything about pet health...', isAI: true },
    { id: 'v1', name: 'Dr. Sarah Smith', avatar: 'https://picsum.photos/id/65/100/100', status: 'online', role: 'Veterinarian', lastMessage: 'Hi John, how is Buddy doing...' },
    { id: 'v2', name: 'Dr. Mike Ross', avatar: 'https://picsum.photos/id/66/100/100', status: 'offline', role: 'Veterinarian', lastMessage: 'The labs look great!' },
  ];

  useEffect(() => {
    if (!selectedContact) setSelectedContact(contacts[0]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedContact]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || !selectedContact) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      text: inputText,
      timestamp: new Date()
    };

    const contactId = selectedContact.id;
    setMessages(prev => ({
      ...prev,
      [contactId]: [...(prev[contactId] || []), newMessage]
    }));
    
    const sentText = inputText;
    setInputText('');

    if (selectedContact.isAI) {
      setIsLoading(true);
      const aiResponse = await getAIAssistantResponse([], sentText, aiMode);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: 'ai-assistant',
        text: aiResponse || "I'm sorry, I couldn't process that request.",
        timestamp: new Date(),
        isAI: true
      };

      setMessages(prev => ({
        ...prev,
        [contactId]: [...(prev[contactId] || []), aiMessage]
      }));
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Sidebar */}
      <div className={`w-full md:w-80 border-r border-slate-50 flex flex-col bg-slate-50/20 ${selectedContact ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-6">
          <h2 className="text-xl font-outfit font-bold text-slate-900 mb-4">Communication</h2>
          
          {/* AI Prominent Button */}
          <button 
            onClick={() => setSelectedContact(contacts[0])}
            className={`w-full mb-6 p-4 rounded-2xl border-2 transition-all group flex items-center gap-3 relative overflow-hidden ${
              selectedContact?.id === 'ai-assistant' 
                ? 'bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-100' 
                : 'bg-white border-indigo-100 hover:border-indigo-400'
            }`}
          >
            <div className={`p-2 rounded-xl ${selectedContact?.id === 'ai-assistant' ? 'bg-white/20' : 'bg-indigo-50'}`}>
              <BrainCircuit className={selectedContact?.id === 'ai-assistant' ? 'text-white' : 'text-indigo-600'} size={24} />
            </div>
            <div className="text-left z-10">
              <p className={`font-bold text-sm ${selectedContact?.id === 'ai-assistant' ? 'text-white' : 'text-slate-900'}`}>AI Health Bot</p>
              <p className={`text-[10px] ${selectedContact?.id === 'ai-assistant' ? 'text-indigo-100' : 'text-slate-400'}`}>Start AI Consultation</p>
            </div>
            {selectedContact?.id === 'ai-assistant' && (
              <Zap className="absolute -right-2 -bottom-2 text-white/10 w-16 h-16 rotate-12" />
            )}
          </button>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-indigo-500" 
              placeholder="Search chats..." 
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Veterinarians</p>
          <div className="space-y-1">
            {contacts.filter(c => !c.isAI).map(contact => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  selectedContact?.id === contact.id ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="relative">
                  <img src={contact.avatar} className="w-10 h-10 rounded-full object-cover border" alt={contact.name} />
                  <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                    contact.status === 'online' ? 'bg-green-500' : 'bg-slate-300'
                  }`}></div>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-bold text-sm truncate">{contact.name}</p>
                  <p className="text-[10px] opacity-70 truncate">{contact.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col ${!selectedContact ? 'hidden md:flex items-center justify-center bg-slate-50/30' : 'flex'}`}>
        {!selectedContact ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <MessageSquare size={32} />
            </div>
            <p className="text-slate-400 font-medium">Select a conversation</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className={`px-6 py-4 border-b border-slate-50 flex items-center justify-between sticky top-0 z-10 ${
              selectedContact.isAI ? 'bg-indigo-600 text-white' : 'bg-white'
            }`}>
              <div className="flex items-center gap-3">
                <button onClick={() => setSelectedContact(null)} className={`md:hidden p-1 ${selectedContact.isAI ? 'text-white' : 'text-slate-400'}`}>
                  <ChevronLeft />
                </button>
                <div className="relative">
                  <img src={selectedContact.avatar} className="w-10 h-10 rounded-full object-cover border-2 border-white/20" alt={selectedContact.name} />
                  {selectedContact.isAI && (
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                      <Sparkles size={10} className="text-indigo-600" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold leading-tight flex items-center gap-1">
                    {selectedContact.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className={`text-[10px] ${selectedContact.isAI ? 'text-indigo-100' : 'text-slate-500'}`}>
                      {selectedContact.role}
                    </p>
                    {selectedContact.isAI && (
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-bold text-green-300">SYSTEM ACTIVE</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!selectedContact.isAI ? (
                  <>
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-all"><Phone size={20} /></button>
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-all"><Video size={20} /></button>
                  </>
                ) : (
                  <div className="flex bg-white/10 rounded-xl p-1">
                    <button 
                      onClick={() => setAiMode('GENERAL')}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${aiMode === 'GENERAL' ? 'bg-white text-indigo-600 shadow-sm' : 'text-indigo-100 hover:bg-white/5'}`}
                    >
                      GENERAL
                    </button>
                    <button 
                      onClick={() => setAiMode('TRIAGE')}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${aiMode === 'TRIAGE' ? 'bg-white text-indigo-600 shadow-sm' : 'text-indigo-100 hover:bg-white/5'}`}
                    >
                      TRIAGE
                    </button>
                  </div>
                )}
                <button className={`p-2 rounded-lg transition-all ${selectedContact.isAI ? 'text-white/60 hover:text-white' : 'text-slate-400 hover:text-indigo-600'}`}>
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages Content */}
            <div className={`flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar relative ${
              selectedContact.isAI ? 'bg-indigo-50/30' : 'bg-slate-50/30'
            }`}>
              {/* Subtle background pattern for AI */}
              {selectedContact.isAI && (
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex flex-wrap gap-12 p-8 overflow-hidden">
                  {Array.from({length: 40}).map((_, i) => <Zap key={i} size={48} className="rotate-12" />)}
                </div>
              )}

              {messages[selectedContact.id]?.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'} relative z-10`}
                >
                  <div className={`max-w-[80%] md:max-w-[70%] group`}>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm transition-all ${
                      msg.senderId === user.id 
                        ? 'bg-indigo-600 text-white rounded-br-none' 
                        : msg.isAI 
                          ? 'bg-gradient-to-br from-indigo-700 to-indigo-900 text-white border-2 border-indigo-400 shadow-indigo-200/50 rounded-bl-none' 
                          : 'bg-white border border-slate-100 text-slate-800 rounded-bl-none'
                    }`}>
                      {msg.isAI && (
                        <div className="flex items-center gap-1.5 text-[9px] font-black text-indigo-300 uppercase tracking-[0.2em] mb-2">
                          <BrainCircuit size={12} />
                          PETPULSE INTELLIGENCE
                        </div>
                      )}
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                    </div>
                    <p className={`text-[10px] mt-1 text-slate-400 font-medium flex items-center gap-1 ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {msg.senderId === user.id && <Circle size={4} className="fill-indigo-500 text-indigo-500" />}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start relative z-10">
                  <div className="bg-indigo-800 p-4 rounded-2xl rounded-bl-none flex flex-col gap-2 shadow-lg border border-indigo-500/30">
                     <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                          <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                        <span className="text-[10px] font-bold text-indigo-300 uppercase">Consulting Database...</span>
                     </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions Footer */}
            {selectedContact.isAI && !isLoading && (
              <div className="px-6 py-3 flex gap-2 overflow-x-auto bg-white border-t border-slate-50 no-scrollbar">
                {(aiMode === 'GENERAL' 
                  ? ['Dietary Advice', 'Common Behaviors', 'Vaccine Info', 'Exercise Needs'] 
                  : ['Emergency Signs', 'Lethargy Check', 'Appetite Loss', 'Skin Irritation']
                ).map(chip => (
                  <button 
                    key={chip}
                    onClick={() => setInputText(chip)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-bold text-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all active:scale-95"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input Component */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-50">
              <div className={`flex items-center gap-3 border-2 rounded-2xl p-2 transition-all focus-within:shadow-xl ${
                selectedContact.isAI ? 'border-indigo-100 focus-within:border-indigo-600' : 'border-slate-100 focus-within:border-indigo-400'
              }`}>
                <button type="button" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                  <Paperclip size={20} />
                </button>
                <input 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400 px-2"
                  placeholder={selectedContact.isAI ? `How can AI help with ${aiMode === 'TRIAGE' ? 'medical concerns' : 'pet care'}?` : "Type a message..."}
                />
                <button 
                  type="submit" 
                  disabled={!inputText.trim() || isLoading}
                  className={`p-3 rounded-xl transition-all ${
                    inputText.trim() && !isLoading 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-100' 
                      : 'bg-slate-100 text-slate-300 scale-95 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
              {selectedContact.isAI && (
                <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-slate-400 font-medium">
                  <div className="flex items-center gap-1"><AlertCircle size={10} /> AI Advice disclaimer applies</div>
                  <div className="flex items-center gap-1"><History size={10} /> Contextual memory enabled</div>
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;
