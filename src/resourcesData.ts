/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CommunityResource {
  id: string;
  title: string;
  category: 'Iglesias' | 'Centros Gratuitos' | 'Donaciones' | 'Recursos para la Mujer' | 'Directorio Comunitario';
  subtitle: string;
  description: string;
  zone: string; // e.g., "Orlando", "Deltona", "Kissimmee", "Saint Cloud", "Central Florida"
  address: string;
  phone: string;
  whatsapp?: string;
  schedule: string;
  activities: string[];
  website?: string;
  badgeTag?: string;
  isVerified?: boolean;
}

export const RESOURCE_CATEGORIES = [
  'Todos',
  'Iglesias',
  'Centros Gratuitos',
  'Donaciones',
  'Recursos para la Mujer',
  'Directorio Comunitario'
] as const;

export const INITIAL_RESOURCES: CommunityResource[] = [
  {
    id: 'res-1',
    title: 'Iglesia Cristiana Vida Nueva & Apoyo Familiar',
    category: 'Iglesias',
    subtitle: 'Comunidad de Fe y Banco de Alimentos',
    description: 'Comunidad cristiana abierta con cultos bilingües, grupos de oración para mujeres, talleres de matrimonio y jornada semanal de distribución de alimentos para familias necesitadas.',
    zone: 'Orlando / Kissimmee',
    address: '2400 Orange Blossom Trail, Orlando, FL 32805',
    phone: '+1 (407) 555-0144',
    whatsapp: '14072181294',
    schedule: 'Domingos 10:00 AM | Miércoles 7:00 PM | Banco Alimentos: Jueves 9:00 AM',
    activities: [
      'Distribución gratuita de alimentos los jueves',
      'Grupo de mujeres "Hijas del Rey" los sábados',
      'Asesoría espiritual y contención emocional',
      'Cuidado de niños durante cultos domingos'
    ],
    website: 'https://ejemplo.org/vidanueva',
    badgeTag: 'Fe & Alimentos',
    isVerified: true
  },
  {
    id: 'res-2',
    title: 'Centro de Desarrollo & Capacitación Comunitario (CDCC)',
    category: 'Centros Gratuitos',
    subtitle: 'Cursos de Inglés (ESL) y Asesoría Laboral',
    description: 'Institución sin fines de lucro que brinda talleres sin costo de nivelación de idioma, preparación de currículum Vitae, computación básica y derechos laborales para la comunidad hispana.',
    zone: 'Orlando',
    address: '1801 Semoran Blvd, Suite 102, Orlando, FL 32807',
    phone: '+1 (407) 555-0199',
    schedule: 'Lunes a Viernes de 9:00 AM a 5:00 PM',
    activities: [
      'Clases gratuitas de inglés conversacional (ESL)',
      'Taller de redacción de Resumes & Entrevistas',
      'Asesoría técnica para emprendedores iniciales',
      'Acceso gratuito a computadoras e impresión de documentos'
    ],
    badgeTag: 'Capacitación Gratuita',
    isVerified: true
  },
  {
    id: 'res-3',
    title: 'Fundación Abrazando Esperanza',
    category: 'Donaciones',
    subtitle: 'Centro de Acopio de Ropa, Juguetes y Artículos de Bebé',
    description: 'Organización dedicada a recolectar ropa en excelente estado, coches, pañales y productos de higiene para entregar a madres solteras y recién llegadas a la región.',
    zone: 'Kissimmee / Saint Cloud',
    address: '320 E Partin Settlement Rd, Kissimmee, FL 34744',
    phone: '+1 (407) 555-0233',
    whatsapp: '14072181294',
    schedule: 'Recepción de donaciones: Martes y Sábados 10:00 AM - 2:00 PM',
    activities: [
      'Entrega de canastillas para recién nacidos',
      'Entrega de uniformes y útiles escolares en agosto',
      'Jornadas de donación de ropa de invierno',
      'Red de apoyo directo para madres necesitadas'
    ],
    badgeTag: 'Ayuda Directa',
    isVerified: true
  },
  {
    id: 'res-4',
    title: 'Centro de Orientación & Protección para la Mujer (COPM)',
    category: 'Recursos para la Mujer',
    subtitle: 'Línea de Apoyo 24/7 y Contención Psicológica',
    description: 'Espacio confidencial y seguro para mujeres que requieren acompañamiento psicológico, asesoría legal preventiva en situaciones vulnerables y redes de refugio.',
    zone: 'Central Florida / Deltona',
    address: 'Atención confidencial (Presencial & Presencial por Cita)',
    phone: '+1 (800) 555-6853',
    whatsapp: '14072181294',
    schedule: 'Atención telefónica 24 horas | Citas presenciales Lun-Vie 8am-6pm',
    activities: [
      'Línea de orientación telefónica 100% confidencial en español',
      'Grupos de apoyo emocional y autoestima',
      'Acompañamiento en trámites y recursos legales de emergencia',
      'Derivación a albergues temporales seguros'
    ],
    badgeTag: 'Seguridad & Protección',
    isVerified: true
  },
  {
    id: 'res-5',
    title: 'Alianza Hispana de Servicios Públicos y Comunitarios',
    category: 'Directorio Comunitario',
    subtitle: 'Guía de Trámites, Salud y Servicios Locales',
    description: 'Consorcio de organizaciones comunitarias que facilita información sobre clínicas a bajo costo, ferias de salud gratuitas, trámites de licencias e integración comunitaria.',
    zone: 'Deltona / Volusia County',
    address: '1200 Deltona Blvd, Deltona, FL 32725',
    phone: '+1 (386) 555-0188',
    schedule: 'Lunes a Jueves de 9:00 AM a 4:00 PM',
    activities: [
      'Ferias de vacunación y mamografías gratuitas',
      'Asesoría de programas gubernamentales WIC y SNAP',
      'Orientación sobre clínicas comunitarias sin seguro',
      'Directorio de servicios públicos para familias latinas'
    ],
    badgeTag: 'Servicios Públicos',
    isVerified: true
  },
  {
    id: 'res-6',
    title: 'Iglesia San José & Centro Comunitario Saint Cloud',
    category: 'Iglesias',
    subtitle: 'Misas en Español y Comedor Solidario',
    description: 'Comunidad parroquial acogedora con misas dominicales en español, talleres para jóvenes y programa semanal de apoyo alimenticio y despensa comunitaria.',
    zone: 'Saint Cloud',
    address: '1101 Indiana Ave, St Cloud, FL 34769',
    phone: '+1 (407) 555-0811',
    schedule: 'Misa en Español: Domingos 12:30 PM | Despensa: Martes 5:00 PM',
    activities: [
      'Despensa comunitaria los martes en la tarde',
      'Catequesis y actividades juveniles los fines de semana',
      'Talleres de costura y emprendimiento parroquial',
      'Apoyo en medicamentos de emergencia'
    ],
    badgeTag: 'Comunidad Parroquial',
    isVerified: true
  }
];
