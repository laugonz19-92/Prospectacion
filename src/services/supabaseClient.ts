// Configuración del cliente de Supabase para almacenamiento de Leads (Free-Tier)
import { createClient } from '@supabase/supabase-js';

// Variables de entorno leídas desde Vercel
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Inicialización del cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface EducationalLeadDB {
  id?: string;
  created_at?: string;
  institution_name: string;
  project_type: string;
  status: 'Detectado' | 'En Análisis' | 'Contactado';
  confidence_score: number;
  source_url?: string;
}

// Guardar nuevo lead detectado por el Agente 1
export const saveEducationalLead = async (lead: EducationalLeadDB) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase no configurado. Operando en modo local.');
    return null;
  }
  const { data, error } = await supabase.from('educational_leads').insert([lead]);
  if (error) console.error('Error al guardar lead:', error);
  return data;
};

// Obtener leads para el Agente 2
export const fetchEducationalLeadsFromDB = async (): Promise<EducationalLeadDB[]> => {
  if (!supabaseUrl || !supabaseAnonKey) return [];
  const { data, error } = await supabase
    .from('educational_leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error al obtener leads:', error);
    return [];
  }
  return data || [];
};
