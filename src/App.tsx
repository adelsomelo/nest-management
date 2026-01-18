
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { 
  Building2, 
  Bell,
  Languages,
  Check
} from 'lucide-react';
import { Language } from './translations';
import { LanguageProvider, useTranslation } from './context/LanguageContext';
import { Sidebar } from './components/Sidebar';
import Breadcrumbs from './components/Breadcrumbs';
import PropertiesListPage from './pages/PropertiesListPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import PropertyEditPage from './pages/PropertyEditPage';
import PropertyCreatePage from './pages/PropertyCreatePage';
import UnitDetailsPage from './pages/UnitDetailsPage';
import UnitCreatePage from './pages/UnitCreatePage';
import UnitEditPage from './pages/UnitEditPage';
import UnitsListPage from './pages/UnitsListPage';
import TenantsListPage from './pages/TenantsListPage';
import TenantDetailsPage from './pages/TenantDetailsPage';
import TenantEditPage from './pages/TenantEditPage';
import TenantCreatePage from './pages/TenantCreatePage';
import LeasesListPage from './pages/LeasesListPage';
import LeaseCreatePage from './pages/LeaseCreatePage';
import LeaseDetailsPage from './pages/LeaseDetailsPage';
import LeaseEditPage from './pages/LeaseEditPage';
import DashboardPage from './pages/DashboardPage';
import UsersListPage from './pages/UsersListPage';
import UserEditPage from './pages/UserEditPage';
import SettingsPage from './pages/SettingsPage';

const TopBar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const { language, setLanguage, t } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);

  const locales: { code: Language, label: string, flag: string }[] = [
    { code: 'en-GB', label: 'UK English', flag: '🇬🇧' },
    { code: 'pt-PT', label: 'EU Português', flag: '🇵🇹' },
    { code: 'es-ES', label: 'EU Español', flag: '🇪🇸' }
  ];

  return (
    <header 
      className={`fixed top-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 transition-all duration-300 flex items-center justify-between px-8 ${
        isCollapsed ? 'left-20' : 'left-64'
      }`}
    >
      <div className="flex-1 mr-4 overflow-hidden">
        <Breadcrumbs />
      </div>
      
      <div className="flex items-center gap-4 shrink-0">
        {/* Language Selector */}
        <div className="relative">
          <button 
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-2 p-2 px-3 rounded-xl hover:bg-slate-100 transition-all text-slate-600 font-bold text-xs"
          >
            <Languages size={18} className="text-blue-600" />
            <span className="hidden sm:inline">
              {locales.find(l => l.code === language)?.flag} {locales.find(l => l.code === language)?.label}
            </span>
          </button>
          
          {langOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-20 animate-in zoom-in-95 duration-200">
                {locales.map(loc => (
                  <button
                    key={loc.code}
                    onClick={() => {
                      setLanguage(loc.code);
                      setLangOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition-colors text-xs font-bold"
                  >
                    <span className="flex items-center gap-3 text-slate-700">
                      <span>{loc.flag}</span>
                      {loc.label}
                    </span>
                    {language === loc.code && <Check size={14} className="text-blue-600" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-6 w-px bg-slate-200 mx-2"></div>
        
        <Link to="/users/u-1/edit" className="flex items-center gap-2 group transition-all duration-300">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs border-2 border-transparent group-hover:border-blue-500 transition-all">
            JD
          </div>
          <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors hidden sm:inline">John Doe</span>
        </Link>
      </div>
    </header>
  );
};

const MainLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className={`flex-1 transition-all duration-300 flex flex-col ${isCollapsed ? 'pl-20' : 'pl-64'}`}>
        <TopBar isCollapsed={isCollapsed} />
        
        <main className="w-full max-w-7xl mx-auto pt-24 pb-12 px-6 sm:px-8 lg:px-10">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/properties" element={<PropertiesListPage />} />
            <Route path="/properties/create" element={<PropertyCreatePage />} />
            <Route path="/units" element={<UnitsListPage />} />
            <Route path="/units/create" element={<UnitCreatePage />} />
            <Route path="/units/:id" element={<UnitDetailsPage />} />
            <Route path="/units/:id/edit" element={<UnitEditPage />} />
            <Route path="/tenants" element={<TenantsListPage />} />
            <Route path="/tenants/create" element={<TenantCreatePage />} />
            <Route path="/tenants/:id" element={<TenantDetailsPage />} />
            <Route path="/tenants/:id/edit" element={<TenantEditPage />} />
            <Route path="/leases" element={<LeasesListPage />} />
            <Route path="/leases/create" element={<LeaseCreatePage />} />
            <Route path="/leases/:id" element={<LeaseDetailsPage />} />
            <Route path="/leases/:id/edit" element={<LeaseEditPage />} />
            <Route path="/users" element={<UsersListPage />} />
            <Route path="/users/:id/edit" element={<UserEditPage />} />
            
            <Route path="/properties/:id" element={<PropertyDetailsPage />} />
            <Route path="/properties/:id/edit" element={<PropertyEditPage />} />
            
            <Route path="/settings" element={<SettingsPage />} />
            
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<div className="text-center py-20 text-slate-500 font-medium">Page not found</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <MainLayout />
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
export { useTranslation };
