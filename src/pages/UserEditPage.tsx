
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  UserCog, 
  Save, 
  Mail, 
  Shield, 
  Activity, 
  Loader2,
  ShieldCheck,
  ShieldAlert,
  User,
  Trash2,
  Lock,
  Globe,
  Bell
} from 'lucide-react';
import { AppUser } from '../types';
import { useTranslation } from '../App';

const UserEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState<AppUser>({
    id: id || 'u-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@propmanage.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '10 mins ago'
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsSaving(false);
    navigate('/users');
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to revoke this user's access?")) {
      setIsDeleting(true);
      await new Promise(r => setTimeout(r, 1000));
      navigate('/users');
    }
  };

  const inputClasses = "w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300 bg-white";
  const labelClasses = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block";

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/users')}
            className="p-3 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t.users.edit}</h2>
            <p className="text-slate-500 font-medium italic">Adjusting permissions for {formData.firstName} {formData.lastName}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-6 py-3 border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 font-bold rounded-xl transition-all flex items-center gap-2"
          >
            {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
            Revoke Access
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center gap-2 active:scale-95"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Update Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <form onSubmit={handleSave} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 p-10 space-y-10">
            
            {/* Identity Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">1</div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Identity & Contact</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className={labelClasses}>First Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                      required 
                      type="text" 
                      className={inputClasses} 
                      value={formData.firstName} 
                      onChange={e => setFormData({...formData, firstName: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClasses}>Last Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                      required 
                      type="text" 
                      className={inputClasses} 
                      value={formData.lastName} 
                      onChange={e => setFormData({...formData, lastName: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className={labelClasses}>Business Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                      required 
                      type="email" 
                      className={inputClasses} 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Access Level & Status */}
            <div className="space-y-6 pt-10 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black">2</div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Access Control</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className={labelClasses}>Platform Role</label>
                  <div className="relative group">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <select 
                      className={inputClasses} 
                      value={formData.role} 
                      onChange={e => setFormData({...formData, role: e.target.value as any})}
                    >
                      <option value="Admin">Full Administrator</option>
                      <option value="Manager">Property Manager</option>
                      <option value="Viewer">Read-Only Viewer</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={labelClasses}>Account Status</label>
                  <div className="grid grid-cols-2 gap-2 h-[60px]">
                    {['Active', 'Inactive'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFormData({...formData, status: s as any})}
                        className={`rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                          formData.status === s 
                            ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                            : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button 
                type="button" 
                onClick={() => navigate('/users')} 
                className="px-8 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isSaving} 
                className="px-12 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center gap-3 active:scale-95"
              >
                {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                Confirm Changes
              </button>
            </div>
          </form>
        </div>

        {/* Info Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-8 shadow-sm sticky top-40 overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <ShieldCheck size={120} />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-500/30">
                  <Lock size={20} className="text-blue-400" />
                </div>
                <h4 className="font-black text-slate-100 uppercase tracking-widest text-xs">Security Context</h4>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Globe size={18} className="text-blue-300" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-blue-300 tracking-tight">Access Domain</p>
                    <p className="text-sm font-medium text-slate-300">Global Portfolio Access</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Bell size={18} className="text-emerald-300" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-emerald-300 tracking-tight">Audit Log</p>
                    <p className="text-sm font-medium text-slate-300">Changes will be logged under admin_system.</p>
                  </div>
                </div>

                <div className="p-5 bg-white/5 border border-white/10 rounded-2xl mt-4">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Last System Activity</p>
                   <p className="text-xs font-bold text-white">{formData.lastLogin}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditPage;
