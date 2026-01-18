
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Save, 
  Building2, 
  Hash, 
  DollarSign, 
  Layout, 
  Loader2,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { type Unit } from '../types';

const UnitEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock fetching existing unit data
  const [formData, setFormData] = useState<Unit>({
    id: id || 'u101',
    name: 'Penthouse A-1',
    number: 101,
    status: 'Occupied',
    price: 3450,
    propertyId: 'p3',
    tenants: [] // In a real app, this would be loaded
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200));
    setIsSaving(false);
    navigate(`/units/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this unit? This cannot be undone.")) {
      // Simulate delete
      navigate('/units');
    }
  };

  const inputClasses = "w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300 bg-white";
  const labelClasses = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block";

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Edit Unit Details</h2>
            <p className="text-slate-500 font-medium italic">Refining asset parameters for {formData.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDelete}
            className="px-6 py-3 border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 font-bold rounded-xl transition-all flex items-center gap-2"
          >
            <Trash2 size={18} />
            Delete Unit
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center gap-2 active:scale-95"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <form onSubmit={handleSave} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 p-8 space-y-10">
            
            {/* Identity Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">1</div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Unit Identity</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className={labelClasses}>Unit Name / Label</label>
                  <div className="relative group">
                    <Layout className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                      required 
                      type="text" 
                      className={inputClasses} 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                      placeholder="e.g. Skyline Executive Penthouse" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClasses}>Unit Number</label>
                  <div className="relative group">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                      required 
                      type="number" 
                      className={inputClasses} 
                      value={formData.number} 
                      onChange={e => setFormData({...formData, number: parseInt(e.target.value) || 0})} 
                      placeholder="101" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Status & Pricing */}
            <div className="space-y-6 pt-10 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">2</div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Financials & Status</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className={labelClasses}>Availability Status</label>
                  <div className="grid grid-cols-3 gap-2 h-[60px]">
                    {['Occupied', 'Vacant', 'Maintenance'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFormData({...formData, status: s as any})}
                        className={`rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
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
                  <label className={labelClasses}>Monthly Rent ($)</label>
                  <div className="relative group">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                      required 
                      type="number" 
                      className={inputClasses} 
                      value={formData.price} 
                      onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})} 
                      placeholder="0" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button 
                type="button" 
                onClick={() => navigate(-1)} 
                className="px-8 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all"
              >
                Cancel
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
          </form>
        </div>

        {/* Sidebar Context */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 space-y-6 shadow-sm sticky top-40">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100">
                <Building2 size={20} />
              </div>
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Property Location</h4>
            </div>
            
            <div className="space-y-4">
               <div className="h-40 rounded-3xl overflow-hidden relative">
                 <img 
                    src={`https://picsum.photos/seed/${formData.propertyId}/600/400`} 
                    alt="Property" 
                    className="w-full h-full object-cover opacity-80"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                 <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-xs font-black uppercase tracking-widest opacity-70">Primary Asset</p>
                    <h5 className="font-black text-sm">Harbor View Apartments</h5>
                 </div>
               </div>

               <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-700">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-xs font-semibold leading-relaxed">
                  Significant changes to unit pricing may trigger automatic tenant notification cycles if configured.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitEditPage;
