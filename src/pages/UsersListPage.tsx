
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserCog, 
  Search, 
  UserPlus, 
  Filter, 
  Mail, 
  Shield, 
  Clock, 
  MoreVertical, 
  CheckCircle2, 
  XCircle,
  ShieldCheck,
  User,
  Loader2
} from 'lucide-react';
import { AppUser } from '../types';
import { useTranslation } from '../App';
import { apiService } from '../services/apiService';
import InviteUserModal from '../components/InviteUserModal';

const UsersListPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getUsers()
      .then(data => setUsers(data.length > 0 ? data : [
        {
          id: 'u-1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@propmanage.com',
          role: 'Admin',
          status: 'Active',
          lastLogin: '10 mins ago'
        },
        {
          id: 'u-2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@propmanage.com',
          role: 'Manager',
          status: 'Active',
          lastLogin: '2 hours ago'
        }
      ]))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  const handleInviteUser = (newUser: Partial<AppUser>) => {
    const user: AppUser = {
      ...newUser as AppUser,
      id: `u-${Date.now()}`,
      status: 'Active',
      lastLogin: 'Never'
    };
    setUsers([user, ...users]);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return <ShieldCheck size={14} className="text-blue-600" />;
      case 'Manager': return <Shield size={14} className="text-emerald-600" />;
      default: return <User size={14} className="text-slate-400" />;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin': 
        return <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100 flex items-center gap-1.5">{getRoleIcon(role)} Admin</span>;
      case 'Manager': 
        return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100 flex items-center gap-1.5">{getRoleIcon(role)} Manager</span>;
      default: 
        return <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-200 flex items-center gap-1.5">{getRoleIcon(role)} Viewer</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">{t.users.title}</h2>
          <p className="text-slate-500 mt-1 font-medium italic">{t.users.subtitle}</p>
        </div>
        
        <button 
          onClick={() => setIsInviteModalOpen(true)} 
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center gap-2 active:scale-95 shrink-0"
        >
          <UserPlus size={20} /> {t.users.add}
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative group">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Search users by name, email or role..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-semibold text-slate-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-6 py-4 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-2xl shadow-sm flex items-center gap-2 font-bold transition-all text-xs">
          <Filter size={18} /> Filters
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden overflow-x-auto">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4 text-slate-400">
             <Loader2 size={40} className="animate-spin text-blue-600" />
             <p className="font-black text-xs uppercase tracking-[0.2em]">Updating Access Matrix...</p>
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="px-8 py-5 text-left">User Profile</th>
                <th className="px-6 py-5 text-left">{t.users.role}</th>
                <th className="px-6 py-5 text-left">{t.users.status}</th>
                <th className="px-6 py-5 text-left">{t.users.last_login}</th>
                <th className="px-8 py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <tr 
                  key={user.id} 
                  className="group hover:bg-blue-50/30 transition-colors cursor-pointer"
                  onClick={() => navigate(`/users/${user.id}/edit`)}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-black text-slate-500 text-sm shadow-sm group-hover:from-blue-500 group-hover:to-indigo-600 group-hover:text-white transition-all duration-500">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{user.firstName} {user.lastName}</p>
                        <p className="text-[11px] font-medium text-slate-400 lowercase flex items-center gap-1.5"><Mail size={12} /> {user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      {user.status === 'Active' ? (
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      ) : (
                        <XCircle size={14} className="text-rose-400" />
                      )}
                      <span className={`text-xs font-bold ${user.status === 'Active' ? 'text-slate-700' : 'text-slate-400'}`}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <Clock size={14} className="text-slate-300" />
                      {user.lastLogin}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/users/${user.id}/edit`);
                        }}
                        className="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 rounded-xl transition-all"
                      >
                        <UserCog size={18} />
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
                  <td colSpan={5} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-4 text-slate-400">
                      <UserCog size={64} className="opacity-20" />
                      <div>
                        <p className="text-lg font-bold text-slate-900">No users found</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <InviteUserModal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInviteUser}
      />
    </div>
  );
};

export default UsersListPage;
