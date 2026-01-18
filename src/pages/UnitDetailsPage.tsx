
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Unit } from '../types';
import { 
  ChevronLeft, 
  Hash, 
  DollarSign, 
  Activity, 
  Users, 
  Building, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Wrench
} from 'lucide-react';

const UnitDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock Unit Data
  const [unit] = useState<Unit>({
    id: id || 'u101',
    name: 'Penthouse A-1',
    number: 101,
    status: 'Occupied',
    price: 3450,
    propertyId: 'p3',
    tenants: [
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
        id: '201',
        fullName: 'Past Tenant Smith',
        email: 'smith@example.com',
        phone: '(415) 555-9999',
        leaseStart: '2021-01-01',
        leaseEnd: '2022-12-31',
        rentAmount: 3100,
        status: 'past'
      }
    ]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Occupied': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Vacant': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Maintenance': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Occupied': return <ShieldCheck size={18} />;
      case 'Vacant': return <AlertCircle size={18} />;
      case 'Maintenance': return <Wrench size={18} />;
      default: return <Activity size={18} />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-2"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Property
          </button>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{unit.name}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getStatusColor(unit.status)}`}>
              {getStatusIcon(unit.status)}
              {unit.status}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate(`/units/${id}/edit`)}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-all"
          >
            Edit Details
          </button>
          <button className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            Update Status
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Hash size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Unit Number</p>
            <p className="text-xl font-bold text-slate-900">{unit.number}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Rent</p>
            <p className="text-xl font-bold text-slate-900">${unit.price.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tenants</p>
            <p className="text-xl font-bold text-slate-900">{unit.tenants.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center">
            <Building size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Property ID</p>
            <p className="text-xl font-bold text-slate-900">{unit.propertyId}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Tenant History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Unit Occupancy History</h3>
                <p className="text-sm text-slate-500">Track current and past residents</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <th className="px-6 py-4">Tenant</th>
                    <th className="px-6 py-4">Lease Duration</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Rent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {unit.tenants.map(tenant => (
                    <tr key={tenant.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                            {tenant.fullName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{tenant.fullName}</p>
                            <p className="text-[10px] text-slate-500">{tenant.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar size={14} className="text-slate-400" />
                          <span>{tenant.leaseStart} <span className="text-slate-300">→</span> {tenant.leaseEnd}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${tenant.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                          {tenant.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-bold text-slate-800">${tenant.rentAmount}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar: Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800">Quick Configuration</h4>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all flex items-center justify-between group">
                <span className="text-sm font-medium text-slate-600">Download Lease Template</span>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all flex items-center justify-between group">
                <span className="text-sm font-medium text-slate-600">Schedule Inspection</span>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all flex items-center justify-between group">
                <span className="text-sm font-medium text-slate-600">View Utility Logs</span>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitDetailsPage;
