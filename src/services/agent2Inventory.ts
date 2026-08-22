import { EducationalProject, Agent2Metrics, PriorityLevel, ProjectStatus, EventType } from '../types/agents';

export class Agent2InventoryService {
  /**
   * Calcula las métricas avanzadas del inventario consolidadas por el Agente 2
   */
  public static calculateMetrics(projects: EducationalProject[]): Agent2Metrics {
    const metrics: Agent2Metrics = {
      totalProjects: projects.length,
      totalInvestmentUSD: 0,
      totalAreaM2: 0,
      totalContacts: 0,
      byEventType: {
        LICENCIA_CONSTRUCCION: 0,
        PLAN_MAESTRO: 0,
        FUSION_INSTITUCIONAL: 0,
        NUEVA_SEDE: 0,
        NUEVA_INSTITUCION: 0
      },
      byCity: {},
      byStatus: {
        IDENTIFICADO: 0,
        EN_REVISION: 0,
        LICENCIA_APROBADA: 0,
        EN_CONSTRUCCION: 0,
        CONTACTADO: 0
      },
      byPriority: {
        CRITICA: 0,
        ALTA: 0,
        MEDIA: 0,
        BAJA: 0
      }
    };

    projects.forEach(p => {
      metrics.totalInvestmentUSD += p.estimatedInvestmentUSD || 0;
      metrics.totalAreaM2 += p.estimatedAreaM2 || 0;
      metrics.totalContacts += (p.keyContacts ? p.keyContacts.length : 0);

      // Event Type
      if (metrics.byEventType[p.eventType] !== undefined) {
        metrics.byEventType[p.eventType]++;
      } else {
        metrics.byEventType[p.eventType] = 1;
      }

      // City
      const cityKey = p.city || 'Desconocida';
      metrics.byCity[cityKey] = (metrics.byCity[cityKey] || 0) + 1;

      // Status
      if (metrics.byStatus[p.status] !== undefined) {
        metrics.byStatus[p.status]++;
      } else {
        metrics.byStatus[p.status] = 1;
      }

      // Priority
      if (metrics.byPriority[p.priority] !== undefined) {
        metrics.byPriority[p.priority]++;
      } else {
        metrics.byPriority[p.priority] = 1;
      }
    });

    return metrics;
  }

  /**
   * Deduplica y audita proyectos comparando licencias y nombres de instituciones
   */
  public static auditAndDeduplicate(projects: EducationalProject[]): {
    uniqueProjects: EducationalProject[];
    duplicatesRemovedCount: number;
  } {
    const seenIds = new Set<string>();
    const seenLicenses = new Set<string>();
    const unique: EducationalProject[] = [];
    let dups = 0;

    projects.forEach(p => {
      if (seenIds.has(p.id)) {
        dups++;
        return;
      }
      if (p.licenseNumber && seenLicenses.has(p.licenseNumber)) {
        dups++;
        return;
      }

      seenIds.add(p.id);
      if (p.licenseNumber) seenLicenses.add(p.licenseNumber);
      unique.push(p);
    });

    return {
      uniqueProjects: unique,
      duplicatesRemovedCount: dups
    };
  }

  /**
   * Genera archivo CSV para descarga local o envío a Google Sheets
   */
  public static exportToCSV(projects: EducationalProject[]): string {
    const headers = [
      'ID Proyecto',
      'Institución',
      'Tipo Institución',
      'Tipo Evento',
      'Título del Proyecto',
      'Ciudad',
      'Departamento',
      'Inversión Est. (USD)',
      'Área Est. (m²)',
      'Fuente Pública',
      'URL Fuente',
      'N° Licencia',
      'Fecha Detección',
      'Estado',
      'Prioridad',
      'Confianza IA (%)',
      'Contacto Principal - Nombre',
      'Contacto Principal - Cargo',
      'Contacto Principal - Email',
      'Contacto Principal - Teléfono',
      'Contacto Principal - LinkedIn'
    ];

    const rows = projects.map(p => {
      const mainContact = p.keyContacts && p.keyContacts.length > 0 ? p.keyContacts[0] : null;
      return [
        `"${p.id}"`,
        `"${p.institutionName.replace(/"/g, '""')}"`,
        `"${p.institutionType}"`,
        `"${p.eventType}"`,
        `"${p.title.replace(/"/g, '""')}"`,
        `"${p.city}"`,
        `"${p.department}"`,
        p.estimatedInvestmentUSD,
        p.estimatedAreaM2,
        `"${p.publicSource.replace(/"/g, '""')}"`,
        `"${p.sourceUrl}"`,
        `"${p.licenseNumber || ''}"`,
        `"${p.detectionDate}"`,
        `"${p.status}"`,
        `"${p.priority}"`,
        p.aiConfidence,
        `"${mainContact?.name || ''}"`,
        `"${mainContact?.role || ''}"`,
        `"${mainContact?.email || ''}"`,
        `"${mainContact?.phone || ''}"`,
        `"${mainContact?.linkedInUrl || ''}"`
      ].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  }
}
