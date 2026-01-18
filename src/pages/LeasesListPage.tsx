
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Plus, 
  Calendar, 
  Building2, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  FileSearch,
  ArrowUpRight,
  Layout,
  Home,
  Loader2
} from 'lucide-react';
import {type Lease } from '../types';
import { apiService } from '../services/apiService';

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

const LeasesListPage: React.FC = () => {
  const navigate = useNavigate();
  const [leases, setLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expiring' | 'expired' | 'pending'>('all');

  useEffect(() => {
    apiService.getLeases()
      .then(data => setLeases(data.length > 0 ? data : [
        {
          id: 'L-1001',
          tenantId: '1',
          tenantName: 'Alex Rivera',
          unitId: 'u101',
          unitName: 'Penthouse A-1',
          propertyId: 'p3',
          propertyName: 'Harbor View Apartments',
          startDate: '2023-01-15',
          endDate: '2024-01-15',
          monthlyRent: 3450,
          deposit: 6900,
          status: 'active'
        }
      ]))
      .finally(() => setLoading(false));
  }, []);

  const filteredLeases = useMemo(() => {
    return leases.filter(l => {
      const matchesSearch = l.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, leases]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100 flex items-center gap-1.5"><CheckCircle2 size={12} /> Active</span>;
      case 'expiring':
        return <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-100 flex items-center gap-1.5"><AlertTriangle size={12} /> Expiring</span>;
      case 'pending':
        return <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100 flex items-center gap-1.5"><Clock size={12} /> Pending</span>;
      case 'expired':
        return <span className="px-3 py-1 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-rose-100 flex items-center gap-1.5"><ArrowUpRight size={12} /> Expired</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Lease Agreements</h2>
          <p className="text-slate-500 mt-1 font-medium italic">Overseeing {leases.length} contractual obligations and asset occupancy.</p>
        </div>
        
        <button 
          onClick={() => navigate('/leases/create')}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center gap-2 active:scale-95 shrink-0"
        >
          <Plus size={20} /> Create New Lease
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Active Leases" value={leases.filter(l => l.status === 'active').length} icon={ShieldCheck} color="bg-emerald-500 text-emerald-500" />
        <StatCard label="Expiring Soon" value={leases.filter(l => l.status === 'expiring').length} icon={AlertTriangle} color="bg-amber-500 text-amber-500" />
        <StatCard label="Pending Sig" value={leases.filter(l => l.status === 'pending').length} icon={FileSearch} color="bg-blue-500 text-blue-500" />
        <StatCard label="Contract Value" value={`$${leases.reduce((sum, l) => sum + l.monthlyRent, 0).toLocaleString()}`} icon={TrendingUp} color="bg-indigo-500 text-indigo-500" />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Search by tenant or property..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-semibold text-slate-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
          {(['all', 'active', 'expiring', 'pending', 'expired'] as const).map((status) => (
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

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden overflow-x-auto">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4 text-slate-400">
            <Loader2 size={40} className="animate-spin text-blue-600" />
            <p className="font-bold text-xs uppercase tracking-[0.2em]">Retreiving Agreements...</p>
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="px-8 py-5 text-left">Lease Identifier</th>
                <th className="px-6 py-5 text-left">Tenant Info</th>
                <th className="px-6 py-5 text-left">Unit / Property</th>
                <th className="px-6 py-5 text-left">Term Duration</th>
                <th className="px-6 py-5 text-left">Status</th>
                <th className="px-8 py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLeases.length > 0 ? filteredLeases.map((lease) => (
                <tr 
                  key={lease.id} 
                  className="group hover:bg-blue-50/30 transition-colors cursor-pointer"
                  onClick={() => navigate(`/leases/${lease.id}`)}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-blue-600 transition-all shadow-sm">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{lease.id}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Contract v2.4</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-100">
                        {lease.tenantName.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{lease.tenantName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                        {lease.unitName ? <Layout size={14} className="text-slate-400" /> : <Home size={14} className="text-emerald-500" />}
                        {lease.unitName || <span className="text-emerald-600 font-black tracking-tighter uppercase text-[10px]">Full Building</span>}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                        <Building2 size={12} className="text-slate-300" />
                        {lease.propertyName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-black text-slate-800">
                        <Calendar size={14} className="text-blue-400" />
                        {lease.startDate} <ChevronRight size={10} className="text-slate-300" /> {lease.endDate}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    {getStatusBadge(lease.status)}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/leases/${lease.id}`);
                        }}
                        className="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 rounded-xl transition-all"
                      >
                        <FileSearch size={18} />
                      </button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 rounded-xl transition-all"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-4 text-slate-400">
                      <FileText size={64} className="opacity-20" />
                      <div>
                        <p className="text-lg font-bold text-slate-900">No leases found</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LeasesListPage;
