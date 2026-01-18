
import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Settings, 
  Shield, 
  Bell, 
  Globe, 
  Languages, 
  CreditCard, 
  Mail, 
  Save, 
  Loader2, 
  CheckCircle2, 
  Lock,
  Smartphone,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useTranslation } from '../App';
import { Language } from '../translations';

type SettingsTab = 'profile' | 'organization' | 'preferences' | 'security' | 'notifications';

const SettingsPage: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form States
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@propmanage.com',
    phone: '+1 (555) 123-4567',
    avatar: ''
  });

  const [org, setOrg] = useState({
    name: 'PropManage Solutions Inc.',
    taxId: 'TX-9922883',
    address: '101 Innovation Dr, Suite 500',
    city: 'San Francisco, CA 94105'
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const navItems = [
    { id: 'profile', label: t.settings.profile, icon: User },
    { id: 'organization', label: t.settings.organization, icon: Building2 },
    { id: 'preferences', label: t.settings.preferences, icon: Settings },
    { id: 'security', label: t.settings.security, icon: Shield },
    { id: 'notifications', label: t.settings.notifications, icon: Bell },
  ];

  const inputClasses = "w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-semibold text-slate-800 placeholder:text-slate-300 bg-white";
  const labelClasses = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">{t.settings.title}</h2>
          <p className="text-slate-500 mt-1 font-medium italic">{t.settings.subtitle}</p>
        </div>
        
        <div className="flex items-center gap-3">
          {showSuccess && (
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 animate-in fade-in zoom-in-95 duration-300">
              <CheckCircle2 size={16} />
              <span className="text-xs font-black uppercase tracking-widest">Saved Successfully</span>
            </div>
          )}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            {t.settings.save}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-4 overflow-hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as SettingsTab)}
                  className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                      : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-blue-600' : 'bg-slate-100 group-hover:bg-slate-200'}`}>
                    <Icon size={18} />
                  </div>
                  <span className="text-sm font-black tracking-tight">{item.label}</span>
                  {isActive && <ChevronRight size={16} className="ml-auto opacity-50" />}
                </button>
              );
            })}
          </div>

          <button className="w-full flex items-center gap-3 px-8 py-5 text-rose-500 font-black text-xs uppercase tracking-widest hover:bg-rose-50 rounded-2xl transition-all mt-4">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>

        {/* Form Content Area */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 p-10 overflow-hidden relative">
            
            {/* Tab: Profile */}
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-blue-200">
                    JD
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-slate-900">Personal Identity</h3>
                    <div className="flex gap-2">
                      <button className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Upload Photo</button>
                      <button className="px-4 py-1.5 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg">Remove</button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-50">
                  <div className="space-y-1">
                    <label className={labelClasses}>First Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                      <input 
                        type="text" 
                        className={inputClasses} 
                        value={profile.firstName} 
                        onChange={e => setProfile({...profile, firstName: e.target.value})} 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className={labelClasses}>Last Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                      <input 
                        type="text" 
                        className={inputClasses} 
                        value={profile.lastName} 
                        onChange={e => setProfile({...profile, lastName: e.target.value})} 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className={labelClasses}>Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                      <input 
                        type="email" 
                        className={inputClasses} 
                        value={profile.email} 
                        onChange={e => setProfile({...profile, email: e.target.value})} 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className={labelClasses}>Phone Number</label>
                    <div className="relative group">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                      <input 
                        type="tel" 
                        className={inputClasses} 
                        value={profile.phone} 
                        onChange={e => setProfile({...profile, phone: e.target.value})} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Organization */}
            {activeTab === 'organization' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                    <Building2 size={24} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Organization Settings</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-50">
                  <div className="space-y-1 md:col-span-2">
                    <label className={labelClasses}>Registered Company Name</label>
                    <div className="relative group">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                      <input 
                        type="text" 
                        className={inputClasses} 
                        value={org.name} 
                        onChange={e => setOrg({...org, name: e.target.value})} 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className={labelClasses}>Tax Identification (EIN/VAT)</label>
                    <div className="relative group">
                      <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                      <input 
                        type="text" 
                        className={inputClasses} 
                        value={org.taxId} 
                        onChange={e => setOrg({...org, taxId: e.target.value})} 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className={labelClasses}>Corporate HQ City</label>
                    <div className="relative group">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                      <input 
                        type="text" 
                        className={inputClasses} 
                        value={org.city} 
                        onChange={e => setOrg({...org, city: e.target.value})} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Preferences */}
            {activeTab === 'preferences' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                    <Languages size={24} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Localization & Visuals</h3>
                </div>

                <div className="space-y-8 pt-4 border-t border-slate-50">
                  <div className="space-y-3">
                    <label className={labelClasses}>{t.settings.language}</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { code: 'en-GB', label: 'English', flag: '🇬🇧' },
                        { code: 'pt-PT', label: 'Português', flag: '🇵🇹' },
                        { code: 'es-ES', label: 'Español', flag: '🇪🇸' }
                      ].map((loc) => (
                        <button
                          key={loc.code}
                          onClick={() => setLanguage(loc.code as Language)}
                          className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all font-bold ${
                            language === loc.code 
                              ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-md' 
                              : 'border-slate-100 text-slate-400 hover:border-slate-200'
                          }`}
                        >
                          <span className="text-xl">{loc.flag}</span>
                          <span className="text-xs uppercase tracking-widest">{loc.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className={labelClasses}>{t.settings.currency}</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['USD ($)', 'EUR (€)', 'GBP (£)', 'BRL (R$)'].map((cur) => (
                        <button
                          key={cur}
                          className={`p-4 rounded-2xl border-2 text-xs font-black uppercase tracking-widest transition-all ${
                            cur.startsWith('USD') 
                              ? 'border-slate-900 bg-slate-900 text-white shadow-lg' 
                              : 'border-slate-100 text-slate-400 hover:border-slate-200'
                          }`}
                        >
                          {cur}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Security */}
            {activeTab === 'security' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
                    <Lock size={24} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Security & Authentication</h3>
                </div>

                <div className="space-y-8 pt-4 border-t border-slate-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <label className={labelClasses}>Update Password</label>
                      <button className="w-full py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-700 font-bold hover:bg-white hover:border-slate-200 transition-all text-sm">
                        Change Security Key
                      </button>
                    </div>
                    <div className="space-y-1">
                      <label className={labelClasses}>Two-Factor Authentication</label>
                      <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">Status: Active</span>
                        <button className="text-[10px] font-black text-emerald-800 underline">Manage</button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Active Sessions</h4>
                    <div className="space-y-3">
                      {[
                        { device: 'MacBook Pro - San Francisco, US', active: 'Current Session' },
                        { device: 'iPhone 15 - San Francisco, US', active: '2 hours ago' }
                      ].map((session, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-slate-200 last:border-0">
                          <div className="flex items-center gap-3">
                            <Smartphone size={16} className="text-slate-400" />
                            <span className="text-sm font-bold text-slate-700">{session.device}</span>
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-tight text-slate-400">{session.active}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                    <Bell size={24} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Communication Alerts</h3>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-50">
                  {[
                    { title: 'New Lease Agreements', desc: 'Notify when a new contract is digitally signed.' },
                    { title: 'Payment Confirmations', desc: 'Alert for successful rental revenue collection.' },
                    { title: 'Maintenance Alerts', desc: 'Critical system warnings for property repairs.' },
                    { title: 'Portfolio AI Insights', desc: 'Weekly strategic summaries generated by Gemini.' }
                  ].map((notif, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all cursor-pointer group">
                      <div className="space-y-0.5">
                        <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{notif.title}</p>
                        <p className="text-xs font-medium text-slate-500">{notif.desc}</p>
                      </div>
                      <div className="w-12 h-6 bg-blue-600 rounded-full relative shadow-inner">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
