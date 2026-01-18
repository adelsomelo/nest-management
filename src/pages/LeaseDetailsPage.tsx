
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  FileText, 
  DollarSign, 
  ShieldCheck, 
  Clock, 
  AlertTriangle,
  ExternalLink,
  Users,
  Building2,
  Layout,
  Download,
  Printer,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { type Lease } from '../types';

const LeaseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Mock Lease Data
  const lease: Lease = {
    id: id || 'L-1001',
    tenantId: '1',
    tenantName: 'Alex Rivera',
    unitId: 'u101',
    unitName: 'Penthouse A-1',
    propertyId: 'p3',
    propertyName: 'Harbor View Apartments',
    startDate: '2023-01-15',
    endDate: '2025-01-15',
    monthlyRent: 3450,
    deposit: 6900,
    status: 'active'
  };

  const totalContractValue = useMemo(() => {
    const start = new Date(lease.startDate);
    const end = new Date(lease.endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return months * lease.monthlyRent;
  }, [lease]);

  const progress = useMemo(() => {
    const start = new Date(lease.startDate).getTime();
    const end = new Date(lease.endDate).getTime();
    const now = new Date().getTime();
    const total = end - start;
    const elapsed = now - start;
    return Math.min(Math.max(Math.round((elapsed / total) * 100), 0), 100);
  }, [lease]);

  const StatBlock = ({ label, value, icon: Icon, colorClass }: any) => (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-5 group hover:shadow-md transition-all">
      <div className={`p-4 rounded-2xl bg-slate-50 ${colorClass} group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-xl font-black text-slate-900 leading-tight">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <button 
            onClick={() => navigate('/leases')}
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-all shadow-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Lease Agreement {lease.id}</h2>
              <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                lease.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
              }`}>
                {lease.status}
              </span>
            </div>
            <p className="text-slate-500 font-medium">Digital Contract executed on <span className="font-bold text-slate-700">{lease.startDate}</span></p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-slate-600 rounded-2xl shadow-sm transition-all">
            <Printer size={20} />
          </button>
          <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <Download size={18} /> Export PDF
          </button>
          <button 
            onClick={() => navigate(`/leases/${id}/edit`)}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95"
          >
            Manage Terms
          </button>
        </div>
      </div>

      {/* Financial Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatBlock label="Monthly Installment" value={`$${lease.monthlyRent.toLocaleString()}`} icon={DollarSign} colorClass="text-blue-600" />
        <StatBlock label="Security Deposit" value={`$${lease.deposit.toLocaleString()}`} icon={ShieldCheck} colorClass="text-emerald-600" />
        <StatBlock label="Term Duration" value="24 Months" icon={Clock} colorClass="text-indigo-600" />
        <StatBlock label="Total Contract Value" value={`$${totalContractValue.toLocaleString()}`} icon={TrendingUp} colorClass="text-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          
          {/* Contract Progress */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-xl shadow-slate-200/40 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Term Maturity</h3>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Clock size={14} /> Ends in 14 Months
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-widest">
                <span>{lease.startDate}</span>
                <span>{progress}% Completed</span>
                <span>{lease.endDate}</span>
              </div>
              <div className="h-5 bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner border border-slate-200">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 shadow-sm"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div onClick={() => navigate(`/tenants/${lease.tenantId}`)} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Users size={24} />
                  </div>
                  <ExternalLink size={16} className="text-slate-300 group-hover:text-blue-500" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resident</p>
                <h4 className="font-black text-slate-900 truncate">{lease.tenantName}</h4>
              </div>

              <div onClick={() => navigate(`/properties/${lease.propertyId}`)} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:border-emerald-200 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm text-emerald-600 border border-slate-100 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Building2 size={24} />
                  </div>
                  <ExternalLink size={16} className="text-slate-300 group-hover:text-emerald-500" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Portfolio Asset</p>
                <h4 className="font-black text-slate-900 truncate">{lease.propertyName}</h4>
              </div>

              <div onClick={() => navigate(`/units/${lease.unitId}`)} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:border-indigo-200 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600 border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Layout size={24} />
                  </div>
                  <ExternalLink size={16} className="text-slate-300 group-hover:text-indigo-500" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit Inventory</p>
                <h4 className="font-black text-slate-900 truncate">{lease.unitName}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 space-y-8 shadow-sm sticky top-40">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100">
                <FileText size={20} />
              </div>
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Agreement Artifacts</h4>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Master_Lease_v1.pdf', type: 'Primary Contract', icon: FileText, color: 'text-blue-600' },
                { name: 'Rules_of_Occupancy.pdf', type: 'Addendum', icon: ShieldCheck, color: 'text-emerald-600' },
                { name: 'Payment_Schedule.csv', type: 'Financial', icon: DollarSign, color: 'text-amber-600' }
              ].map((doc, idx) => (
                <div key={idx} className="p-4 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-md rounded-2xl transition-all flex items-center gap-4 cursor-pointer group">
                  <div className={`p-2.5 bg-white rounded-xl shadow-sm ${doc.color}`}>
                    <doc.icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-slate-900 truncate group-hover:text-blue-600 transition-colors">{doc.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{doc.type}</p>
                  </div>
                  <Download size={14} className="text-slate-300 group-hover:text-blue-500" />
                </div>
              ))}
            </div>

            <div className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100 space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <h5 className="text-xs font-black text-emerald-900 uppercase tracking-widest">Compliance Status</h5>
              </div>
              <p className="text-xs font-medium text-emerald-800 leading-relaxed">
                This agreement is currently <span className="font-black underline">Fully Compliant</span> with local housing regulations and portfolio guidelines.
              </p>
            </div>

            <button className="w-full py-4 bg-rose-50 hover:bg-rose-100 text-rose-600 font-black rounded-2xl border border-rose-100 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
              <AlertTriangle size={18} /> Initiate Termination
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaseDetailsPage;
