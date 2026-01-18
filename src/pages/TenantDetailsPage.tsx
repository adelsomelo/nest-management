
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  ShieldCheck, 
  MessageSquare, 
  FileText, 
  Building2, 
  Layout, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Pencil,
  ExternalLink
} from 'lucide-react';
import { type Tenant } from '../types';

const DetailCard = ({ label, value, icon: Icon, colorClass = "text-blue-600", bgClass = "bg-blue-50" }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-5 group hover:shadow-md transition-all">
    <div className={`p-4 rounded-2xl ${bgClass} ${colorClass} group-hover:scale-110 transition-transform`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
      <p className="text-xl font-black text-slate-900 leading-tight">{value}</p>
    </div>
  </div>
);

const TenantDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock Tenant Data - in real app fetch via apiService
  const tenant: Tenant = {
    id: id || '1',
    fullName: 'Alex Rivera',
    email: 'alex.r@example.com',
    phone: '(415) 555-1234',
    leaseStart: '2023-01-15',
    leaseEnd: '2025-01-15',
    rentAmount: 3450,
    status: 'active'
  };

  const propertyContext = "Harbor View Apartments";
  const unitContext = "Penthouse A-1";

  const leaseProgress = useMemo(() => {
    const start = new Date(tenant.leaseStart).getTime();
    const end = new Date(tenant.leaseEnd).getTime();
    const now = new Date().getTime();
    const total = end - start;
    const progress = now - start;
    return Math.min(Math.max(Math.round((progress / total) * 100), 0), 100);
  }, [tenant]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <button 
            onClick={() => navigate('/tenants')}
            className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-all shadow-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white text-xl shadow-xl shadow-blue-200">
              {tenant.fullName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{tenant.fullName}</h2>
                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                  tenant.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  {tenant.status}
                </span>
              </div>
              <p className="text-slate-500 font-medium flex items-center gap-2">
                Resident ID: <span className="font-bold text-slate-700">#{tenant.id.toUpperCase()}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300 mx-1" />
                Linked to {propertyContext}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <MessageSquare size={18} /> Message
          </button>
          <button 
            onClick={() => navigate(`/tenants/${id}/edit`)}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center gap-2 active:scale-95"
          >
            <Pencil size={18} /> Edit Profile
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DetailCard label="Monthly Rent" value={`$${tenant.rentAmount.toLocaleString()}`} icon={DollarSign} colorClass="text-emerald-600" bgClass="bg-emerald-50" />
        <DetailCard label="Lease Start" value={tenant.leaseStart} icon={Calendar} colorClass="text-blue-600" bgClass="bg-blue-50" />
        <DetailCard label="Lease End" value={tenant.leaseEnd} icon={Clock} colorClass="text-amber-600" bgClass="bg-amber-50" />
        <DetailCard label="Verification" value="Verified" icon={ShieldCheck} colorClass="text-indigo-600" bgClass="bg-indigo-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Info */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Lease Progress & Asset Mapping */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-xl shadow-slate-200/40 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Lease Lifecycle</h3>
              <div className="flex items-center gap-2 text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                <CheckCircle2 size={14} /> Active Obligation
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-widest">
                <span>Contract Start</span>
                <span>{leaseProgress}% Completed</span>
                <span>Contract Maturity</span>
              </div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner border border-slate-200">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 shadow-sm"
                  style={{ width: `${leaseProgress}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div 
                onClick={() => navigate(`/properties/3`)} // Mock link
                className="p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600 border border-slate-100">
                    <Building2 size={24} />
                  </div>
                  <ExternalLink size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Linked Property</p>
                <h4 className="font-black text-slate-900">{propertyContext}</h4>
              </div>

              <div 
                onClick={() => navigate(`/units/u101`)} // Mock link
                className="p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600 border border-slate-100">
                    <Layout size={24} />
                  </div>
                  <ExternalLink size={18} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Unit</p>
                <h4 className="font-black text-slate-900">{unitContext}</h4>
              </div>
            </div>
          </div>
          
          {/* Tenant Contact Information Section */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-xl shadow-slate-200/40 space-y-6">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Direct Contact Intel</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                  <p className="font-bold text-slate-700">{tenant.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                  <p className="font-bold text-slate-700">{tenant.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 space-y-8 shadow-sm sticky top-40">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100">
                <AlertCircle size={20} />
              </div>
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Vital Documents</h4>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Lease_Agreement_v2.pdf', date: 'Jan 10, 2023', icon: FileText, color: 'text-blue-600' },
                { name: 'Security_Deposit_Receipt.pdf', date: 'Jan 12, 2023', icon: CheckCircle2, color: 'text-emerald-600' },
                { name: 'Background_Check_Report.pdf', date: 'Jan 05, 2023', icon: ShieldCheck, color: 'text-indigo-600' }
              ].map((doc, idx) => (
                <div key={idx} className="p-4 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-md rounded-2xl transition-all flex items-center gap-4 cursor-pointer group">
                  <div className={`p-2.5 bg-white rounded-xl shadow-sm ${doc.color}`}>
                    <doc.icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-slate-900 truncate group-hover:text-blue-600 transition-colors">{doc.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{doc.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100 space-y-4">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-blue-600" />
                <h5 className="text-xs font-black text-blue-900 uppercase tracking-widest">Next Action</h5>
              </div>
              <p className="text-xs font-medium text-blue-800 leading-relaxed">
                Lease renewal discussion scheduled for <span className="font-black underline">Nov 2024</span>. Automated reminder set for 60 days prior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantDetailsPage;
