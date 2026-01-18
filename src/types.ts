
export interface Tenant {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  leaseStart: string;
  leaseEnd: string;
  rentAmount: number;
  status: 'active' | 'pending' | 'past';
}

export interface AppUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Viewer';
  status: 'Active' | 'Inactive';
  lastLogin?: string;
  avatar?: string;
}

export interface Unit {
  id: string;
  name: string;
  number: number;
  status: 'Occupied' | 'Vacant' | 'Maintenance';
  price: number;
  tenants: Tenant[];
  propertyId: string;
}

export interface Lease {
  id: string;
  tenantId: string;
  tenantName: string;
  unitId?: string; // Optional for full-property leases
  unitName?: string; // Optional for full-property leases
  propertyId: string;
  propertyName: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  deposit: number;
  status: 'active' | 'expiring' | 'expired' | 'pending';
}

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postCode: string;
  status: string;
  size: number;
  units: Unit[];
  monthlyRent: number;
  description: string;
  tenants: Tenant[];
  rentalMode: string;
  maxUnits: number;
  images?: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
