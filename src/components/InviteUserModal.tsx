
import React, { useState } from 'react';
import { X, UserPlus, Mail, User, Shield, ShieldCheck, ShieldAlert, Loader2, Send, CheckCircle2 } from 'lucide-react';
import { AppUser } from '../types';

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (user: Partial<AppUser>) => void;
}

const InviteUserModal: React.FC<InviteUserModalProps> = ({ isOpen, onClose, onInvite }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<AppUser>>({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Manager'
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API process
    await new Promise(r => setTimeout(r, 1500));
    onInvite(formData);
    setIsSubmitting(false);
    onClose();
    setFormData({ firstName: '', lastName: '', email: '', role: 'Manager' });
  };

  const roles = [
    { 
      id: 'Admin', 
      label: 'Administrator', 
      desc: 'Full system access & user management', 
      icon: ShieldCheck, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50' 
    },
    { 
      id: 'Manager', 
      label: 'Property Manager', 
      desc: 'Manage assets, units and tenants', 
      icon: Shield, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50' 
    },
    { 
      id: 'Viewer', 
      label: 'Read-Only Viewer', 
      desc: 'View reports and portfolio status only', 
      icon: User, 
      color: 'text-slate-400', 
      bg: 'bg-slate-50' 
    },
  ];

  const inputClasses = "w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-semibold text-slate-800 placeholder:text-slate-300 bg-white";
  const labelClasses = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
              <UserPlus size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Invite Platform User</h3>
              <p className="text-sm text-slate-500 font-medium">Grant administrative access to your workspace</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          {/* Identity Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className={labelClasses}>First Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  required 
                  type="text" 
                  className={inputClasses} 
                  value={formData.firstName} 
                  onChange={e => setFormData({...formData, firstName: e.target.value})} 
                  placeholder="John" 
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className={labelClasses}>Last Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  required 
                  type="text" 
                  className={inputClasses} 
                  value={formData.lastName} 
                  onChange={e => setFormData({...formData, lastName: e.target.value})} 
                  placeholder="Doe" 
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className={labelClasses}>Business Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  required 
                  type="email" 
                  className={inputClasses} 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  placeholder="j.doe@propmanage.com" 
                />
              </div>
            </div>
          </div>

          {/* Role Selection Section */}
          <div className="space-y-3">
            <label className={labelClasses}>Assigned Permission Role</label>
            <div className="grid grid-cols-1 gap-3">
              {roles.map((role) => {
                const isSelected = formData.role === role.id;
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setFormData({...formData, role: role.id as any})}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group ${
                      isSelected 
                        ? 'border-blue-600 bg-blue-50/50 shadow-md ring-4 ring-blue-500/5' 
                        : 'border-slate-100 hover:border-slate-200 bg-white'
                    }`}
                  >
                    <div className={`p-3 rounded-xl transition-colors ${isSelected ? 'bg-blue-600 text-white' : `${role.bg} ${role.color}`}`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-black uppercase tracking-tight ${isSelected ? 'text-blue-600' : 'text-slate-800'}`}>
                        {role.label}
                      </p>
                      <p className="text-xs font-medium text-slate-500">{role.desc}</p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        <CheckCircle2 size={16} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-8 py-4 text-slate-400 font-bold hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || !formData.email || !formData.firstName}
              className="px-12 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center gap-3 active:scale-95"
            >
              {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteUserModal;
