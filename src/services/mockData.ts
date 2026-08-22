import { EducationalProject } from '../types/agents';

export const INITIAL_PROJECTS: EducationalProject[] = [
  {
    id: 'PROJ-COL-2026-001',
    institutionName: 'Colegio Los Nogales',
    institutionType: 'COLEGIO_PRIVADO',
    eventType: 'LICENCIA_CONSTRUCCION',
    title: 'Ampliación de Pabellón de Ciencias y Centro STEM (14.500 m²)',
    description: 'Radicación de licencia de construcción para nuevo edificio de laboratorios de robótica, biotecnología y aulas inteligentes en la sede Guaymaral.',
    city: 'Bogotá',
    department: 'Cundinamarca',
    address: 'Cl. 235 # 56-50, Suba',
    estimatedInvestmentUSD: 3800000,
    estimatedAreaM2: 14500,
    publicSource: 'Curaduría Urbana 2 de Bogotá - Radicado #24-2-0891',
    sourceUrl: 'https://curaduria2bogota.com/licencias/radicados/24-2-0891',
    licenseNumber: 'LC-2026-BOG-0422',
    detectionDate: '2026-02-14',
    status: 'LICENCIA_APROBADA',
    priority: 'ALTA',
    aiConfidence: 96,
    tags: ['Construcción STEM', 'Laboratorios', 'Sostenibilidad LEED'],
    keyContacts: [
      {
        id: 'CONT-001',
        name: 'Ing. Carlos Mendoza',
        role: 'Director de Planta Física e Infraestructura',
        email: 'cmendoza@nogales.edu.co',
        phone: '+57 (601) 676-0555 ext 142',
        linkedInUrl: 'https://linkedin.com/in/carlos-mendoza-infraestructura',
        verified: true
      },
      {
        id: 'CONT-002',
        name: 'Dra. María Paula Gómez',
        role: 'Rectora',
        email: 'rectoria@nogales.edu.co',
        linkedInUrl: 'https://linkedin.com/in/mariapaulagomez-rectora',
        verified: true
      }
    ]
  },
  {
    id: 'PROJ-UNI-2026-002',
    institutionName: 'Universidad de los Andes',
    institutionType: 'UNIVERSIDAD_PRIVADA',
    eventType: 'PLAN_MAESTRO',
    title: 'Plan Maestro Campus 2030: Edificio de Innovación e Ingeniería Aplicada',
    description: 'Aprobación institucional y solicitud de modificación de licencia para construcción de torre de 8 pisos con diseño bioclimático.',
    city: 'Bogotá',
    department: 'Cundinamarca',
    address: 'Cra. 1 # 18A-12, La Candelaria',
    estimatedInvestmentUSD: 12500000,
    estimatedAreaM2: 28000,
    publicSource: 'Diario La República / Boletín de Contratación UniAndes',
    sourceUrl: 'https://www.larepublica.co/infraestructura/uniandes-inicia-plan-maestro-2030',
    detectionDate: '2026-01-20',
    status: 'EN_REVISION',
    priority: 'CRITICA',
    aiConfidence: 94,
    tags: ['Plan Maestro', 'Campus Urbano', 'Tecnología BIM'],
    keyContacts: [
      {
        id: 'CONT-003',
        name: 'Arq. Andrés Felipe Restrepo',
        role: 'Vicerrector de Infraestructura y Planta Física',
        email: 'af.restrepo@uniandes.edu.co',
        phone: '+57 (601) 339-4949',
        linkedInUrl: 'https://linkedin.com/in/afrestrepo-uniandes',
        verified: true
      },
      {
        id: 'CONT-004',
        name: 'Laura Sofía Benítez',
        role: 'Directora de Compras y Contratación de Obras',
        email: 'compras.infra@uniandes.edu.co',
        verified: true
      }
    ]
  },
  {
    id: 'PROJ-COL-2026-003',
    institutionName: 'Colegio San José Vegas (Medellín)',
    institutionType: 'COLEGIO_PRIVADO',
    eventType: 'NUEVA_SEDE',
    title: 'Apertura de Sede Campestre Oriente (Rectoría y Aulas Primaria)',
    description: 'Adquisición de predio de 45.000 m² en Llanogrande y radicación de licencia de parcelación y construcción institucional ante Curaduría Urbana de Rionegro.',
    city: 'Medellín',
    department: 'Antioquia',
    address: 'Vía Don Diego - Llanogrande Km 4',
    estimatedInvestmentUSD: 6200000,
    estimatedAreaM2: 18500,
    publicSource: 'Curaduría 1 de Rionegro / MinEducación RUE #05001092',
    sourceUrl: 'https://curaduriarionegro1.com.co/licencias/2026-0419',
    licenseNumber: 'LC-RION-2026-089',
    detectionDate: '2026-02-02',
    status: 'EN_CONSTRUCCION',
    priority: 'ALTA',
    aiConfidence: 91,
    tags: ['Nueva Sede', 'Campestre', 'Deportes & Artes'],
    keyContacts: [
      {
        id: 'CONT-005',
        name: 'Mag. Gabriel Fernando Tobón',
        role: 'Director General y Representante Legal',
        email: 'gtobon@sanjosevegas.edu.co',
        phone: '+57 (604) 444-8342',
        linkedInUrl: 'https://linkedin.com/in/gabrieltobon-vegas',
        verified: true
      }
    ]
  },
  {
    id: 'PROJ-UNI-2026-004',
    institutionName: 'Pontificia Universidad Javeriana Cali',
    institutionType: 'UNIVERSIDAD_PRIVADA',
    eventType: 'LICENCIA_CONSTRUCCION',
    title: 'Complejo de Salud y Centro de Simulaciones Médicas Avanzadas',
    description: 'Licencia de construcción aprobada para edificio de 5 niveles enfocado en ciencias de la salud, quirófanos de simulación e investigación médica.',
    city: 'Cali',
    department: 'Valle del Cauca',
    address: 'Calle 18 # 118-250, Pance',
    estimatedInvestmentUSD: 8900000,
    estimatedAreaM2: 21000,
    publicSource: 'Curaduría Urbana 3 de Cali / Prensa El País Cali',
    sourceUrl: 'https://curaduria3cali.org/licencias/aprobadas/2026-0182',
    licenseNumber: 'LC-CALI3-2026-114',
    detectionDate: '2026-02-18',
    status: 'LICENCIA_APROBADA',
    priority: 'ALTA',
    aiConfidence: 95,
    tags: ['Simulación Médica', 'Salud', 'Pance'],
    keyContacts: [
      {
        id: 'CONT-006',
        name: 'Dra. Diana Carolina Morales',
        role: 'Directora de Recursos Físicos',
        email: 'diana.morales@javerianacali.edu.co',
        phone: '+57 (602) 321-8200',
        linkedInUrl: 'https://linkedin.com/in/dianamorales-javeriana',
        verified: true
      }
    ]
  },
  {
    id: 'PROJ-FUS-2026-005',
    institutionName: 'Red Educativa San Mateo - Colegio Anglo Americano',
    institutionType: 'COLEGIO_PRIVADO',
    eventType: 'FUSION_INSTITUCIONAL',
    title: 'Fusión Operativa y Modernización de Infraestructura Compartida',
    description: 'Anuncio público de fusión patrimonial entre dos colegios bilingües y plan unificado de inversión en instalaciones deportivas y tecnológicas.',
    city: 'Bogotá',
    department: 'Cundinamarca',
    address: 'Autopista Norte Cl. 170',
    estimatedInvestmentUSD: 4500000,
    estimatedAreaM2: 12000,
    publicSource: 'Secretaría de Educación de Bogotá / Superintendencia de Industria y Comercio',
    sourceUrl: 'https://www.educacionbogota.edu.co/resoluciones/2026-0912',
    detectionDate: '2026-02-10',
    status: 'IDENTIFICADO',
    priority: 'MEDIA',
    aiConfidence: 88,
    tags: ['Fusión', 'Infraestructura Deportiva', 'Bilingüe'],
    keyContacts: [
      {
        id: 'CONT-007',
        name: 'Dr. Alejandro Salamanca',
        role: 'Presidente del Consejo Directivo',
        email: 'asalamanca@angloamericano.edu.co',
        linkedInUrl: 'https://linkedin.com/in/alejandrosalamanca-edu',
        verified: true
      }
    ]
  },
  {
    id: 'PROJ-UNI-2026-006',
    institutionName: 'Universidad del Norte (Barranquilla)',
    institutionType: 'UNIVERSIDAD_PRIVADA',
    eventType: 'PLAN_MAESTRO',
    title: 'Pabellón de Energías Renovables y Sostenibilidad Costera',
    description: 'Radicación de proyecto arquitectónico para nuevo complejo de investigación en energías solar y eólica marina en el campus Puerto Colombia.',
    city: 'Barranquilla',
    department: 'Atlántico',
    address: 'Km 5 Vía a Puerto Colombia',
    estimatedInvestmentUSD: 7400000,
    estimatedAreaM2: 16800,
    publicSource: 'Curaduría 1 de Puerto Colombia / El Heraldo',
    sourceUrl: 'https://www.elheraldo.co/barranquilla/uninorte-anuncia-nuevo-pabellon-sostenible',
    detectionDate: '2026-01-28',
    status: 'EN_REVISION',
    priority: 'ALTA',
    aiConfidence: 93,
    tags: ['Energías Limpias', 'Investigación', 'Caribe'],
    keyContacts: [
      {
        id: 'CONT-008',
        name: 'Ing. Javier Enrique Villalba',
        role: 'Director de Servicios Administrativos y Planta Física',
        email: 'jvillalba@uninorte.edu.co',
        phone: '+57 (605) 350-9500',
        linkedInUrl: 'https://linkedin.com/in/javiervillalba-uninorte',
        verified: true
      }
    ]
  }
];
