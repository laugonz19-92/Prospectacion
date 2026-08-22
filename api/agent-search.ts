import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Utilizar POST.' });
  }

  try {
    const { filters, provider } = req.body || {};
    const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

    // Simulation / Response payload
    const mockResults = [
      {
        id: `PROJ-VERCEL-${Math.floor(1000 + Math.random() * 9000)}`,
        institutionName: `Colegio Campestre ${filters?.city || 'Bogotá'}`,
        institutionType: 'COLEGIO_PRIVADO',
        eventType: 'LICENCIA_CONSTRUCCION',
        title: 'Nuevo Centro Deportivo y Laboratorios de Ciencias',
        description: 'Licencia de construcción de 12.000 m² aprobada por Curaduría Urbana.',
        city: filters?.city || 'Bogotá',
        department: 'Cundinamarca',
        estimatedInvestmentUSD: 4200000,
        estimatedAreaM2: 12000,
        publicSource: 'Curaduría Urbana 2 - Vercel Agent Serverless',
        sourceUrl: 'https://curaduria2bogota.com/licencias/2026',
        licenseNumber: 'LC-2026-VERCEL-99',
        detectionDate: new Date().toISOString().split('T')[0],
        status: 'LICENCIA_APROBADA',
        priority: 'ALTA',
        aiConfidence: 95,
        tags: ['Vercel Serverless', 'Curaduría', 'Infraestructura'],
        keyContacts: [
          {
            id: 'CONT-VERCEL-1',
            name: 'Ing. Fernando Morales',
            role: 'Director de Infraestructura',
            email: 'fmorales@colegio.edu.co',
            phone: '+57 (601) 880-1234',
            linkedInUrl: 'https://linkedin.com/in/fernandomorales-edu',
            verified: true
          }
        ]
      }
    ];

    return res.status(200).json({
      success: true,
      agent: 'Agente 1: Investigador y Prospector',
      timestamp: new Date().toISOString(),
      apiKeyConfigured: !!apiKey,
      data: mockResults
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
