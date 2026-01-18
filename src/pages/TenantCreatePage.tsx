
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Save, 
  Loader2,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  User,
  ShieldCheck,
  Info
} from 'lucide-react';
import { type Tenant } from '../types';

const TenantCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Partial<Tenant>>({
    fullName: '',
    email: '',
    phone: '',
    leaseStart: '',
    leaseEnd: '',
    rentAmount: 0,
    status: 'active'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    navigate('/tenants');
  };

  const isFormValid = formData.fullName && formData.email;

  const inputClasses = "w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300 bg-white";
  const labelClasses = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block";

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/tenants')}
            className="p-3 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Onboard New Tenant</h2>
            <p className="text-slate-500 font-medium italic">Setting the stage for a new residential relationship.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Manual Form Entry */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 p-8 space-y-10">
              
              {/* Profile Intel */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">1</div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Profile Intelligence</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className={labelClasses}>Full Legal Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                      <input 
                        required 
                        type="text" 
                        className={inputClasses} 
                        value={formData.fullName} 
                        onChange={e => setFormData({...formData, fullName: e.target.value})} 
                        placeholder="e.g. Alexander Hamilton" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClasses}>Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                      <input 
                        required 
                        type="email" 
                        className={inputClasses} 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        placeholder="ahamilton@example.com" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClasses}>Phone Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                      <input 
                        type="tel" 
                        className={inputClasses} 
                        value={formData.phone} 
                        onChange={e => setFormData({...formData, phone: e.target.value})} 
                        placeholder="(555) 000-0000" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClasses}>Account Status</label>
                    <div className="flex gap-3 h-[60px]">
                      {['active', 'pending'].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setFormData({...formData, status: s as any})}
                          className={`flex-1 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border-2 transition-all ${
                            formData.status === s 
                              ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                              : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-300'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lease Config */}
              <div className="space-y-6 pt-10 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">2</div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Lease Configuration</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <label className={labelClasses}>Lease Start</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input 
                        required 
                        type="date" 
                        className={inputClasses} 
                        value={formData.leaseStart} 
                        onChange={e => setFormData({...formData, leaseStart: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClasses}>Lease End</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input 
                        required 
                        type="date" 
                        className={inputClasses} 
                        value={formData.leaseEnd} 
                        onChange={e => setFormData({...formData, leaseEnd: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClasses}>Monthly Rent</label>
                    <div className="relative group">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input 
                        required 
                        type="number" 
                        className={inputClasses} 
                        value={formData.rentAmount || ''} 
                        onChange={e => setFormData({...formData, rentAmount: parseInt(e.target.value) || 0})} 
                        placeholder="0" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6">
                <button 
                  type="button" 
                  onClick={() => navigate('/tenants')} 
                  className="px-8 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all"
                >
                  Discard Changes
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting || !isFormValid} 
                  className="px-12 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center gap-3 active:scale-95"
                >
                  {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                  Complete Onboarding
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Sidebar Preview */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 space-y-8 shadow-sm sticky top-40 overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-1000" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100">
                  <Info size={20} />
                </div>
                <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Live Tenant Preview</h4>
              </div>

              <div className="flex flex-col items-center text-center space-y-4 py-4">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white text-3xl shadow-2xl shadow-blue-200">
                  {formData.fullName ? formData.fullName.split(' ').map(n => n[0]).join('') : '?'}
                </div>
                <div>
                  <h5 className="text-xl font-black text-slate-900 truncate max-w-[240px]">
                    {formData.fullName || 'New Resident'}
                  </h5>
                  <p className="text-sm font-bold text-slate-400 lowercase">{formData.email || 'email@example.com'}</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-50">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">Lease Term</span>
                  <span className="text-xs font-black text-slate-800">
                    {formData.leaseStart ? new Date(formData.leaseStart).toLocaleDateString() : 'TBD'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">Monthly Value</span>
                  <span className="text-base font-black text-blue-600">
                    ${formData.rentAmount?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">Status</span>
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    formData.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {formData.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3 text-emerald-600">
              <ShieldCheck size={18} />
              <p className="text-[10px] font-black uppercase tracking-widest">Lease Compliant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantCreatePage;
