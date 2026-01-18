
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Search, 
  UserPlus, 
  Mail, 
  Phone, 
  Calendar, 
  MoreVertical, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  CreditCard,
  MessageSquare,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { Tenant } from '../types';
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

const TenantsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'past'>('all');

  useEffect(() => {
    apiService.getTenants()
      .then(data => setTenants(data.length > 0 ? data : [
        {
          id: '1',
          fullName: 'Alex Rivera',
          email: 'alex.r@example.com',
          phone: '(415) 555-1234',
          leaseStart: '2023-01-15',
          leaseEnd: '2024-01-15',
          rentAmount: 3450,
          status: 'active'
        },
        {
          id: '2',
          fullName: 'Sarah Jenkins',
          email: 'sarah.j@example.com',
          phone: '(415) 555-5678',
          leaseStart: '2023-06-01',
          leaseEnd: '2024-06-01',
          rentAmount: 2800,
          status: 'active'
        }
      ]))
      .finally(() => setLoading(false));
  }, []);

  const filteredTenants = useMemo(() => {
    return tenants.filter(t => {
      const matchesSearch = t.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tenants, searchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100 flex items-center gap-1.5"><CheckCircle size={12} /> Active</span>;
      case 'pending':
        return <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-100 flex items-center gap-1.5"><Clock size={12} /> Pending</span>;
      case 'past':
        return <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-200 flex items-center gap-1.5"><AlertCircle size={12} /> Past</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Tenant Registry</h2>
          <p className="text-slate-500 mt-1 font-medium italic">Managing {tenants.length} occupants across your portfolio.</p>
        </div>
        
        <button 
          onClick={() => navigate('/tenants/create')}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center gap-2 active:scale-95 shrink-0"
        >
          <UserPlus size={20} /> Add New Tenant
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Occupants" value={tenants.length} icon={Users} color="bg-blue-500 text-blue-500" />
        <StatCard label="Active Leases" value={tenants.filter(t => t.status === 'active').length} icon={TrendingUp} color="bg-emerald-500 text-emerald-500" />
        <StatCard label="Pending Approval" value={tenants.filter(t => t.status === 'pending').length} icon={Clock} color="bg-amber-500 text-amber-500" />
        <StatCard label="Monthly Rev" value={`$${tenants.reduce((sum, t) => sum + (t.status === 'active' ? t.rentAmount : 0), 0).toLocaleString()}`} icon={CreditCard} color="bg-indigo-500 text-indigo-500" />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Search by tenant name or email..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-semibold text-slate-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
          {(['all', 'active', 'pending', 'past'] as const).map((status) => (
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
            <p className="font-bold text-xs uppercase tracking-[0.2em]">Synchronizing Registry...</p>
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="px-8 py-5 text-left">Tenant Profile</th>
                <th className="px-6 py-5 text-left">Contact Intel</th>
                <th className="px-6 py-5 text-left">Lease Term</th>
                <th className="px-6 py-5 text-left">Status</th>
                <th className="px-6 py-5 text-right">Rent Value</th>
                <th className="px-8 py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTenants.length > 0 ? filteredTenants.map((tenant) => (
                <tr 
                  key={tenant.id} 
                  className="group hover:bg-blue-50/30 transition-colors cursor-pointer"
                  onClick={() => navigate(`/tenants/${tenant.id}`)}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white text-sm shadow-lg shadow-blue-200">
                        {tenant.fullName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{tenant.fullName}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">ID: #{tenant.id.toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <Mail size={14} className="text-slate-300" />
                        {tenant.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <Phone size={14} className="text-slate-300" />
                        {tenant.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-black text-slate-800">
                        <Calendar size={14} className="text-blue-400" />
                        {tenant.leaseStart} <ChevronRight size={10} className="text-slate-300" /> {tenant.leaseEnd}
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Fixed Term Lease</p>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    {getStatusBadge(tenant.status)}
                  </td>
                  <td className="px-6 py-6 text-right">
                    <p className="text-base font-black text-slate-900">${tenant.rentAmount.toLocaleString()}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); }} // Prevent row click
                        className="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 rounded-xl transition-all"
                      >
                        <MessageSquare size={18} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); }} // Prevent row click
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
                      <Users size={64} className="opacity-20" />
                      <div>
                        <p className="text-lg font-bold text-slate-900">No tenants found</p>
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

export default TenantsListPage;
