
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { type Property } from '../types';
import { 
  ChevronLeft, 
  ChevronRight,
  Building2, 
  MapPin, 
  Home, 
  DollarSign, 
  Activity, 
  Maximize2, 
  TextQuote, 
  Globe,
  ArrowRight,
  Info,
  Pencil
} from 'lucide-react';

const DetailItem = ({ label, value, icon: Icon }: { label: string, value: string | number, icon: any }) => (
  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-start gap-4 hover:bg-white hover:shadow-sm transition-all">
    <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600 border border-slate-100">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{label}</p>
      <p className="text-base font-bold text-slate-800 leading-tight">{value}</p>
    </div>
  </div>
);

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [property] = useState<Property>({
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
    description: 'Luxury oceanfront residential complex featuring panoramic views, 24/7 concierge, and state-of-the-art fitness center. This flagship property serves as a hub for executive long-term rentals in the San Francisco bay area.',
    rentalMode: 'Long-term',
    maxUnits: 24,
    tenants: Array(18).fill({}),
    images: [] // Initially empty, will fallback to mocks if not set
  });

  const propertyImages = property.images && property.images.length > 0 
    ? property.images 
    : [
        `https://picsum.photos/seed/${property.id}-1/1200/600`,
        `https://picsum.photos/seed/${property.id}-2/1200/600`,
        `https://picsum.photos/seed/${property.id}-3/1200/600`,
        `https://picsum.photos/seed/${property.id}-4/1200/600`,
      ];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/properties')}
            className="p-3 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-wider rounded-md">Property Profile</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{property.name}</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button 
            onClick={() => navigate('/units')}
            className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            Inventory View
          </button>
          <button 
            onClick={() => navigate(`/properties/${id}/edit`)}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center gap-2 active:scale-95"
          >
            <Pencil size={18} />
            Edit Property
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Details */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Cover Carousel & Description */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="h-96 relative bg-slate-900 group/carousel">
              {/* Image Transition Layer */}
              <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
                {propertyImages.map((src, idx) => (
                  <img 
                    key={idx}
                    src={src} 
                    alt={`${property.name} View ${idx + 1}`} 
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                      idx === currentImageIndex ? 'opacity-60 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={prevImage}
                  className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all active:scale-90"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextImage}
                  className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all active:scale-90"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Pagination Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/10">
                {propertyImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      idx === currentImageIndex ? 'w-6 bg-blue-500' : 'w-1.5 bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-10 left-10 pointer-events-none">
                 <div className="flex items-center gap-4 text-white">
                    <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                       <MapPin size={32} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black">{property.address}</h3>
                       <p className="text-slate-300 font-medium">{property.city}, {property.state} {property.postCode}</p>
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="p-10 space-y-6">
               <div className="flex items-center gap-3">
                 <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                    <TextQuote size={20} />
                 </div>
                 <h4 className="font-black text-slate-900 uppercase tracking-widest text-sm">Property Brief</h4>
               </div>
               <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  {property.description}
               </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <DetailItem label="Rental Mode" value={property.rentalMode} icon={Home} />
             <DetailItem label="Property Status" value={property.status} icon={Activity} />
             <DetailItem label="Total Footprint" value={`${property.size.toLocaleString()} sqft`} icon={Maximize2} />
             <DetailItem label="Max Unit Capacity" value={`${property.maxUnits} Residential Units`} icon={Building2} />
             <DetailItem label="Monthly Est. Revenue" value={`$${property.monthlyRent.toLocaleString()}`} icon={DollarSign} />
             <DetailItem label="Occupied Units" value={`${property.tenants.length} / ${property.maxUnits}`} icon={Globe} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Stats Card */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 space-y-8 shadow-sm sticky top-40">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100">
                 <Info size={20} />
              </div>
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-sm">Vital Statistics</h4>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span className="text-sm font-bold text-slate-500">Occupancy Level</span>
                 </div>
                 <span className="text-sm font-black text-slate-900">{((property.tenants.length / property.maxUnits) * 100).toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span className="text-sm font-bold text-slate-500">Revenue Density</span>
                 </div>
                 <span className="text-sm font-black text-slate-900">${(property.monthlyRent / property.size).toFixed(2)} /sqft</span>
              </div>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span className="text-sm font-bold text-slate-500">System ID</span>
                 </div>
                 <span className="text-sm font-black text-slate-900 uppercase">{property.id}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate(`/units`)}
              className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-900 font-black rounded-2xl border border-slate-200 transition-all flex items-center justify-center gap-2 group"
            >
               Browse Unit Plans
               <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
