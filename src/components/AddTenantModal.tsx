
import React, { useState, useMemo } from 'react';
import { Tenant } from '../types';
import { X, Search, Check, UserPlus, ClipboardList, PlusCircle } from 'lucide-react';

interface AddTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBatch: (tenants: Tenant[]) => void;
  propertyName: string;
  availableTenants: Tenant[];
}

type TabMode = 'select' | 'create';

const AddTenantModal: React.FC<AddTenantModalProps> = ({ isOpen, onClose, onAddBatch, propertyName, availableTenants }) => {
  const [activeTab, setActiveTab] = useState<TabMode>('select');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // New Tenant Form State
  const [newTenant, setNewTenant] = useState<Partial<Tenant>>({
    fullName: '',
    email: '',
    phone: '',
    leaseStart: '',
    leaseEnd: '',
    rentAmount: 0
  });

  const filteredPool = useMemo(() => {
    return availableTenants.filter(t => 
      t.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availableTenants, searchTerm]);

  if (!isOpen) return null;

  const toggleSelection = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleConfirmSelection = () => {
    const selectedTenants = availableTenants.filter(t => selectedIds.has(t.id));
    onAddBatch(selectedTenants);
    resetAndClose();
  };

  const handleCreateConfirm = () => {
    const created: Tenant = {
      ...newTenant as Tenant,
      id: Math.random().toString(36).substr(2, 9),
      status: 'active'
    };
    onAddBatch([created]);
    resetAndClose();
  };

  const resetAndClose = () => {
    onClose();
    setSelectedIds(new Set());
    setSearchTerm('');
    setNewTenant({ fullName: '', email: '', phone: '', leaseStart: '', leaseEnd: '', rentAmount: 0 });
    setActiveTab('select');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col h-[85vh] border border-slate-200">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <UserPlus className="text-blue-600" size={28} /> Add Tenant
            </h3>
            <p className="text-sm text-slate-500 font-medium">Managing occupants for {propertyName}</p>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X size={24} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex px-8 bg-slate-50/50 border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('select')}
            className={`flex items-center gap-2 py-4 px-6 text-sm font-bold transition-all relative ${
              activeTab === 'select' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <ClipboardList size={18} />
            Registry
            {activeTab === 'select' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-2 py-4 px-6 text-sm font-bold transition-all relative ${
              activeTab === 'create' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <PlusCircle size={18} />
            Create New
            {activeTab === 'create' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'select' ? (
            <div className="animate-in fade-in slide-in-from-left-4">
              <div className="px-8 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
                <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search global registry..." 
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                  />
                </div>
              </div>

              {filteredPool.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <tr>
                      <th className="w-16 px-8 py-3"></th>
                      <th className="px-4 py-3 text-left">Tenant Name</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">Rent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredPool.map(tenant => {
                      const isSelected = selectedIds.has(tenant.id);
                      return (
                        <tr key={tenant.id} onClick={() => toggleSelection(tenant.id)} className={`cursor-pointer transition-colors ${isSelected ? 'bg-blue-50' : 'hover:bg-slate-50'}`}>
                          <td className="px-8 py-5">
                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200'}`}>
                              {isSelected && <Check size={14} />}
                            </div>
                          </td>
                          <td className="px-4 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">{tenant.fullName.charAt(0)}</div>
                              <span className="text-sm font-bold text-slate-800">{tenant.fullName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-5 text-sm font-medium text-slate-500">{tenant.email}</td>
                          <td className="px-4 py-5 text-sm font-bold text-slate-800">${tenant.rentAmount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Search size={32} />
                  </div>
                  <p className="font-bold">No tenants found in registry</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4">
              {/* Form Section */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-semibold text-slate-800"
                    value={newTenant.fullName}
                    onChange={e => setNewTenant({...newTenant, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-semibold text-slate-800"
                    value={newTenant.email}
                    onChange={e => setNewTenant({...newTenant, email: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="(555) 123-4567"
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-semibold text-slate-800"
                    value={newTenant.phone}
                    onChange={e => setNewTenant({...newTenant, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Monthly Rent ($)</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-semibold text-slate-800"
                    value={newTenant.rentAmount || ''}
                    onChange={e => setNewTenant({...newTenant, rentAmount: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lease Start</label>
                  <input 
                    type="date" 
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-semibold text-slate-800"
                    value={newTenant.leaseStart}
                    onChange={e => setNewTenant({...newTenant, leaseStart: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lease End</label>
                  <input 
                    type="date" 
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-semibold text-slate-800"
                    value={newTenant.leaseEnd}
                    onChange={e => setNewTenant({...newTenant, leaseEnd: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div>
            {activeTab === 'select' ? (
              <span className="text-sm font-bold text-slate-500">{selectedIds.size} tenants selected</span>
            ) : (
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manual Creation Mode</span>
            )}
          </div>
          
          <div className="flex gap-4">
            <button onClick={onClose} className="px-6 py-3 text-sm font-bold text-slate-500 hover:bg-slate-200 rounded-2xl transition-all">Cancel</button>
            
            {activeTab === 'select' ? (
              <button 
                onClick={handleConfirmSelection} 
                disabled={selectedIds.size === 0} 
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95"
              >
                Confirm Addition
              </button>
            ) : (
              <button 
                onClick={handleCreateConfirm} 
                disabled={!newTenant.fullName || !newTenant.email}
                className="px-10 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center gap-2"
              >
                <UserPlus size={20} />
                Create & Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTenantModal;
