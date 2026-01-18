
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Property } from '../types';
import { 
  ChevronLeft, 
  Building2, 
  MapPin, 
  Save, 
  Home, 
  DollarSign, 
  Activity, 
  Maximize2, 
  TextQuote, 
  Globe,
  Loader2,
  Trash2,
  AlertCircle,
  X,
  UploadCloud
} from 'lucide-react';
import ConfirmationModal from '../components/ConfirmationModal';

const PropertyEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [formData, setFormData] = useState<Property>({
    id: id || '3',
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
    description: 'Luxury oceanfront residential complex featuring panoramic views and premium amenities.',
    rentalMode: 'Long-term',
    maxUnits: 24,
    tenants: [],
    images: [
      `https://picsum.photos/seed/${id}-1/600/400`,
      `https://picsum.photos/seed/${id}-2/600/400`
    ]
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    (Array.from(files) as File[]).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          images: [...(prev.images || []), reader.result as string]
        }));
      };
      reader.readAsDataURL(file as Blob);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    navigate('/properties');
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    
    // Pass success message to the list page
    navigate('/properties', { 
      state: { 
        successMessage: `Property "${formData.name}" was successfully deleted.` 
      } 
    });
  };

  const inputClasses = "w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300 bg-white";
  const labelClasses = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/properties')}
            className="p-3 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Edit Property</h2>
            <p className="text-slate-500 font-medium italic">Refining details for {formData.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={isDeleting}
            className="px-6 py-3 border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 font-bold rounded-xl transition-all flex items-center gap-2"
          >
            <Trash2 size={18} />
            Delete Property
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="h-48 relative bg-slate-900 overflow-hidden">
              <img 
                src={formData.images?.[0] || `https://picsum.photos/seed/${formData.id}/600/400`} 
                alt={formData.name} 
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg mb-2 inline-block">
                  {formData.rentalMode}
                </span>
                <h3 className="text-xl font-black text-white">{formData.name}</h3>
                <p className="text-slate-300 text-sm font-medium flex items-center gap-1.5 mt-1">
                  <MapPin size={14} className="text-blue-400" /> {formData.city}, {formData.state}
                </p>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Size</p>
                  <p className="text-sm font-bold text-slate-800">{formData.size.toLocaleString()} sqft</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Max Capacity</p>
                  <p className="text-sm font-bold text-slate-800">{formData.maxUnits} Units</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-700">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-xs font-semibold leading-relaxed">
                  Tenant management has been moved to the <span className="font-black underline">Tenants Dashboard</span> for improved portfolio oversight.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 p-8 space-y-10">
            
            {/* Section: Basic Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">1</div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Basic Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelClasses}>Property Name</label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                      type="text" 
                      className={inputClasses} 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClasses}>Rental Mode</label>
                  <div className="relative group">
                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <select 
                      className={inputClasses} 
                      value={formData.rentalMode} 
                      onChange={e => setFormData({...formData, rentalMode: e.target.value})}
                    >
                      <option value="Long-term">Long-term (Residential)</option>
                      <option value="Short-term">Short-term (Vacation)</option>
                      <option value="Commercial">Commercial Lease</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className={labelClasses}>Property Description</label>
                <div className="relative group">
                  <TextQuote className="absolute left-4 top-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <textarea 
                    rows={4} 
                    className={`${inputClasses} resize-none`} 
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})} 
                  />
                </div>
              </div>
            </div>

            {/* Section: Location */}
            <div className="space-y-6 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">2</div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Location Details</h3>
              </div>
              
              <div className="space-y-2">
                <label className={labelClasses}>Street Address</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input 
                    type="text" 
                    className={inputClasses} 
                    value={formData.address} 
                    onChange={e => setFormData({...formData, address: e.target.value})} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className={labelClasses}>City</label>
                  <input 
                    type="text" 
                    className={inputClasses.replace('pl-12', 'px-4')} 
                    value={formData.city} 
                    onChange={e => setFormData({...formData, city: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClasses}>State / Region</label>
                  <input 
                    type="text" 
                    className={inputClasses.replace('pl-12', 'px-4')} 
                    value={formData.state} 
                    onChange={e => setFormData({...formData, state: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClasses}>Post Code</label>
                  <input 
                    type="text" 
                    className={inputClasses.replace('pl-12', 'px-4')} 
                    value={formData.postCode} 
                    onChange={e => setFormData({...formData, postCode: e.target.value})} 
                  />
                </div>
              </div>
            </div>

            {/* Section: Metrics */}
            <div className="space-y-6 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">3</div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Capacity & Metrics</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className={labelClasses}>Size (sqft)</label>
                  <div className="relative group">
                    <Maximize2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                      type="number" 
                      className={inputClasses} 
                      value={formData.size} 
                      onChange={e => setFormData({...formData, size: parseInt(e.target.value) || 0})} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelClasses}>Max Units</label>
                  <div className="relative group">
                    <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                      type="number" 
                      className={inputClasses} 
                      value={formData.maxUnits} 
                      onChange={e => setFormData({...formData, maxUnits: parseInt(e.target.value) || 0})} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelClasses}>Est. Monthly Revenue</label>
                  <div className="relative group">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                      type="number" 
                      className={inputClasses} 
                      value={formData.monthlyRent} 
                      onChange={e => setFormData({...formData, monthlyRent: parseInt(e.target.value) || 0})} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Media Gallery */}
            <div className="space-y-6 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">4</div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Media Gallery</h3>
              </div>
              
              <div className="space-y-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-40 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-2 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer group"
                >
                  <UploadCloud size={32} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                  <p className="text-xs font-bold text-slate-500">Add more property photos</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    multiple 
                    accept="image/*" 
                    onChange={handleImageUpload}
                  />
                </div>

                {formData.images && formData.images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {formData.images.map((src, idx) => (
                      <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group border border-slate-100 shadow-sm">
                        <img src={src} className="w-full h-full object-cover" alt="Property" />
                        <button 
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Property"
        message={`Are you sure you want to delete "${formData.name}"? This action is permanent and will remove all associated unit and lease history.`}
        confirmLabel="Delete Permanently"
        cancelLabel="Keep Property"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
};

export default PropertyEditPage;
