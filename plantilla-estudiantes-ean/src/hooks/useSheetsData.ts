import { useState, useEffect, useCallback, useRef } from 'react';
import Papa from 'papaparse';
import { getGoogleSheetsCsvUrl } from '../utils/sheetsUrlParser';
import { sanitizeDataset, ProcessedDataset } from '../utils/dataSanitizer';
import { SAMPLE_DATASETS } from '../utils/sampleData';

export interface UseSheetsOptions {
  initialUrl?: string;
  refreshIntervalMs?: number;
}

export interface UseSheetsReturn {
  dataset: ProcessedDataset;
  loading: boolean;
  syncing: boolean;
  error: string | null;
  lastUpdated: Date | null;
  activeUrl: string;
  refreshInterval: number;
  setActiveUrl: (url: string) => void;
  setRefreshInterval: (intervalMs: number) => void;
  loadSampleDataset: (sampleId: string) => void;
  refetch: () => Promise<void>;
}

export function useSheetsData(options: UseSheetsOptions = {}): UseSheetsReturn {
  const [activeUrl, setActiveUrl] = useState<string>(options.initialUrl || '');
  const [refreshInterval, setRefreshInterval] = useState<number>(options.refreshIntervalMs || 5000);
  
  const [dataset, setDataset] = useState<ProcessedDataset>(() => {
    // Inicializar con el dataset de muestra por defecto
    const defaultSample = Papa.parse(SAMPLE_DATASETS[0].csvText, { header: true, skipEmptyLines: true });
    return sanitizeDataset(defaultSample.data as Record<string, any>[]);
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(new Date());

  const lastHashRef = useRef<string>('');
  const activeUrlRef = useRef<string>(activeUrl);
  activeUrlRef.current = activeUrl;

  const fetchData = useCallback(async (isSilent = false) => {
    const targetUrl = activeUrlRef.current;
    if (!targetUrl) return;

    if (isSilent) {
      setSyncing(true);
    } else {
      setLoading(true);
    }

    try {
      const csvExportUrl = getGoogleSheetsCsvUrl(targetUrl);
      
      // Agregar un query param nocache para asegurar la respuesta más reciente de Google Sheets
      const nocacheUrl = csvExportUrl.includes('?') 
        ? `${csvExportUrl}&_t=${Date.now()}` 
        : `${csvExportUrl}?_t=${Date.now()}`;

      const response = await fetch(nocacheUrl, {
        method: 'GET',
        headers: {
          'Accept': 'text/csv, text/plain, */*',
        },
      });

      if (!response.ok) {
        throw new Error(`No se pudo conectar a Google Sheets (HTTP ${response.status}). Asegúrate de que la hoja sea pública o esté publicada en la web.`);
      }

      const csvText = await response.text();

      // Verificar si la respuesta es una página de login de Google en lugar de un CSV
      if (csvText.includes('<!DOCTYPE html>') || csvText.includes('google-site-verification')) {
        throw new Error('La hoja requiere autenticación. Por favor compártela como "Cualquier persona con el enlace" o usa "Publicar en la web".');
      }

      // Comparación por hash ligero para evitar flickering si el contenido no varió
      if (csvText === lastHashRef.current) {
        setLastUpdated(new Date());
        setError(null);
        return;
      }

      lastHashRef.current = csvText;

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
        complete: (results) => {
          if (results.data && results.data.length > 0) {
            const processed = sanitizeDataset(results.data as Record<string, any>[]);
            setDataset(processed);
            setError(null);
            setLastUpdated(new Date());
          } else {
            setError('La hoja de cálculo está vacía o no contiene filas de datos.');
          }
        },
        error: (err: any) => {
          throw new Error(`Error analizando el formato CSV: ${err.message || 'Formato no válido'}`);
        }
      });
    } catch (err: any) {
      console.error('Error fetching Google Sheets data:', err);
      setError(err.message || 'Error de conexión con Google Sheets');
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  }, []);

  // Cargar dataset de prueba
  const loadSampleDataset = useCallback((sampleId: string) => {
    const sample = SAMPLE_DATASETS.find(s => s.id === sampleId) || SAMPLE_DATASETS[0];
    setActiveUrl('');
    lastHashRef.current = '';
    setError(null);
    
    Papa.parse(sample.csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const processed = sanitizeDataset(results.data as Record<string, any>[]);
        setDataset(processed);
        setLastUpdated(new Date());
      }
    });
  }, []);

  // Carga inicial al cambiar de URL
  useEffect(() => {
    if (activeUrl) {
      fetchData(false);
    }
  }, [activeUrl, fetchData]);

  // Polling recurrente en segundo plano
  useEffect(() => {
    if (!activeUrl || refreshInterval <= 0) return;

    const intervalId = setInterval(() => {
      fetchData(true);
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [activeUrl, refreshInterval, fetchData]);

  return {
    dataset,
    loading,
    syncing,
    error,
    lastUpdated,
    activeUrl,
    refreshInterval,
    setActiveUrl,
    setRefreshInterval,
    loadSampleDataset,
    refetch: () => fetchData(false),
  };
}
