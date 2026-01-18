
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Mapping for route segments to readable titles
  const routeMap: Record<string, string> = {
    'dashboard': t.nav.dashboard,
    'properties': t.nav.properties,
    'units': t.nav.units,
    'tenants': t.nav.tenants,
    'leases': t.nav.leases,
    'users': t.nav.users,
    'settings': t.nav.settings,
    'create': 'New Entry',
    'edit': 'Configuration'
  };

  // Helper to check if a segment is likely an ID (starts with p-, u-, or is numeric/uuid)
  const isId = (segment: string) => {
    return segment.includes('-') || !isNaN(Number(segment)) || segment.length > 20;
  };

  const getLabel = (segment: string, index: number) => {
    if (routeMap[segment.toLowerCase()]) return routeMap[segment.toLowerCase()];
    if (isId(segment)) {
      const parent = pathnames[index - 1];
      if (parent === 'properties') return 'Property Details';
      if (parent === 'units') return 'Unit Details';
      if (parent === 'tenants') return 'Resident Profile';
      if (parent === 'users') return 'User Profile';
      return 'Details';
    }
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <nav aria-label="Breadcrumb" className="flex overflow-x-auto no-scrollbar py-1">
      <ol className="flex items-center space-x-2 whitespace-nowrap">
        <li>
          <Link 
            to="/dashboard" 
            className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors duration-200"
          >
            <Home size={14} className="mb-0.5" />
            <span className="text-[11px] font-black uppercase tracking-widest">{t.topbar.workspace}</span>
          </Link>
        </li>
        
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const label = getLabel(value, index);

          return (
            <li key={to} className="flex items-center space-x-2">
              <ChevronRight size={14} className="text-slate-300 shrink-0" />
              {last ? (
                <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-lg">
                  {label}
                </span>
              ) : (
                <Link 
                  to={to} 
                  className="text-[11px] font-black text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
