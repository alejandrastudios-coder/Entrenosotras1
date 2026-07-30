/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Entrepreneur } from './types';

export const INITIAL_ENTREPRENEURS: Entrepreneur[] = [
  {
    id: 'norely-perez',
    name: 'Norely Pérez',
    businessName: 'Norely Hair & Style',
    category: 'Barbería',
    description: 'Atención por cita los fines de semana en Lake Nona, Saint Cloud, Orlando y Deltona. En Deltona también disponible de lunes a viernes después de las 6:00 PM.',
    fullBio: 'Hola, soy Norely Pérez. Me apasiona el arte de la peluquería y el estilismo capilar clásico y moderno, adaptando técnicas de precisión con las últimas tendencias de diseño y corte para toda la familia. Atiendo exclusivamente por cita los fines de semana (sábados y domingos) con al menos 3 días de anticipación en las zonas de Lake Nona, Saint Cloud, Orlando y Deltona. Además, si te encuentras en la zona de Deltona, también tengo disponibilidad para atenderte de lunes a viernes después de las 6:00 PM y fines de semana. Mi objetivo es brindar una experiencia relajante y un resultado impecable en cada visita. ¡Ponte en contacto directo conmigo por WhatsApp con 3 días de anticipación para reservar tu espacio!',
    avatar: 'https://i.ibb.co/1YD6fX7L/corte-1.jpg',
    coverImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800&h=400',
    location: 'Lake Nona, Saint Cloud, Orlando & Deltona',
    rating: 5.0,
    reviewsCount: 24,
    status: 'online',
    isPremium: true,
    phone: '+13217468867',
    instagram: '@norely.barber',
    email: 'contacto@norelybarber.com',
    products: [
      {
        id: 'np-p1',
        name: 'Corte de Cabello Premium',
        description: 'Corte personalizado adaptado a tus facciones, lavado capilar estimulante, secado y modelado con productos de primera calidad, ejecutado con precisión.',
        price: 30,
        image: 'https://i.ibb.co/1YD6fX7L/corte-1.jpg',
        tag: 'Más vendido'
      },
      {
        id: 'np-p4',
        name: 'Corte Infantil 👦',
        description: 'Servicio de corte especial para los más pequeños con toda la paciencia, cuidado y la mejor onda para que disfruten su experiencia de cambio de look.',
        price: 25,
        image: 'https://i.ibb.co/27Mk1x9C/Corte-con-jose.jpg',
        tag: 'Especial Niños'
      }
    ],
    reviews: [
      {
        id: 'r-np-1',
        author: 'Carlos M.',
        rating: 5,
        comment: 'Norely es sumamente detallista y profesional. El corte quedó impecable y el ambiente es de primera.',
        date: 'Hace 2 días'
      },
      {
        id: 'r-np-2',
        author: 'John D.',
        rating: 5,
        comment: 'Excelente atención, sumamente profesional y puntual. El servicio a domicilio o por cita coordinada es fantástico.',
        date: 'Hace 1 semana'
      }
    ],
    faqs: [
      {
        question: '¿En qué zonas trabajas y en qué horarios?',
        answer: 'Ofrezco servicios personalizados en las zonas de Lake Nona, Saint Cloud, Orlando y Deltona los sábados y domingos (fines de semana). Adicionalmente, si te encuentras en la zona de Deltona, puedo atenderte también de lunes a viernes después de las 6:00 PM.'
      },
      {
        question: '¿Con cuánta anticipación debo reservar mi turno?',
        answer: 'Para garantizar la mejor organización y traslados óptimos, requerimos que todas las citas sean agendadas con al menos 3 días de anticipación. ¡Escríbeme por WhatsApp para agendar!'
      }
    ]
  },
  {
    id: 'alejandra-mendez',
    name: 'Alejandra Méndez',
    businessName: 'Méndez Hair & Beauty',
    category: 'Estilista & Estética',
    description: 'Estilista profesional y colorista experta especializada en iluminaciones, balayage y alisados en Lake Nona.',
    fullBio: 'Hola, soy Alejandra Méndez. Ofrezco servicios de peluquería de primer nivel, especializándome en coloración avanzada (balayage, baby lights, reflejos), tratamientos de hidratación y reconstrucción profunda, alisados orgánicos de alta duración, y cortes modernos adaptados a tu estilo personal. En mi espacio en Lake Nona, priorizo siempre la salud de tu fibra capilar, utilizando productos de la más alta gama profesional. ¡Escríbeme para diseñar juntas tu nuevo look de ensueño!',
    avatar: 'https://i.ibb.co/1fQwBH1c/Screenshot-2026-06-24-163407.png',
    avatarPos: 'object-[center_12%]',
    coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800&h=400',
    location: 'Lake Nona, Estados Unidos',
    rating: 5.0,
    reviewsCount: 31,
    status: 'online',
    isPremium: true,
    phone: '+17869618458',
    instagram: '@alejandrasstudio',
    email: 'alejandrastudio@gmail.com',
    products: [
      {
        id: 'am-p1',
        name: 'Balayage / Reflejos de Autor',
        description: 'Técnica de coloración avanzada y personalizada para dar luz, contraste y dimensión a tu melena con degradado natural.',
        image: 'https://i.ibb.co/rR5cS421/balayaje-despues.jpg',
        beforeImage: 'https://i.ibb.co/sd1XKSvV/balayage-antes.jpg',
        afterImage: 'https://i.ibb.co/rR5cS421/balayaje-despues.jpg',
        tag: 'Antes & Después'
      },
      {
        id: 'am-p2',
        name: 'Morena Iluminada',
        description: 'Técnica de iluminación sutil y elegante ideal para cabellos oscuros. Aporta reflejos cálidos, brillo y profundidad manteniendo la base natural.',
        image: 'https://i.ibb.co/9mykSwvD/morena-iluminada-despues.jpg',
        beforeImage: 'https://i.ibb.co/1t6HW3b9/Morena-iluminada-antes.jpg',
        afterImage: 'https://i.ibb.co/9mykSwvD/morena-iluminada-despues.jpg',
        tag: 'Antes & Después'
      }
    ],
    reviews: [
      {
        id: 'r-am-1',
        author: 'Laura S.',
        rating: 5,
        comment: 'Alejandra es la mejor estilista de Lake Nona. Me dejó un balayage perfecto, súper natural, y el cabello se siente increíblemente suave.',
        date: 'Hace 1 día'
      },
      {
        id: 'r-am-2',
        author: 'María G.',
        rating: 5,
        comment: 'Muy feliz con mi corte de pelo. Alejandra entendió exactamente lo que quería y fue súper atenta y cálida.',
        date: 'Hace 4 días'
      }
    ],
    faqs: [
      {
        question: '¿Dónde se encuentra ubicado tu salón?',
        answer: 'Atiendo de manera exclusiva y coordinada en la zona de Lake Nona, Florida. Escríbeme directamente por WhatsApp para reservar tu turno y enviarte la dirección precisa.'
      },
      {
        question: '¿Utilizas productos libres de formol para los alisados?',
        answer: 'Sí, trabajamos con alisados orgánicos certificados de última generación que no contienen formol, cuidando al máximo la salud de tu cabello y el bienestar general.'
      }
    ]
  }
];

export const FALLBACK_CHAT_RESPONSES: Record<string, string[]> = {
  'norely-perez': [
    "¡Hola! Qué gusto saludarte 💈 ¿Estás buscando reservar un turno para corte de cabello premium o infantil?",
    "Ofrecemos un servicio de estilismo 100% personalizado y con total dedicación. ¿Te gustaría conocer la disponibilidad de turnos?",
    "Recuerda que para darte la mejor atención, coordinamos todas las citas con al menos 3 días de anticipación."
  ],
  'alejandra-mendez': [
    "¡Hola! Bienvenida a Méndez Hair & Beauty ✨ ¿Qué servicio te gustaría realizarte hoy?",
    "Especialmente en Lake Nona realizo trabajos de coloración avanzada y balayage espectaculares cuidando tu salud capilar. ¿Querés reservar un turno de diagnóstico gratuito?",
    "Los tratamientos de nutrición intensiva son ideales para revivir cabellos secos o maltratados. Contame un poco cómo está tu cabello."
  ]
};
