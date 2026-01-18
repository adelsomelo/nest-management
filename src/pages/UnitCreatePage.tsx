
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Save, 
  Building2, 
  Hash, 
  DollarSign, 
  Activity, 
  Layout, 
  CheckCircle2, 
  Loader2, 
  ChevronRight, 
  ShieldCheck, 
  Eye, 
  MapPin
} from 'lucide-react';
import { apiService } from '../services/apiService';
import { Property } from '../types';

type Step = 'identity' | 'pricing' | 'review';

const UnitCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('identity');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoadingProperties, setIsLoadingProperties] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    status: 'Vacant',
    price: '',
    propertyId: ''
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await apiService.getProperties();
        // Fallback to a mock list if none exist, matching current app state
        setProperties(data.length > 0 ? data : [
          {
            id: 'p3',
            name: 'Harbor View Apartments',
            address: '123 Coastal Way',
            city: 'San Francisco',
            state: 'CA',
            country: 'United States',
            postCode: '94105',
            status: 'Active',
            size: 15000,
            units: [],
            monthlyRent: 45000,
            description: 'Luxury oceanfront complex.',
            tenants: [], 
            rentalMode: 'Long-term',
            maxUnits: 24
          }
        ]);
      } catch (error) {
        console.error("Failed to load properties", error);
      } finally {
        setIsLoadingProperties(false);
      }
    };
    fetchProperties();
  }, []);

  const selectedProperty = properties.find(p => p.id === formData.propertyId);

  const isIdentityValid = formData.name.trim() !== '' && formData.number.trim() !== '' && formData.propertyId !== '';
  const isPricingValid = formData.price.trim() !== '';

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsSubmitting(false);
    navigate(`/properties/${formData.propertyId}/edit`);
  };

  const StepperItem = ({ step, label, active, completed }: { step: Step, label: string, active: boolean, completed: boolean }) => (
    <div className={`flex items-center gap-3 transition-all duration-300 ${active ? 'opacity-100' : 'opacity-40'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
        completed ? 'bg-emerald-500 border-emerald-500 text-white' : 
        active ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-slate-300 text-slate-400'
      }`}>
        {completed ? <CheckCircle2 size={16} /> : label.charAt(0)}
      </div>
      <span className={`text-sm font-bold tracking-tight ${active ? 'text-slate-800' : 'text-slate-500'}`}>{label}</span>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Dynamic Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6 bg-white/50 backdrop-blur-sm sticky top-20 z-20 px-4 -mx-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-900 leading-tight">New Inventory Unit</h2>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              <Building2 size={12} /> {selectedProperty?.name || 'Select Property'} <ChevronRight size={10} /> {formData.name || 'Draft Unit'}
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 bg-slate-100/50 px-6 py-2.5 rounded-2xl border border-slate-200">
          <StepperItem step="identity" label="Identity" active={currentStep === 'identity'} completed={currentStep !== 'identity'} />
          <StepperItem step="pricing" label="Pricing" active={currentStep === 'pricing'} completed={currentStep === 'review'} />
          <StepperItem step="review" label="Review" active={currentStep === 'review'} completed={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            
            {/* Step 1: Identity */}
            {currentStep === 'identity' && (
              <div className="p-8 space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">Define Unit & Association</h3>
                  <p className="text-sm text-slate-500">Choose the property this unit belongs to and set its identifier.</p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  <div className="group space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Parent Property</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                      <select
                        className="w-full pl-12 pr-10 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-700 bg-white appearance-none cursor-pointer"
                        value={formData.propertyId}
                        onChange={e => setFormData({...formData, propertyId: e.target.value})}
                      >
                        <option value="" disabled>Select a property...</option>
                        {properties.map(p => (
                          <option key={p.id} value={p.id}>{p.name} — {p.city}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronRight size={18} className="rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Unique Unit Name</label>
                      <div className="relative">
                        <Layout className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                        <input
                          type="text"
                          placeholder="e.g. Skyline Executive Penthouse"
                          className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-700"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="group space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Identification Number</label>
                      <div className="relative">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                        <input
                          type="number"
                          placeholder="704"
                          className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-700"
                          value={formData.number}
                          onChange={e => setFormData({...formData, number: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    disabled={!isIdentityValid}
                    onClick={() => setCurrentStep('pricing')}
                    className="group px-8 py-3.5 bg-slate-900 hover:bg-blue-600 disabled:bg-slate-200 text-white font-black rounded-2xl shadow-lg shadow-slate-200 transition-all flex items-center gap-2"
                  >
                    Continue to Financials <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Pricing */}
            {currentStep === 'pricing' && (
              <div className="p-8 space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">Financial Configuration</h3>
                  <p className="text-sm text-slate-500">Configure your revenue parameters based on current property requirements.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Current Status</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Vacant', 'Occupied', 'Maintenance'].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setFormData({...formData, status: s})}
                          className={`py-3 rounded-xl text-xs font-bold border-2 transition-all ${
                            formData.status === s 
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                              : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="group space-y-2">
                    <div className="flex items-center justify-between px-1">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Monthly Rent</label>
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                      <input
                        required
                        type="number"
                        placeholder="0.00"
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold text-slate-800"
                        value={formData.price}
                        onChange={e => setFormData({...formData, price: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setCurrentStep('identity')}
                    className="px-6 py-3.5 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-2xl transition-colors"
                  >
                    Back to Identity
                  </button>
                  <button
                    disabled={!isPricingValid}
                    onClick={() => setCurrentStep('review')}
                    className="group px-10 py-3.5 bg-slate-900 hover:bg-blue-600 disabled:bg-slate-200 text-white font-black rounded-2xl shadow-lg transition-all flex items-center gap-2"
                  >
                    Preview Unit <Eye size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 'review' && (
              <div className="p-8 space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Confirm Creation</h3>
                  <p className="text-slate-500">Everything looks correct. Click save to finalize.</p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Parent Property</p>
                    <p className="font-bold text-slate-800">{selectedProperty?.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Display Name</p>
                    <p className="font-bold text-slate-800">{formData.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit #</p>
                    <p className="font-bold text-slate-800">{formData.number}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing</p>
                    <p className="font-bold text-slate-800">${parseFloat(formData.price).toLocaleString()} /mo</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                    <p className="font-bold text-slate-800">{formData.status}</p>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setCurrentStep('pricing')}
                    className="px-6 py-3.5 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-2xl transition-colors"
                  >
                    Adjust Details
                  </button>
                  <button
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="px-12 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center gap-3 active:scale-95"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    Finalize Creation
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Improved Preview Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-40 space-y-6">
            <div className="relative group p-1 rounded-[2.5rem] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-indigo-500 to-emerald-500 animate-pulse opacity-20 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white rounded-[2.2rem] p-6 shadow-2xl space-y-6 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                    <Layout size={24} />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${
                    formData.status === 'Vacant' ? 'bg-amber-50 border-amber-200 text-amber-600' :
                    formData.status === 'Occupied' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' :
                    'bg-rose-50 border-rose-200 text-rose-600'
                  }`}>
                    {formData.status}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-tighter">Live Preview</p>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight leading-tight truncate">
                    {formData.name || 'Unit Draft'}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                     <Building2 size={12} /> {selectedProperty?.name || 'No Property Selected'}
                  </div>
                  <p className="text-sm font-bold text-slate-400 mt-1">Unit Number {formData.number || '--'}</p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-end justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Revenue</p>
                    <p className="text-3xl font-black text-slate-900 leading-none">
                      ${formData.price ? parseInt(formData.price).toLocaleString() : '0'}
                      <span className="text-sm font-bold text-slate-400 ml-1">/mo</span>
                    </p>
                  </div>
                </div>

                {/* Subtle Grid Background */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-4 shadow-xl">
              <div className="flex items-center gap-2">
                <Building2 size={20} className="text-blue-400" />
                <h5 className="font-bold">Association Context</h5>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/5 rounded-lg">
                    <MapPin size={16} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Location</p>
                    <p className="text-xs font-bold text-slate-300">{selectedProperty ? `${selectedProperty.city}, ${selectedProperty.state}` : 'Pending Selection'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/5 rounded-lg">
                    <Activity size={16} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Market Context</p>
                    <p className="text-xs font-bold text-slate-300">{selectedProperty?.rentalMode || 'Pending Selection'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitCreatePage;
