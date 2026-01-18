
import React, { useState, useEffect } from 'react';
import { 
  Info, 
  ShieldCheck, 
  Zap, 
  BookOpen, 
  Terminal, 
  Cpu, 
  Globe, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  HelpCircle,
  FileText,
  Activity
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const InfoPage: React.FC = () => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [uptime] = useState('99.98%');

  useEffect(() => {
    generateInsight();
  }, []);

  const generateInsight = async () => {
    setLoadingInsight(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Provide one sophisticated, high-level tip for property managers regarding tenant retention or asset optimization. Keep it under 30 words and sound professional.",
      });
      setInsight(response.text || "Prioritize preventive maintenance and transparent communication to foster long-term tenant trust and stabilize asset valuation.");
    } catch (e) {
      setInsight("Leverage real-time data analytics to anticipate market shifts and optimize rental yield across your portfolio.");
    } finally {
      setLoadingInsight(false);
    }
  };

  const ResourceCard = ({ icon: Icon, title, desc, tag }: any) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div className="p-4 bg-slate-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
          <Icon size={24} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 px-3 py-1 rounded-lg">
          {tag}
        </span>
      </div>
      <h4 className="text-xl font-black text-slate-900 tracking-tight mb-2">{title}</h4>
      <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{desc}</p>
      <button className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest group-hover:gap-3 transition-all">
        Open Guide <ArrowUpRight size={14} />
      </button>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Hero / System Status Header */}
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Activity size={240} />
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest">All Systems Operational</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight leading-none">Nest OS Knowledge Hub</h2>
            <p className="text-slate-400 font-medium max-w-lg leading-relaxed">
              Explore platform documentation, system specifications, and AI-driven management strategies for the modern real estate enterprise.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 shrink-0">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem]">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">API Latency</p>
              <p className="text-2xl font-black text-blue-400">14ms</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem]">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">System Uptime</p>
              <p className="text-2xl font-black text-blue-400">{uptime}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          
          {/* AI Intelligence Section */}
          <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-xl shadow-blue-200 group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
              <Sparkles size={160} />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-2xl border border-white/30">
                  <Cpu size={24} />
                </div>
                <div>
                  <h4 className="font-black text-lg tracking-tight">Daily Management Insight</h4>
                  <p className="text-xs text-blue-200 uppercase font-black tracking-widest">Powered by Gemini 3 Flash</p>
                </div>
              </div>
              
              <div className="bg-white/10 border border-white/20 rounded-[2rem] p-8 min-h-[120px] flex items-center justify-center">
                {loadingInsight ? (
                  <div className="flex items-center gap-3">
                    <Loader2 size={24} className="animate-spin text-blue-200" />
                    <span className="text-xs font-black uppercase tracking-widest opacity-60">Synchronizing...</span>
                  </div>
                ) : (
                  <p className="text-xl font-bold italic text-center leading-relaxed">
                    "{insight}"
                  </p>
                )}
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={generateInsight}
                  className="text-xs font-black uppercase tracking-widest text-blue-100 hover:text-white transition-colors flex items-center gap-2"
                >
                  Regenerate Strategy <Zap size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ResourceCard 
              icon={ShieldCheck} 
              title="Onboarding Protocols" 
              desc="Standard operating procedures for resident verification and digital lease execution." 
              tag="Legal" 
            />
            <ResourceCard 
              icon={Globe} 
              title="Global Portfolio Sync" 
              desc="Managing multi-region assets through a unified real-time dashboard interface." 
              tag="Scale" 
            />
            <ResourceCard 
              icon={Terminal} 
              title="API Integration" 
              desc="Technical documentation for connecting third-party smart home and billing services." 
              tag="Dev" 
            />
            <ResourceCard 
              icon={BookOpen} 
              title="Management Theory" 
              desc="Educational whitepapers on optimizing rental yields and minimizing asset vacancy." 
              tag="EDU" 
            />
          </div>
        </div>

        {/* Sidebar / Changelog */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100">
                <Clock size={20} />
              </div>
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Version History</h4>
            </div>

            <div className="space-y-10 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
              {[
                { version: 'v2.4.0', title: 'Gemini 3 Integration', date: 'Oct 2024', current: true },
                { version: 'v2.3.1', title: 'Dynamic Breadcrumbs', date: 'Sep 2024', current: false },
                { version: 'v2.2.0', title: 'Tenant Smart-Fill', date: 'Aug 2024', current: false }
              ].map((update, idx) => (
                <div key={idx} className="relative pl-12">
                  <div className={`absolute left-0 top-0 w-10 h-10 rounded-xl flex items-center justify-center border-4 border-white shadow-sm transition-all ${
                    update.current ? 'bg-blue-600 text-white scale-110' : 'bg-slate-100 text-slate-400'
                  }`}>
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{update.version}</span>
                      {update.current && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[8px] font-black rounded-md">LATEST</span>}
                    </div>
                    <h5 className="font-black text-slate-900 leading-tight">{update.title}</h5>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{update.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle size={16} className="text-slate-400" />
                <h5 className="text-xs font-black text-slate-900 uppercase tracking-widest">Support Access</h5>
              </div>
              <p className="text-xs font-medium text-slate-500 leading-relaxed">
                Need specialized assistance? Open a priority ticket with our <span className="text-blue-600 font-bold underline">Elite Support</span> team.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm flex items-center gap-4 group cursor-pointer hover:border-blue-200 transition-all">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
              <FileText size={20} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Legal Artifact</p>
              <h5 className="font-black text-slate-900 text-sm">Download Master TOS</h5>
            </div>
            <ArrowUpRight size={18} className="text-slate-300 group-hover:text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
