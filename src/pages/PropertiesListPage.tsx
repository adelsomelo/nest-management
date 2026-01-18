
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Plus, 
  Search, 
  MapPin, 
  Filter, 
  Loader2,
  CheckCircle2,
  X
} from 'lucide-react';
import { type Property } from '../types';
import { useTranslation } from '../context/LanguageContext';
import { apiService } from '../services/apiService';

const PropertyCard: React.FC<{ property: Property; onClick: () => void }> = ({ property, onClick }) => {
  const { t } = useTranslation();
  const occupancyRate = property.maxUnits > 0 ? (property.tenants.length / property.maxUnits) * 100 : 0;
  
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all cursor-pointer overflow-hidden flex flex-col"
    >
      <div className="h-40 relative bg-slate-100 overflow-hidden">
        <img 
          src={property.images?.[0] || `https://picsum.photos/seed/${property.id}/600/400`} 
          alt={property.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm border ${
            property.rentalMode === 'Long-term' ? 'bg-blue-600 text-white border-blue-500' :
            property.rentalMode === 'Commercial' ? 'bg-emerald-600 text-white border-emerald-500' :
            'bg-slate-800 text-white border-slate-700'
          }`}>
            {property.rentalMode}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors truncate">{property.name}</h3>
          <div className="flex items-center gap-1.5 text-slate-400 mt-0.5">
            <MapPin size={14} className="shrink-0" />
            <span className="text-xs truncate font-medium">{property.city}, {property.state}</span>
          </div>
        </div>

        <div className="mt-auto space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span className="text-slate-400">{t.properties.occupancy}</span>
              <span className={occupancyRate < 50 ? 'text-rose-500' : occupancyRate > 90 ? 'text-emerald-500' : 'text-blue-500'}>
                {occupancyRate.toFixed(0)}%
              </span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${
                  occupancyRate < 50 ? 'bg-rose-500' : occupancyRate > 90 ? 'bg-emerald-500' : 'bg-blue-500'
                }`}
                style={{ width: `${occupancyRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PropertiesListPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    apiService.getProperties()
      .then(data => setProperties(data.length > 0 ? data : [
        {
          id: '3',
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
          description: 'Luxury oceanfront residential complex.',
          tenants: Array(18).fill({}), 
          rentalMode: 'Long-term',
          maxUnits: 24
        }
      ]))
      .finally(() => setLoading(false));

    // Handle navigation success state
    if (location.state?.successMessage) {
      setToastMessage(location.state.successMessage);
      // Clear navigation state to prevent re-showing on refresh
      window.history.replaceState({}, document.title);
      const timer = setTimeout(() => setToastMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const filteredProperties = useMemo(() => {
    return properties.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, properties]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t.properties.title}</h2>
          <p className="text-slate-500 mt-1 font-medium italic">
            {t.properties.subtitle.replace('{count}', properties.length.toString())}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/properties/create')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center gap-2 active:scale-95 text-xs"
          >
            <Plus size={20} /> {t.properties.add}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative group">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-5 py-3.5 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-2xl shadow-sm flex items-center gap-2 font-bold transition-all text-xs">
          <Filter size={18} /> {t.properties.filters}
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-slate-400">
          <Loader2 size={48} className="animate-spin text-blue-600" />
          <p className="font-bold uppercase tracking-widest text-xs">Accessing Portfolio...</p>
        </div>
      ) : filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {filteredProperties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onClick={() => navigate(`/properties/${property.id}`)} 
            />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
           <Building2 size={64} className="mx-auto text-slate-200 mb-4" />
           <p className="text-slate-900 font-bold text-lg">No properties match your search</p>
           <p className="text-slate-500">Try adjusting your filters or search term.</p>
        </div>
      )}

      {/* Success Toast */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 bg-emerald-600 text-white px-6 py-4 rounded-3xl shadow-2xl shadow-emerald-200 border border-emerald-500 animate-in slide-in-from-bottom-10 duration-500">
          <div className="bg-white/20 p-2 rounded-xl">
            <CheckCircle2 size={24} />
          </div>
          <div className="pr-4 border-r border-white/20">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-0.5">Success</p>
            <p className="text-sm font-bold whitespace-nowrap">{toastMessage}</p>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-white/20 rounded-full transition-all"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertiesListPage;
