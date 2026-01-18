
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Layout, 
  UserCog,
  ChevronLeft, 
  ChevronRight, 
  Settings, 
  UserCircle, 
  FileText
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const SidebarItem = ({ 
  to, 
  icon: Icon, 
  label, 
  isCollapsed 
}: { 
  to: string, 
  icon: any, 
  label: string, 
  isCollapsed: boolean 
}) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon size={20} className={isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'} />
      {!isCollapsed && (
        <span className="font-semibold text-sm whitespace-nowrap overflow-hidden transition-all duration-300">
          {label}
        </span>
      )}
      {isCollapsed && (
        <div className="absolute left-14 bg-slate-900 text-white text-xs py-1.5 px-3 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl border border-slate-700 font-bold whitespace-nowrap">
          {label}
        </div>
      )}
    </Link>
  );
};

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const { t } = useTranslation();
  return (
    <aside 
      className={`fixed top-0 left-0 h-screen bg-slate-900 border-r border-slate-800 transition-all duration-300 z-50 flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
            <span className="text-white font-black">N</span>
          </div>
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-white tracking-tight">Nest Management</h1>
          )}
        </Link>
      </div>

      <nav className={`flex-1 px-4 py-4 space-y-1.5 custom-scrollbar ${isCollapsed ? 'overflow-y-hidden' : 'overflow-y-auto'}`}>
        <SidebarItem to="/dashboard" icon={LayoutDashboard} label={t.nav.dashboard} isCollapsed={isCollapsed} />
        <SidebarItem to="/properties" icon={Building2} label={t.nav.properties} isCollapsed={isCollapsed} />
        <SidebarItem to="/units" icon={Layout} label={t.nav.units} isCollapsed={isCollapsed} />
        <SidebarItem to="/tenants" icon={Users} label={t.nav.tenants} isCollapsed={isCollapsed} />
        <SidebarItem to="/leases" icon={FileText} label={t.nav.leases} isCollapsed={isCollapsed} />
        <SidebarItem to="/users" icon={UserCog} label={t.nav.users} isCollapsed={isCollapsed} />
      </nav>

      <div className="p-4 space-y-2 border-t border-slate-800">
        <SidebarItem to="/settings" icon={Settings} label={t.nav.settings} isCollapsed={isCollapsed} />
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all ${isCollapsed ? 'justify-center' : ''}`}
        >
          {isCollapsed ? <ChevronRight size={20} /> : (
            <>
              <ChevronLeft size={20} />
              <span className="text-sm font-semibold">{t.nav.collapse}</span>
            </>
          )}
        </button>

        <Link 
          to="/users/u-1/edit" 
          className={`flex items-center gap-3 px-3 py-4 mt-2 group transition-all duration-300 ${isCollapsed ? 'justify-center' : 'bg-slate-800/50 hover:bg-slate-800 rounded-2xl'}`}
        >
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0 border border-slate-600 group-hover:border-blue-500 transition-colors">
            <UserCircle size={20} className="text-slate-300 group-hover:text-blue-400" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate group-hover:text-blue-400 transition-colors">{t.topbar.admin}</p>
              <p className="text-[10px] text-slate-500 truncate">{t.topbar.manager}</p>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
};
