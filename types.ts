
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  VETERINARIAN = 'VETERINARIAN',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  image: string;
  lastVisit?: string;
}

export interface Appointment {
  id: string;
  petId: string;
  vetId: string;
  date: string;
  time: string;
  type: 'VIRTUAL' | 'IN_PERSON';
  status: 'PENDING_APPROVAL' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'REJECTED';
  reason: string;
}

export interface MedicalRecord {
  id: string;
  petId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  vetName: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeVets: number;
  revenue: number;
  growth: number;
}
