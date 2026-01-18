
export type Language = 'en-GB' | 'pt-PT' | 'es-ES';

export const translations = {
  'en-GB': {
    nav: {
      dashboard: 'Dashboard',
      properties: 'Properties',
      units: 'Units',
      tenants: 'Tenants',
      leases: 'Leases',
      users: 'Users',
      settings: 'Settings',
      collapse: 'Collapse Sidebar'
    },
    topbar: {
      workspace: 'Property Workspace',
      overview: 'Portfolio Overview',
      admin: 'Admin User',
      manager: 'Manager Access'
    },
    dashboard: {
      title: 'Executive Dashboard',
      subtitle: 'Strategic financial overview of your property assets.',
      revenue: 'Monthly Revenue',
      expenses: 'Operating Expenses',
      noi: 'Net Operating Income',
      occupancy: 'Portfolio Occupancy',
      portfolio_value: 'Portfolio Market Value',
      unrealized: 'UNREALIZED GAINS',
      recent_ledger: 'Recent Ledger',
      live_activity: 'Live Activity',
      view_all: 'View All Transactions',
      maintenance_alert: 'Maintenance Alert'
    },
    properties: {
      title: 'Your Portfolio',
      subtitle: 'Manage {count} properties across your regions.',
      add: 'Add Property',
      filters: 'Filters',
      occupancy: 'Occupancy'
    },
    users: {
      title: 'Platform Users',
      subtitle: 'Manage administrative access and permissions.',
      add: 'Invite User',
      edit: 'Edit User Profile',
      role: 'Role',
      status: 'Status',
      last_login: 'Last Login'
    },
    settings: {
      title: 'Configuration',
      subtitle: 'Manage your personal preferences and organization identity.',
      profile: 'User Profile',
      organization: 'Organization',
      preferences: 'Preferences',
      security: 'Security',
      notifications: 'Notifications',
      save: 'Save Settings',
      language: 'Display Language',
      currency: 'Default Currency'
    }
  },
  'pt-PT': {
    nav: {
      dashboard: 'Painel',
      properties: 'Propriedades',
      units: 'Unidades',
      tenants: 'Arrendatários',
      leases: 'Contratos',
      users: 'Utilizadores',
      settings: 'Definições',
      collapse: 'Recolher Barra'
    },
    topbar: {
      workspace: 'Espaço de Trabalho',
      overview: 'Visão Geral do Portfólio',
      admin: 'Administrador',
      manager: 'Acesso Gestor'
    },
    dashboard: {
      title: 'Painel Executivo',
      subtitle: 'Visão financeira estratégica dos seus ativos imobiliários.',
      revenue: 'Receita Mensal',
      expenses: 'Despesas Operacionais',
      noi: 'Resultado Operacional Líquido',
      occupancy: 'Ocupação do Portfólio',
      portfolio_value: 'Valor de Mercado do Portfólio',
      unrealized: 'GANHOS NÃO REALIZADOS',
      recent_ledger: 'Livro de Registos Recentes',
      live_activity: 'Atividade em Direto',
      view_all: 'Ver Todas as Transações',
      maintenance_alert: 'Alerta de Manutenção'
    },
    properties: {
      title: 'O Seu Portfólio',
      subtitle: 'Gira {count} propriedades nas suas regiões.',
      add: 'Adicionar Propriedade',
      filters: 'Filtros',
      occupancy: 'Ocupação'
    },
    users: {
      title: 'Utilizadores da Plataforma',
      subtitle: 'Gerir acessos administrativos e permissões.',
      add: 'Convidar Utilizador',
      edit: 'Editar Perfil',
      role: 'Função',
      status: 'Estado',
      last_login: 'Último Acesso'
    },
    settings: {
      title: 'Configuração',
      subtitle: 'Gira as suas preferências pessoais e a identidade da organização.',
      profile: 'Perfil de Utilizador',
      organization: 'Organização',
      preferences: 'Preferências',
      security: 'Segurança',
      notifications: 'Notificações',
      save: 'Guardar Definições',
      language: 'Idioma de Exibição',
      currency: 'Moeda Padrão'
    }
  },
  'es-ES': {
    nav: {
      dashboard: 'Panel Control',
      properties: 'Propiedades',
      units: 'Unidades',
      tenants: 'Inquilinos',
      leases: 'Contratos',
      users: 'Usuarios',
      settings: 'Ajustes',
      collapse: 'Contraer Barra'
    },
    topbar: {
      workspace: 'Espacio de Trabalho',
      overview: 'Resumen de Cartera',
      admin: 'Administrador',
      manager: 'Acceso Gestor'
    },
    dashboard: {
      title: 'Panel Ejecutivo',
      subtitle: 'Resumen financiero estratégico de sus activos inmobiliarios.',
      revenue: 'Ingresos Mensuales',
      expenses: 'Gastos Operativos',
      noi: 'Ingresos Operativos Netos',
      occupancy: 'Ocupación de Cartera',
      portfolio_value: 'Valor de Mercado de la Cartera',
      unrealized: 'GANANCIAS NO REALIZADAS',
      recent_ledger: 'Libro Mayor Reciente',
      live_activity: 'Actividad en Vivo',
      view_all: 'Ver Todas las Transacciones',
      maintenance_alert: 'Alerta de Mantenimiento'
    },
    properties: {
      title: 'Su Cartera',
      subtitle: 'Gestione {count} propiedades en sus regiones.',
      add: 'Añadir Propiedad',
      filters: 'Filtros',
      occupancy: 'Ocupación'
    },
    users: {
      title: 'Usuarios de la Plataforma',
      subtitle: 'Gestionar accesos administrativos y permisos.',
      add: 'Invitar Usuario',
      edit: 'Editar Perfil',
      role: 'Rol',
      status: 'Estado',
      last_login: 'Último Acceso'
    },
    settings: {
      title: 'Configuración',
      subtitle: 'Gestione sus preferencias personales e identidad organizacional.',
      profile: 'Perfil de Usuario',
      organization: 'Organización',
      preferences: 'Preferencias',
      security: 'Seguridad',
      notifications: 'Notificaciones',
      save: 'Guardar Ajustes',
      language: 'Idioma de Pantalla',
      currency: 'Moeda Predeterminada'
    }
  }
};
