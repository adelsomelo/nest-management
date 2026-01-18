
import { Property, Tenant, Unit, Lease, AppUser } from '../types';

const API_BASE_URL = '/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An unexpected error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const apiService = {
  // PROPERTIES
  async getProperties(): Promise<Property[]> {
    try {
      return await fetch(`${API_BASE_URL}/properties`).then(handleResponse);
    } catch (e) {
      console.warn('Backend not found, using local storage/mocks');
      return JSON.parse(localStorage.getItem('properties') || '[]');
    }
  },

  async getPropertyById(id: string): Promise<Property> {
    return fetch(`${API_BASE_URL}/properties/${id}`).then(handleResponse);
  },

  async createProperty(property: Partial<Property>): Promise<Property> {
    return fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(property),
    }).then(handleResponse);
  },

  async updateProperty(id: string, property: Partial<Property>): Promise<Property> {
    return fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(property),
    }).then(handleResponse);
  },

  async deleteProperty(id: string): Promise<void> {
    return fetch(`${API_BASE_URL}/properties/${id}`, { method: 'DELETE' }).then(handleResponse);
  },

  // TENANTS
  async getTenants(): Promise<Tenant[]> {
    try {
      return await fetch(`${API_BASE_URL}/tenants`).then(handleResponse);
    } catch (e) {
      return JSON.parse(localStorage.getItem('tenants') || '[]');
    }
  },

  async getTenantById(id: string): Promise<Tenant> {
    try {
      return await fetch(`${API_BASE_URL}/tenants/${id}`).then(handleResponse);
    } catch (e) {
      // Mock fallback for current environment
      const tenants = JSON.parse(localStorage.getItem('tenants') || '[]');
      const tenant = tenants.find((t: Tenant) => t.id === id);
      if (tenant) return tenant;
      return {
        id: id || '1',
        fullName: 'Alex Rivera',
        email: 'alex.r@example.com',
        phone: '(415) 555-1234',
        leaseStart: '2023-01-15',
        leaseEnd: '2025-01-15',
        rentAmount: 3450,
        status: 'active'
      } as Tenant;
    }
  },

  async createTenant(tenant: Partial<Tenant>): Promise<Tenant> {
    return fetch(`${API_BASE_URL}/tenants`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tenant),
    }).then(handleResponse);
  },

  async updateTenant(id: string, tenant: Partial<Tenant>): Promise<Tenant> {
    return fetch(`${API_BASE_URL}/tenants/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tenant),
    }).then(handleResponse);
  },

  async deleteTenant(id: string): Promise<void> {
    return fetch(`${API_BASE_URL}/tenants/${id}`, { method: 'DELETE' }).then(handleResponse);
  },

  // UNITS
  async getUnits(): Promise<Unit[]> {
    try {
      return await fetch(`${API_BASE_URL}/units`).then(handleResponse);
    } catch (e) {
      return JSON.parse(localStorage.getItem('units') || '[]');
    }
  },

  async getUnitById(id: string): Promise<Unit> {
    return fetch(`${API_BASE_URL}/units/${id}`).then(handleResponse);
  },

  // LEASES
  async getLeases(): Promise<Lease[]> {
    try {
      return await fetch(`${API_BASE_URL}/leases`).then(handleResponse);
    } catch (e) {
      return JSON.parse(localStorage.getItem('leases') || '[]');
    }
  },

  async createLease(lease: Partial<Lease>): Promise<Lease> {
    return fetch(`${API_BASE_URL}/leases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lease),
    }).then(handleResponse);
  },

  // USERS
  async getUsers(): Promise<AppUser[]> {
    try {
      return await fetch(`${API_BASE_URL}/users`).then(handleResponse);
    } catch (e) {
      return JSON.parse(localStorage.getItem('users') || '[]');
    }
  },

  async updateUser(id: string, user: Partial<AppUser>): Promise<AppUser> {
    return fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }).then(handleResponse);
  }
};
