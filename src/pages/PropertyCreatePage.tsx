
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Building2, 
  MapPin, 
  Save, 
  Loader2,
  TextQuote,
  Activity,
  Maximize2,
  DollarSign,
  Home,
  Navigation,
  X,
  UploadCloud
} from 'lucide-react';

const PropertyCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    country: 'United States',
    postCode: '',
    status: 'Active',
    size: '',
    monthlyRent: '',
    description: '',
    rentalMode: 'Long-term',
    maxUnits: '',
    images: [] as string[]
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    (Array.from(files) as File[]).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, reader.result as string]
        }));
      };
      reader.readAsDataURL(file as Blob);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    navigate('/properties');
  };

  const isFormValid = formData.name && formData.address && formData.city && formData.maxUnits;

  const inputClasses = "w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300 bg-white";
  const labelClasses = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1";

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/properties')}
            className="p-3 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Add New Property</h2>
            <p className="text-slate-500 font-medium italic">Expanding your portfolio, one building at a time.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* General Info */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">1</div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">General Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelClasses}>Property Name</label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input required type="text" className={inputClasses} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Skyline Towers" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClasses}>Rental Mode</label>
                  <div className="relative group">
                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <select className={inputClasses} value={formData.rentalMode} onChange={e => setFormData({...formData, rentalMode: e.target.value})}>
                      <option value="Long-term">Long-term (Residential)</option>
                      <option value="Short-term">Short-term (Vacation)</option>
                      <option value="Commercial">Commercial Lease</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className={labelClasses}>Status</label>
                <div className="flex gap-3">
                  {['Active', 'Pending', 'Renovation'].map((s) => (
                    <button
                      key={s} type="button" onClick={() => setFormData({...formData, status: s})}
                      className={`flex-1 py-3 rounded-xl text-xs font-bold border-2 transition-all ${
                        formData.status === s 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                          : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className={labelClasses}>Description</label>
                <div className="relative group">
                  <TextQuote className="absolute left-4 top-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <textarea rows={3} className={`${inputClasses} resize-none`} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Provide a brief overview..." />
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">2</div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Location Details</h3>
              </div>
              <div className="space-y-2">
                <label className={labelClasses}>Street Address</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input required type="text" className={inputClasses} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="123 Property Lane" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['city', 'state', 'postCode'].map((field) => (
                  <div key={field} className="space-y-2">
                    <label className={labelClasses}>{field === 'postCode' ? 'Post Code' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input required type="text" className={inputClasses.replace('pl-12', 'px-4')} value={(formData as any)[field]} onChange={e => setFormData({...formData, [field]: e.target.value})} />
                  </div>
                ))}
              </div>
            </div>

            {/* Financials */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">3</div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Capacity & Financials</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { field: 'size', icon: Maximize2, label: 'Size (sqft)' },
                  { field: 'maxUnits', icon: Activity, label: 'Max Units' },
                  { field: 'monthlyRent', icon: DollarSign, label: 'Monthly Rent' }
                ].map(({ field, icon: Icon, label }) => (
                  <div key={field} className="space-y-2">
                    <label className={labelClasses}>{label}</label>
                    <div className="relative group">
                      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                      <input required type="number" className={inputClasses} value={(formData as any)[field]} onChange={e => setFormData({...formData, [field]: e.target.value})} placeholder="0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Gallery */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">4</div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Media Gallery</h3>
              </div>
              
              <div className="space-y-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-48 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-3 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer group"
                >
                  <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                    <UploadCloud size={32} className="text-blue-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-black text-slate-700">Click or drag to upload property photos</p>
                    <p className="text-xs font-bold text-slate-400">PNG, JPG or WEBP (Max 5MB each)</p>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    multiple 
                    accept="image/*" 
                    onChange={handleImageUpload}
                  />
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-in fade-in duration-500">
                    {formData.images.map((src, idx) => (
                      <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm border border-slate-100">
                        <img src={src} className="w-full h-full object-cover" alt={`Preview ${idx + 1}`} />
                        <button 
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button type="button" onClick={() => navigate('/properties')} className="px-8 py-4 text-slate-500 font-bold hover:bg-white hover:shadow-sm rounded-2xl transition-all">Cancel</button>
              <button type="submit" disabled={isSubmitting || !isFormValid} className="px-12 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center gap-3 active:scale-95">
                {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                Add Property
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 space-y-6 shadow-sm sticky top-40">
             <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400"><Navigation size={20} /></div>
              <h4 className="font-bold text-slate-800">Live Preview</h4>
            </div>
            <div className="space-y-4">
              <div className="h-32 bg-slate-100 rounded-2xl overflow-hidden relative">
                 <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-white flex items-center justify-center">
                    {formData.images.length > 0 ? (
                      <img src={formData.images[0]} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <Building2 className="text-slate-300" size={48} />
                    )}
                 </div>
              </div>
              <div>
                <h5 className="font-black text-lg text-slate-900 truncate">{formData.name || 'New Property'}</h5>
                <p className="text-xs font-bold text-slate-400 flex items-center gap-1"><MapPin size={12} /> {formData.city ? `${formData.city}, ${formData.state}` : 'Location pending...'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Cap</p>
                    <p className="text-sm font-bold text-slate-800">{formData.maxUnits || '--'} Units</p>
                 </div>
                 <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Mode</p>
                    <p className="text-sm font-bold text-slate-800 truncate">{formData.rentalMode}</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCreatePage;
