
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft,
  Save, 
  Loader2,
  Calendar,
  DollarSign,
  User,
  Layout,
  Building2,
  ShieldCheck,
  ClipboardList,
  Home,
  Check
} from 'lucide-react';
import { type Lease } from '../types';

const LeaseCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaseType, setLeaseType] = useState<'unit' | 'property'>('unit');

  const [formData, setFormData] = useState<Partial<Lease>>({
    tenantName: '',
    unitName: '',
    propertyName: '',
    startDate: '',
    endDate: '',
    monthlyRent: 0,
    deposit: 0,
    status: 'pending'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Prepare data based on lease type
    const finalLeaseData = {
      ...formData,
      unitId: leaseType === 'property' ? undefined : formData.unitId,
      unitName: leaseType === 'property' ? undefined : formData.unitName,
    };
    console.log("Executing Lease:", finalLeaseData);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    navigate('/leases');
  };

  const isFormValid = formData.tenantName && formData.propertyName && formData.startDate && (leaseType === 'property' || formData.unitName);

  const inputClasses = "w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300 bg-white";
  const labelClasses = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block";

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/leases')}
            className="p-3 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Draft Lease Agreement</h2>
            <p className="text-slate-500 font-medium italic">Defining contractual terms between tenant and asset.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Manual Entry */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 p-8 space-y-10">
              
              {/* Lease Type Toggle */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">1</div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Lease Subject</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setLeaseType('unit')}
                    className={`p-6 rounded-[2rem] border-2 text-left transition-all ${
                      leaseType === 'unit' 
                        ? 'border-blue-600 bg-blue-50/50 shadow-lg ring-4 ring-blue-500/10' 
                        : 'border-slate-100 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                       <Layout className={leaseType === 'unit' ? 'text-blue-600' : 'text-slate-400'} size={24} />
                       {leaseType === 'unit' && <Check className="text-blue-600" size={20} />}
                    </div>
                    <p className="font-black text-slate-900 tracking-tight">Specific Unit</p>
                    <p className="text-xs font-bold text-slate-500">Lease a room or office</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLeaseType('property')}
                    className={`p-6 rounded-[2rem] border-2 text-left transition-all ${
                      leaseType === 'property' 
                        ? 'border-blue-600 bg-blue-50/50 shadow-lg ring-4 ring-blue-500/10' 
                        : 'border-slate-100 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                       <Home className={leaseType === 'property' ? 'text-blue-600' : 'text-slate-400'} size={24} />
                       {leaseType === 'property' && <Check className="text-blue-600" size={20} />}
                    </div>
                    <p className="font-black text-slate-900 tracking-tight">Full Property</p>
                    <p className="text-xs font-bold text-slate-500">Entire building contract</p>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-2">
                    <label className={labelClasses}>Tenant Legal Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                      <input 
                        required 
                        type="text" 
                        className={inputClasses} 
                        value={formData.tenantName} 
                        onChange={e => setFormData({...formData, tenantName: e.target.value})} 
                        placeholder="Search active tenants..." 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClasses}>Target Property</label>
                    <div className="relative group">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                      <input 
                        required 
                        type="text" 
                        className={inputClasses} 
                        value={formData.propertyName} 
                        onChange={e => setFormData({...formData, propertyName: e.target.value})} 
                        placeholder="Property Portfolio Name" 
                      />
                    </div>
                  </div>

                  {leaseType === 'unit' && (
                    <div className="space-y-2 md:col-span-2 animate-in slide-in-from-top-2 duration-300">
                      <label className={labelClasses}>Assigned Unit</label>
                      <div className="relative group">
                        <Layout className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                        <input 
                          required 
                          type="text" 
                          className={inputClasses} 
                          value={formData.unitName} 
                          onChange={e => setFormData({...formData, unitName: e.target.value})} 
                          placeholder="e.g. Unit 402-A" 
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Financials */}
              <div className="space-y-6 pt-10 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">2</div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Financial Parameters</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2 lg:col-span-2">
                    <label className={labelClasses}>Term Commencement</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input required type="date" className={inputClasses} value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
                    </div>
                  </div>

                  <div className="space-y-2 lg:col-span-2">
                    <label className={labelClasses}>Term Expiration</label>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input required type="date" className={inputClasses} value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
                    </div>
                  </div>

                  <div className="space-y-2 lg:col-span-2">
                    <label className={labelClasses}>Monthly Lease Value</label>
                    <div className="relative group">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input required type="number" className={inputClasses} value={formData.monthlyRent || ''} onChange={e => setFormData({...formData, monthlyRent: parseInt(e.target.value) || 0})} placeholder="0" />
                    </div>
                  </div>

                  <div className="space-y-2 lg:col-span-2">
                    <label className={labelClasses}>Security Deposit</label>
                    <div className="relative group">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input required type="number" className={inputClasses} value={formData.deposit || ''} onChange={e => setFormData({...formData, deposit: parseInt(e.target.value) || 0})} placeholder="0" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between pt-6">
                <button type="button" onClick={() => navigate('/leases')} className="px-8 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all">Discard Draft</button>
                <button 
                  type="submit" 
                  disabled={isSubmitting || !isFormValid} 
                  className="px-12 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center gap-3 active:scale-95"
                >
                  {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                  Execute Agreement
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Preview Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 space-y-8 shadow-sm sticky top-40 overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-1000" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100">
                  <ClipboardList size={20} />
                </div>
                <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Agreement Preview</h4>
              </div>

              <div className="space-y-5 py-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Contractor</p>
                  <p className="text-sm font-black text-slate-900">{formData.tenantName || 'Resident Pending'}</p>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Asset Target</p>
                  <div className="flex items-center gap-2">
                    {leaseType === 'property' ? <Home className="text-emerald-500" size={14} /> : <Layout className="text-blue-500" size={14} />}
                    <p className="text-sm font-black text-slate-900">
                      {leaseType === 'property' ? 'Full Building' : (formData.unitName || 'Unit TBD')}
                    </p>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">@{formData.propertyName || 'Property Unknown'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Monthly</p>
                    <p className="text-lg font-black text-blue-700">${formData.monthlyRent?.toLocaleString() || '0'}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Drafting</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center gap-3 text-emerald-600">
                <ShieldCheck size={18} />
                <p className="text-[10px] font-black uppercase tracking-widest">Compliant Terms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaseCreatePage;
