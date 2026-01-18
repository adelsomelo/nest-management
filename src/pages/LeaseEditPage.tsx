
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Save, 
  Trash2, 
  Calendar, 
  DollarSign, 
  ShieldCheck, 
  FileText, 
  Loader2, 
  Building2,
  CheckCircle2,
  Clock,
  TrendingUp,
  Info
} from 'lucide-react';
import { Lease } from '../types';
import ConfirmationModal from '../components/ConfirmationModal';

const LeaseEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [formData, setFormData] = useState<Lease & { escalationEnabled: boolean, escalationRate: number, renewalOptions: string }>({
    id: id || 'L-1001',
    tenantId: '1',
    tenantName: 'Alex Rivera',
    unitId: 'u101',
    unitName: 'Penthouse A-1',
    propertyId: 'p3',
    propertyName: 'Harbor View Apartments',
    startDate: '2023-01-15',
    endDate: '2025-01-15',
    monthlyRent: 3450,
    deposit: 6900,
    status: 'active',
    escalationEnabled: false,
    escalationRate: 3.5,
    renewalOptions: 'One 12-month option at market rate'
  });

  const totalValue = useMemo(() => {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const baseValue = Math.max(months, 0) * formData.monthlyRent;
    
    if (formData.escalationEnabled && months > 12) {
      const secondYearMonths = months - 12;
      const escalationAmount = (formData.monthlyRent * (formData.escalationRate / 100)) * secondYearMonths;
      return baseValue + escalationAmount;
    }
    return baseValue;
  }, [formData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsSaving(false);
    navigate(`/leases/${id}`);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    navigate('/leases');
  };

  const inputClasses = "w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300 bg-white";
  const labelClasses = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block";

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/50 backdrop-blur-md p-6 rounded-[2.5rem] border border-slate-200 sticky top-20 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(`/leases/${id}`)}
            className="p-3 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Manage Term Configuration</h2>
            <p className="text-slate-500 font-medium italic">Lease ID: {formData.id} • {formData.tenantName}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={isDeleting}
            className="px-6 py-3 border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 font-bold rounded-xl transition-all flex items-center gap-2"
          >
            <Trash2 size={18} />
            Void Agreement
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center gap-2 active:scale-95"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Confirm All Terms
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          
          <form onSubmit={handleSave} className="space-y-10">
            {/* Subject Context Card */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 p-10 space-y-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                <Building2 size={200} />
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Financial Mechanics</h3>
                  <p className="text-sm text-slate-500 font-medium">Core monetary settings and term durations</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-2">
                  <label className={labelClasses}>Effective Commencement</label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600" size={20} />
                    <input type="date" className={inputClasses} value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClasses}>Expiration / Maturity</label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600" size={20} />
                    <input type="date" className={inputClasses} value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClasses}>Monthly Installment ($)</label>
                  <div className="relative group">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600" size={20} />
                    <input type="number" className={inputClasses} value={formData.monthlyRent} onChange={e => setFormData({...formData, monthlyRent: parseInt(e.target.value) || 0})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClasses}>Security Bond Deposit ($)</label>
                  <div className="relative group">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600" size={20} />
                    <input type="number" className={inputClasses} value={formData.deposit} onChange={e => setFormData({...formData, deposit: parseInt(e.target.value) || 0})} />
                  </div>
                </div>
              </div>

              {/* Rent Escalation Section */}
              <div className="pt-8 border-t border-slate-100 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingUp size={20} className="text-blue-600" />
                    <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs">Annual Rent Escalation</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Enable</span>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, escalationEnabled: !formData.escalationEnabled})}
                      className={`w-12 h-6 rounded-full relative transition-all duration-300 ${formData.escalationEnabled ? 'bg-blue-600' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${formData.escalationEnabled ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                </div>

                {formData.escalationEnabled && (
                  <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100 flex items-center gap-8 animate-in slide-in-from-top-4 duration-300">
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-blue-700">Yearly Increase Rate</span>
                        <span className="text-lg font-black text-blue-900">{formData.escalationRate}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="15" 
                        step="0.5" 
                        value={formData.escalationRate}
                        onChange={e => setFormData({...formData, escalationRate: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-blue-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                    <div className="w-px h-12 bg-blue-200" />
                    <div className="text-right">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Est. Year 2 Rent</p>
                      <p className="text-xl font-black text-blue-900">
                        ${Math.round(formData.monthlyRent * (1 + formData.escalationRate / 100)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Standard Provisions Section (Replaced Smart Clauses) */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 p-10 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-200">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Contractual Provisions</h3>
                  <p className="text-sm text-slate-500 font-medium">Standard lease conditions and options</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className={labelClasses}>Standard Renewal Provision</label>
                  <textarea 
                    className={`${inputClasses} resize-none h-32 pt-4`}
                    value={formData.renewalOptions}
                    onChange={e => setFormData({...formData, renewalOptions: e.target.value})}
                    placeholder="Describe renewal conditions..."
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Sidebar Intelligence */}
        <div className="lg:col-span-4 space-y-8">
          {/* Value Summary Sticky */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 space-y-8 shadow-sm sticky top-40">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100">
                <Info size={20} />
              </div>
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Contract Snapshot</h4>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-blue-600" />
                  <span className="text-xs font-bold text-slate-500">Gross Contract Value</span>
                </div>
                <span className="text-sm font-black text-slate-900">${totalValue.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-indigo-600" />
                  <span className="text-xs font-bold text-slate-500">Contract Life</span>
                </div>
                <span className="text-sm font-black text-slate-900">24 Months</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span className="text-xs font-bold text-slate-500">Asset Safety Bond</span>
                </div>
                <span className="text-sm font-black text-slate-900">${formData.deposit.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <h5 className="text-[10px] font-black uppercase tracking-widest">Auto-Compliance</h5>
              </div>
              <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase">
                Term maturity is automatically monitored. Notifications for renewal will fire 90 days before expiration.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Void Agreement"
        message={`Are you sure you want to void lease agreement ${formData.id}? This will immediately terminate the contract and mark the associated unit as vacant.`}
        confirmLabel="Void Permanently"
        cancelLabel="Keep Active"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default LeaseEditPage;
