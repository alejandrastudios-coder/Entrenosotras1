/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EventItem {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  time?: string;
  location: string;
  category: 'Networking' | 'Masterclass' | 'Encuentro' | 'Expo' | 'Taller' | 'Conferencia';
  status: 'upcoming' | 'completed';
  description: string;
  fullDetails?: string;
  image: string;
  imagePos?: string;
  videoUrl?: string;
  galleryImages?: string[];
  attendeesCount?: number;
  rsvpWaLink?: string;
  featured?: boolean;
}

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evento-proximo-1',
    title: 'Gran Encuentro Élite de Emprendedoras',
    subtitle: 'Conexiones de Valor, Liderazgo & Alianzas Estratégicas',
    date: '28 de Agosto, 2026',
    time: '6:30 PM - 9:30 PM EST',
    location: 'Lake Nona, Orlando, FL',
    category: 'Networking',
    status: 'upcoming',
    description: 'Un espacio exclusivo diseñado para conectar empresarias y creativas. Presentación del Método R.I.S.E., dinámicas de networking rápido y pitch de negocios.',
    fullDetails: 'Únete a nuestra jornada interactiva en Orlando donde más de 50 mujeres líderes compartirán herramientas clave sobre marketing digital, finanzas, aceleración de negocios y alianzas estratégicas. Incluye cóctel de bienvenida, espacio de exhibición y directorio impreso.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000',
    attendeesCount: 45,
    rsvpWaLink: 'https://wa.me/17869618458?text=Hola%20Alejandra%2C%20quisiera%20reservar%20mi%20cupo%20para%20el%20Gran%20Encuentro%20%C3%89lite%20del%2028%20de%20Agosto.',
    featured: true
  },
  {
    id: 'evento-proximo-2',
    title: 'Masterclass: Estrategia de Marca & Posicionamiento Digital',
    subtitle: 'Aumenta tus Ventas y Presencia con Luisana Muñoz',
    date: '12 de Septiembre, 2026',
    time: '7:00 PM - 8:30 PM EST',
    location: 'Modalidad Virtual (Zoom HD Live)',
    category: 'Masterclass',
    status: 'upcoming',
    description: 'Aprende a estructurar un plan de comunicación digital efectivo, embudos de conversión en redes sociales y storytelling que conecta con tu cliente ideal.',
    fullDetails: 'En esta Masterclass en vivo de 90 minutos, la Lic. Luisana Muñoz (Directora de Marketing) revelará las claves actualizadas para construir una marca memorable en 2026, optimizar tu perfil comercial en WhatsApp y convertir seguidores en clientes recurrentes.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000',
    attendeesCount: 80,
    rsvpWaLink: 'https://wa.me/16892557285?text=Hola%20Luisana%2C%20deseo%20inscribirme%20en%20la%20Masterclass%20de%20Estrategia%20de%20Marca%20del%2012%20de%20Septiembre.',
    featured: false
  },
  {
    id: 'evento-realizado-1',
    title: 'Primer Simposio Entre Nosotras: Mujeres Élite',
    subtitle: 'Edición Inaugural 2026 - Celebrando la Excelencia Emprendedora',
    date: '15 de Mayo, 2026',
    location: 'Orlando Conference Center, FL',
    category: 'Conferencia',
    status: 'completed',
    description: 'Más de 70 emprendedoras se reunieron para celebrar el lanzamiento oficial de nuestra plataforma y participar en paneles con especialistas invitadas.',
    fullDetails: 'Una jornada inspiradora donde disfrutamos de ponencias internacionales sobre liderazgo femenino, branding personal, finanzas saludables y mentoría en vivo. Mira los mejores momentos y testimonios del evento en video.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1000',
    videoUrl: 'https://player.vimeo.com/video/1203234411?badge=0&autopause=0&player_id=0&app_id=58479',
    attendeesCount: 75,
    featured: true
  },
  {
    id: 'evento-realizado-2',
    title: 'Taller Intensivo: Método R.I.S.E. para Emprendedoras',
    subtitle: 'Resiliencia, Innovación, Solidez y Éxito Empresarial',
    date: '10 de Marzo, 2026',
    location: 'Lake Nona, FL',
    category: 'Taller',
    status: 'completed',
    description: 'Taller práctico impartido por Alejandra Méndez enfocado en mentalidad de abundancia, metas de facturación y estructuración de modelos de negocio.',
    fullDetails: 'Las asistentes trabajaron de forma personalizada en sus planes de negocios de 90 días, recibiendo retroalimentación directa y estrategias de aceleración personal.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000',
    attendeesCount: 30,
    featured: false
  }
];
