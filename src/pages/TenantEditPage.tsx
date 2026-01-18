
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Save, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  Loader2, 
  User, 
  Trash2, 
  ShieldCheck, 
  Clock, 
  Info
} from 'lucide-react';
import { Tenant } from '../types';
import { apiService } from '../services/apiService';
import ConfirmationModal from '../components/ConfirmationModal';

const TenantEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<Tenant>({
    id: id || '',
    fullName: '',
    email: '',
    phone: '',
    leaseStart: '',
    leaseEnd: '',
    rentAmount: 0,
    status: 'active'
  });

  useEffect(() => {
    if (id) {
      apiService.getTenantById(id).then(data => {
        setFormData(data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200));
    setIsSaving(false);
    navigate(`/tenants/${id}`);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1000));
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    navigate('/tenants');
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 size={40} className="animate-spin text-blue-600" />
        <p className="font-black text-xs uppercase tracking-[0.2em]">Accessing Profile...</p>
      </div>
    );
  }

  const inputClasses = "w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300 bg-white";
  const labelClasses = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block";

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(`/tenants/${id}`)}
            className="p-3 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Edit Resident Profile</h2>
            <p className="text-slate-500 font-medium italic">Adjusting parameters for {formData.fullName}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={isDeleting}
            className="px-6 py-3 border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 font-bold rounded-xl transition-all flex items-center gap-2"
          >
            <Trash2 size={18} />
            Revoke Access
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center gap-2 active:scale-95"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Confirm Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <form onSubmit={handleSave} className="space-y-8">
            {/* Main Form Entry */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 p-10 space-y-10">
              
              {/* Resident Identity */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">1</div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Resident Identity</h3>
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
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClasses}>Account Status</label>
                    <div className="grid grid-cols-2 gap-2 h-[60px]">
                      {(['active', 'past'] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setFormData({...formData, status: s})}
                          className={`rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border-2 transition-all ${
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

                  <div className="space-y-2">
                    <label className={labelClasses}>Business Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                      <input 
                        required 
                        type="email" 
                        className={inputClasses} 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
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
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Lease Logistics */}
              <div className="space-y-6 pt-10 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">2</div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Lease Logistics</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <label className={labelClasses}>Commencement</label>
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
                    <label className={labelClasses}>Maturity</label>
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
                    <label className={labelClasses}>Contract Rent ($)</label>
                    <div className="relative group">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input 
                        required 
                        type="number" 
                        className={inputClasses} 
                        value={formData.rentAmount} 
                        onChange={e => setFormData({...formData, rentAmount: parseInt(e.target.value) || 0})} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6">
                <button 
                  type="button" 
                  onClick={() => navigate(`/tenants/${id}`)} 
                  className="px-8 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all"
                >
                  Discard Changes
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving} 
                  className="px-12 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center gap-3 active:scale-95"
                >
                  {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                  Confirm Updates
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Sidebar Context */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 space-y-8 shadow-sm sticky top-40 overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-1000" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100">
                  <Info size={20} />
                </div>
                <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Resident Snapshot</h4>
              </div>

              <div className="flex flex-col items-center text-center space-y-4 py-4">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white text-3xl shadow-2xl shadow-blue-200">
                  {formData.fullName ? formData.fullName.split(' ').map(n => n[0]).join('') : '?'}
                </div>
                <div>
                  <h5 className="text-xl font-black text-slate-900 truncate max-w-[240px]">
                    {formData.fullName || 'Resident Draft'}
                  </h5>
                  <p className="text-sm font-bold text-slate-400 lowercase">{formData.email || 'email@example.com'}</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-50">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">Lease Term</span>
                  <span className="text-xs font-black text-slate-800 uppercase tracking-tight">
                    {formData.leaseStart ? new Date(formData.leaseStart).toLocaleDateString() : 'TBD'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">Monthly Value</span>
                  <span className="text-base font-black text-blue-600">
                    ${formData.rentAmount?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">Status</span>
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    formData.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {formData.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3 text-emerald-600">
              <ShieldCheck size={18} />
              <p className="text-[10px] font-black uppercase tracking-widest">Compliance Active</p>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Revoke Access"
        message={`Are you sure you want to revoke access for ${formData.fullName}? This will archive their lease history and mark them as a past resident.`}
        confirmLabel="Confirm Archive"
        cancelLabel="Keep Active"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default TenantEditPage;
