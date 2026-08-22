export type EventType = 
  | 'LICENCIA_CONSTRUCCION' 
  | 'PLAN_MAESTRO' 
  | 'FUSION_INSTITUCIONAL' 
  | 'NUEVA_SEDE' 
  | 'NUEVA_INSTITUCION';

export type InstitutionType = 
  | 'COLEGIO_PRIVADO' 
  | 'UNIVERSIDAD_PRIVADA' 
  | 'INSTITUTO_TECNICO';

export type ProjectStatus = 
  | 'IDENTIFICADO' 
  | 'EN_REVISION' 
  | 'LICENCIA_APROBADA' 
  | 'EN_CONSTRUCCION' 
  | 'CONTACTADO';

export type PriorityLevel = 'CRITICA' | 'ALTA' | 'MEDIA' | 'BAJA';

export interface KeyContact {
  id: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  linkedInUrl?: string;
  verified: boolean;
}

export interface EducationalProject {
  id: string;
  institutionName: string;
  institutionType: InstitutionType;
  eventType: EventType;
  title: string;
  description: string;
  city: string;
  department: string;
  address?: string;
  estimatedInvestmentUSD: number;
  estimatedAreaM2: number;
  publicSource: string;
  sourceUrl: string;
  licenseNumber?: string;
  detectionDate: string;
  status: ProjectStatus;
  priority: PriorityLevel;
  keyContacts: KeyContact[];
  aiConfidence: number;
  tags: string[];
  notes?: string;
}

export interface SearchFilters {
  city: string;
  institutionType: string;
  eventType: string;
  keywords: string;
  sourceFilter: string;
}

export interface Agent1Log {
  id: string;
  timestamp: string;
  step: string;
  status: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

export interface Agent2Metrics {
  totalProjects: number;
  totalInvestmentUSD: number;
  totalAreaM2: number;
  totalContacts: number;
  byEventType: Record<EventType, number>;
  byCity: Record<string, number>;
  byStatus: Record<ProjectStatus, number>;
  byPriority: Record<PriorityLevel, number>;
}

export interface ApiKeysConfig {
  openaiApiKey?: string;
  geminiApiKey?: string;
  serpApiKey?: string;
  googleSheetsUrl?: string;
  aiProvider: 'openai' | 'gemini' | 'simulation';
}
