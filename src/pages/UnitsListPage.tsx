
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layout, 
  Search, 
  Plus, 
  Building2, 
  MapPin, 
  ChevronRight, 
  CheckCircle2,
  AlertCircle,
  Wrench,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { type Unit } from '../types';

// Extended Unit interface for display purposes
interface UnitDisplay extends Unit {
  propertyName: string;
}

const MOCK_UNITS: UnitDisplay[] = [
  { id: 'u101', name: 'Penthouse A-1', number: 101, status: 'Occupied', price: 3450, propertyId: 'p3', propertyName: 'Harbor View Apartments', tenants: [{} as any] },
  { id: 'u102', name: 'Studio B-4', number: 102, status: 'Vacant', price: 2100, propertyId: 'p3', propertyName: 'Harbor View Apartments', tenants: [] },
  { id: 'u103', name: 'Luxury Suite 3', number: 103, status: 'Maintenance', price: 2800, propertyId: 'p3', propertyName: 'Harbor View Apartments', tenants: [] },
  { id: 'u201', name: 'Tech Office 1', number: 201, status: 'Occupied', price: 8500, propertyId: 'p4', propertyName: 'Tech Plaza Commercial', tenants: [{} as any] },
  { id: 'u202', name: 'Conference Hub', number: 202, status: 'Vacant', price: 4200, propertyId: 'p4', propertyName: 'Tech Plaza Commercial', tenants: [] },
  { id: 'u301', name: 'Artist Loft 8', number: 301, status: 'Occupied', price: 3100, propertyId: 'p5', propertyName: 'Sunset Heights Lofts', tenants: [{} as any] },
  { id: 'u302', name: 'Sky Terrace', number: 302, status: 'Occupied', price: 4900, propertyId: 'p5', propertyName: 'Sunset Heights Lofts', tenants: [{} as any] },
];

const StatCard = ({ label, value, icon: Icon, color }: { label: string, value: string | number, icon: any, color: string }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
    <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-opacity-100`}>
      <Icon size={24} className={color.replace('bg-', 'text-')} />
    </div>
    <div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-black text-slate-900 leading-none">{value}</p>
    </div>
  </div>
);

const UnitsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Occupied' | 'Vacant' | 'Maintenance'>('all');

  const filteredUnits = useMemo(() => {
    return MOCK_UNITS.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.propertyName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Occupied':
        return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100 flex items-center gap-1.5"><CheckCircle2 size={12} /> Occupied</span>;
      case 'Vacant':
        return <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-100 flex items-center gap-1.5"><AlertCircle size={12} /> Vacant</span>;
      case 'Maintenance':
        return <span className="px-3 py-1 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-rose-100 flex items-center gap-1.5"><Wrench size={12} /> Repair</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Units Inventory</h2>
          <p className="text-slate-500 mt-1 font-medium italic">Managing {MOCK_UNITS.length} distinct residential and commercial assets.</p>
        </div>
        
        <button 
          onClick={() => navigate('/units/create')}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center gap-2 active:scale-95 shrink-0"
        >
          <Plus size={20} /> Add New Unit
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Units" value={MOCK_UNITS.length} icon={Layout} color="bg-blue-500 text-blue-500" />
        <StatCard label="Occupancy Rate" value={`${((MOCK_UNITS.filter(u => u.status === 'Occupied').length / MOCK_UNITS.length) * 100).toFixed(1)}%`} icon={TrendingUp} color="bg-emerald-500 text-emerald-500" />
        <StatCard label="Vacant Assets" value={MOCK_UNITS.filter(u => u.status === 'Vacant').length} icon={AlertCircle} color="bg-amber-500 text-amber-500" />
        <StatCard label="Projected Rev" value={`$${MOCK_UNITS.reduce((sum, u) => sum + u.price, 0).toLocaleString()}`} icon={CreditCard} color="bg-indigo-500 text-indigo-500" />
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Search by unit name, property, or number..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-semibold text-slate-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
          {(['all', 'Occupied', 'Vacant', 'Maintenance'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                statusFilter === status 
                  ? 'bg-slate-900 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/80 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
              <th className="px-8 py-5 text-left">Inventory Item</th>
              <th className="px-6 py-5 text-left">Property Location</th>
              <th className="px-6 py-5 text-left">Status</th>
              <th className="px-6 py-5 text-right">Pricing /mo</th>
              <th className="px-8 py-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredUnits.length > 0 ? filteredUnits.map((unit) => (
              <tr 
                key={unit.id} 
                className="group hover:bg-blue-50/30 transition-colors cursor-pointer"
                onClick={() => navigate(`/units/${unit.id}`)}
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 text-sm shadow-sm group-hover:bg-white transition-colors">
                      <Layout size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{unit.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Unit #{unit.number}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <Building2 size={14} className="text-slate-300" />
                      {unit.propertyName}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      <MapPin size={12} className="text-slate-200" />
                      Property ID: {unit.propertyId}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  {getStatusBadge(unit.status)}
                </td>
                <td className="px-6 py-6 text-right">
                  <p className="text-base font-black text-slate-900">${unit.price.toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Base Market Rate</p>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate(`/units/${unit.id}`); }}
                      className="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 rounded-xl transition-all"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="py-24 text-center">
                  <div className="flex flex-col items-center gap-4 text-slate-400">
                    <Layout size={64} className="opacity-20" />
                    <div>
                      <p className="text-lg font-bold text-slate-900">No inventory units found</p>
                      <p className="font-medium">Adjust your search or add new assets.</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnitsListPage;
