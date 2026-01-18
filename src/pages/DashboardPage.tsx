
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Building2, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Briefcase,
  Calendar,
  AlertCircle,
  Wallet
} from 'lucide-react';
import { useTranslation } from '../App';

const MOCK_FINANCIALS = {
  monthlyRevenue: 192500,
  monthlyExpenses: 48200,
  occupancyRate: 88.5,
  growthRate: 12.4,
  portfolioValue: 12400000,
  properties: [
    { name: 'Harbor View Apartments', revenue: 45000, costs: 12000, units: 24, occupied: 18 },
    { name: 'Tech Plaza Commercial', revenue: 85000, costs: 22000, units: 12, occupied: 10 },
    { name: 'Sunset Heights Lofts', revenue: 62500, costs: 14200, units: 30, occupied: 12 }
  ],
  recentTransactions: [
    { id: 'T-101', type: 'Rent Payment', amount: 3450, tenant: 'Alex Rivera', status: 'Success', date: 'Today' },
    { id: 'T-102', type: 'Maintenance', amount: -450, tenant: 'N/A', status: 'Pending', date: 'Today' },
    { id: 'T-103', type: 'Rent Payment', amount: 2800, tenant: 'Sarah Jenkins', status: 'Success', date: 'Yesterday' }
  ]
};

const StatCard = ({ label, value, trend, icon: Icon, isCurrency = false }: { label: string, value: number | string, trend?: number, icon: any, isCurrency?: boolean }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group">
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 bg-slate-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
        <Icon size={24} />
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-xs font-black ${trend >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-2xl font-black text-slate-900 leading-tight">
      {isCurrency ? `$${Number(value).toLocaleString()}` : value}
    </h3>
  </div>
);

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">{t.dashboard.title}</h2>
          <p className="text-slate-500 mt-1 font-medium italic">{t.dashboard.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2 text-xs">
            <Calendar size={18} /> Last 30 Days
          </button>
           <button className="px-6 py-2.5 bg-blue-600 text-white font-black rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center gap-2 active:scale-95 text-xs">
            <DollarSign size={18} /> Generate Report
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label={t.dashboard.revenue} value={MOCK_FINANCIALS.monthlyRevenue} trend={MOCK_FINANCIALS.growthRate} icon={DollarSign} isCurrency />
        <StatCard label={t.dashboard.expenses} value={MOCK_FINANCIALS.monthlyExpenses} trend={-2.4} icon={Wallet} isCurrency />
        <StatCard label={t.dashboard.noi} value={MOCK_FINANCIALS.monthlyRevenue - MOCK_FINANCIALS.monthlyExpenses} trend={15.2} icon={TrendingUp} isCurrency />
        <StatCard label={t.dashboard.occupancy} value={`${MOCK_FINANCIALS.occupancyRate}%`} trend={-0.5} icon={Users} />
      </div>

      {/* Portfolio Performance Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Portfolio Value Card (Expanded) */}
        <div className="lg:col-span-12 bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
          <div className="absolute -right-8 -bottom-8 opacity-[0.03] pointer-events-none">
             <Building2 size={240} />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 w-full">
            <div className="p-5 bg-indigo-50 text-indigo-600 rounded-[2rem] inline-block shadow-sm">
              <Briefcase size={40} />
            </div>
            
            <div className="flex-1 space-y-1 text-center md:text-left">
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{t.dashboard.portfolio_value}</p>
              <h4 className="text-5xl font-black text-slate-900 tracking-tighter">${(MOCK_FINANCIALS.portfolioValue / 1000000).toFixed(1)}M</h4>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-2 text-emerald-600 text-sm font-black bg-emerald-50 px-5 py-2.5 rounded-2xl w-fit">
                <ArrowUpRight size={18} /> +8.2% vs last year
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {t.dashboard.unrealized}: <span className="text-slate-900 ml-1">$1.2M</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Performance & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Revenue Contribution</h3>
            <span className="text-[10px] font-bold text-slate-500 uppercase">By Property</span>
          </div>
          <div className="p-8 space-y-6">
            {MOCK_FINANCIALS.properties.map((property, idx) => {
              const profit = property.revenue - property.costs;
              const margin = (profit / property.revenue) * 100;
              const occupancy = (property.occupied / property.units) * 100;
              
              return (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{property.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">NOI: ${profit.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-900">${property.revenue.toLocaleString()}</p>
                      <span className={`text-[10px] font-black uppercase ${margin > 70 ? 'text-emerald-500' : 'text-blue-500'}`}>
                        {margin.toFixed(1)}% Margin
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden flex gap-0.5">
                    <div className="h-full bg-blue-600 rounded-l-full" style={{ width: `${occupancy}%` }} />
                    <div className="h-full bg-slate-200 rounded-r-full" style={{ width: `${100 - occupancy}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{t.dashboard.recent_ledger}</h3>
            <span className="text-[10px] font-bold text-slate-500 uppercase">{t.dashboard.live_activity}</span>
          </div>
          <div className="p-6 divide-y divide-slate-50">
            {MOCK_FINANCIALS.recentTransactions.map((tx) => (
              <div key={tx.id} className="py-4 flex items-center justify-between group cursor-pointer hover:bg-slate-50/50 transition-colors px-2 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl ${tx.amount > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {tx.amount > 0 ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{tx.type}</p>
                    <p className="text-[10px] font-medium text-slate-400">{tx.tenant}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-black ${tx.amount > 0 ? 'text-slate-900' : 'text-rose-600'}`}>
                    {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString()}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{tx.date}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-slate-50/50">
            <button className="w-full py-3 bg-white border border-slate-200 text-slate-600 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:border-blue-300 hover:text-blue-600 transition-all">
              {t.dashboard.view_all}
            </button>
          </div>
        </div>
      </div>

      {/* Warning Overlay */}
      <div className="bg-amber-50 border border-amber-200 rounded-[2rem] p-6 flex items-start gap-4 shadow-sm">
         <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
            <AlertCircle size={24} />
         </div>
         <div className="space-y-1">
            <h4 className="font-black text-amber-900 text-[10px] uppercase tracking-widest">{t.dashboard.maintenance_alert}</h4>
            <p className="text-xs text-amber-800 font-medium">
              Maintenance costs for <span className="font-bold underline">Tech Plaza Commercial</span> have increased by 14% this month.
            </p>
         </div>
      </div>
    </div>
  );
};

export default DashboardPage;
