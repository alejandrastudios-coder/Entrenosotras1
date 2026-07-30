/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BlogComment {
  id: string;
  author: string;
  avatar: string;
  comment: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  category: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  featuredImage: string;
  isFeatured?: boolean;
  tags: string[];
  reactions: {
    inspires: number;
    bravo: number;
    useful: number;
    fire: number;
  };
  comments: BlogComment[];
}

export const BLOG_CATEGORIES = [
  'Todos',
  'Emprendimiento',
  'Finanzas',
  'Liderazgo',
  'Belleza',
  'Salud',
  'Crecimiento personal',
  'Fe',
  'Marketing',
  'Eventos',
  'Comunidad'
] as const;

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Cómo prepararte para la temporada alta de tu emprendimiento: Guía de 5 pasos',
    slug: 'guia-preparacion-temporada-alta-emprendimiento',
    excerpt: 'Planificar inventario, promociones anticipadas y atención al cliente puede marcar la diferencia entre el estrés y el éxito financiero en las fechas claves.',
    content: [
      'Las temporadas altas —ya sean festividades, días especiales como el Día de la Madre o eventos locales— representan la oportunidad de oro para aumentar drásticamente los ingresos de tu negocio.',
      'Sin embargo, vender más sin una estructura sólida suele generar saturación y retrasos en las entregas. Para aprovechar al máximo cada fecha sin perder tu tranquilidad, te compartimos 5 claves estratégicas:',
      '1. Anticipa tu inventario e insumos: Compra tus materiales clave con al menos 3 a 4 semanas de anticipación. Esto te asegura mejores precios y evita desabastecimientos de último momento.',
      '2. Diseña ofertas relámpago con cupos limitados: En lugar de aceptar pedidos ilimitados, crea promociones con paquetes predefinidos. Esto ordena tu tiempo y genera sensación de exclusividad.',
      '3. Automatiza la comunicación básica: Prepara mensajes predeterminados para WhatsApp Business con tus listas de precios, preguntas frecuentes y métodos de pago.',
      '4. Cuida tu energía y bienestar: De nada sirve una semana de altas ventas si al finalizar terminas agotada por semanas. Delimita tus horarios de atención e involucra ayuda si es necesario.',
      '5. Pide testimonios inmediatamente después de la entrega: Aprovecha la satisfacción de tus clientes para solicitar reseñas en Google y fotos para tus redes sociales.'
    ],
    category: 'Emprendimiento',
    authorName: 'Alejandra Méndez',
    authorRole: 'Fundadora & Estilista Líder',
    authorAvatar: 'https://i.ibb.co/1YD6fX7L/corte-1.jpg',
    date: '28 de Julio, 2026',
    readTime: '4 min',
    featuredImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800&h=500',
    isFeatured: true,
    tags: ['Estrategia', 'Ventas', 'Planificación', 'Negocios'],
    reactions: {
      inspires: 34,
      bravo: 28,
      useful: 45,
      fire: 19
    },
    comments: [
      {
        id: 'c1',
        author: 'Norely Pérez',
        avatar: 'https://i.ibb.co/1YD6fX7L/corte-1.jpg',
        comment: '¡Excelente artículo Alejandra! El consejo sobre definir cupos limitados me ayudó muchísimo a organizar mis citas del fin de semana.',
        date: 'Hace 2 días'
      },
      {
        id: 'c2',
        author: 'María Elena R.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120',
        comment: 'Totalmente cierto lo del bienestar. Antes terminaba sin voz ni energía. ¡Gracias por compartir estos pilares!',
        date: 'Ayer'
      }
    ]
  },
  {
    id: 'post-2',
    title: 'Separando las finanzas personales de las del negocio: El primer paso hacia la libertad',
    slug: 'finanzas-personales-vs-negocio-emprendedoras',
    excerpt: 'Uno de los errores más comunes al emprender es mezclar la caja del negocio con los gastos del hogar. Aprende a asignarte un sueldo fijo.',
    content: [
      'Al iniciar un proyecto independiente, resulta tentador pagar la compra del supermercado con los ingresos diarios de las ventas o utilizar ahorros personales para comprar materia prima.',
      'Este hábito crea una ilusión de liquidez que dificulta saber si el emprendimiento es verdaderamente rentable.',
      'Paso 1: Asígnate un salario semanal o mensual. Tu negocio debe pagarte a ti como si fueras su primera empleada.',
      'Paso 2: Abre una cuenta o billetera separada únicamente para ingresos y costos operativos.',
      'Paso 3: Registra cada ingreso y egreso por pequeño que sea. Las pequeñas fugas de capital suelen ser invisibles hasta que sumas el total del mes.',
      'Al ordenar las finanzas, no solo proteges tu tranquilidad familiar sino que preparas tu emprendimiento para crecer de forma escalable.'
    ],
    category: 'Finanzas',
    authorName: 'Equipo Entre Nosotras',
    authorRole: 'Comité de Finanzas',
    authorAvatar: 'https://i.ibb.co/23VcLTbq/Whats-App-Image-2026-07-29-at-9-29-35-PM.jpg',
    date: '25 de Julio, 2026',
    readTime: '5 min',
    featuredImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800&h=500',
    tags: ['Finanzas', 'Ahorro', 'Presupuesto', 'Educación Financiera'],
    reactions: {
      inspires: 18,
      bravo: 22,
      useful: 39,
      fire: 12
    },
    comments: [
      {
        id: 'c3',
        author: 'Carla V.',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120',
        comment: 'Esto cambió por completo el rumbo de mi tienda. Asignarme un sueldo me dio paz mental.',
        date: 'Hace 3 días'
      }
    ]
  },
  {
    id: 'post-3',
    title: 'El secreto del Balayage y Morena Iluminada: Salud capilar antes de la tendencia',
    slug: 'secreto-balayage-morena-iluminada-salud-capilar',
    excerpt: 'Descubre por qué un diagnóstico personalizado de hebra y el uso de protectores térmicos son la clave para lograr reflejos radiantes sin sacrificar el brillo.',
    content: [
      'El cabello iluminado es una de las opciones más solicitadas en la actualidad, especialmente las técnicas de degradado natural como el Balayage y el concepto Morena Iluminada.',
      'Sin embargo, conseguir ese tono deseado requiere un proceso químico meticuloso. La clave del éxito radica en cuidar la fibra capilar desde el minuto cero.',
      'Antes de aplicar decolorante o aclarantes, es imprescindible realizar una prueba de mecha. Si la hebra está frágil o sensibilizada por procesos anteriores, se debe realizar un tratamiento previo de reconstrucción.',
      'Un acabado espectacular no es solo cuestión de color, sino de textura, movimiento y nutrición.',
      'Recuerda utilizar champú sin sulfatos y mascarillas nutritivas una vez por semana para mantener los reflejos vivos y con brillo de espejo.'
    ],
    category: 'Belleza',
    authorName: 'Norely Pérez',
    authorRole: 'Especialista en Color & Estilismo',
    authorAvatar: 'https://i.ibb.co/1YD6fX7L/corte-1.jpg',
    date: '20 de Julio, 2026',
    readTime: '3 min',
    featuredImage: 'https://i.ibb.co/9mykSwvD/morena-iluminada-despues.jpg',
    tags: ['Belleza', 'Cuidado Capilar', 'Estilismo', 'Balayage'],
    reactions: {
      inspires: 42,
      bravo: 35,
      useful: 29,
      fire: 31
    },
    comments: []
  },
  {
    id: 'post-4',
    title: 'El poder del Networking entre mujeres: Alianzas que multiplican ventas',
    slug: 'poder-networking-mujeres-alianzas-comunitarias',
    excerpt: 'Cuando dos emprendedoras unen fuerzas para recomendar sus servicios mutuamente, ambas duplican su visibilidad de forma orgánica y auténtica.',
    content: [
      'En la era digital, la publicidad pagada puede ser costosa, pero la recomendación boca a boca sigue siendo la herramienta de conversión más poderosa.',
      'Las alianzas estratégicas consisten en asociarte con negocios complementarios que compartan tu mismo público objetivo.',
      'Por ejemplo, una manicurista y una estilista pueden ofrecer un paquete de belleza integral, o una repostera puede colaborar con una organizadora de eventos.',
      'Cuando creas comunidad y compartes contactos con generosidad, abres puertas para recomendaciones genuinas basadas en la confianza.'
    ],
    category: 'Comunidad',
    authorName: 'Comité de Red Entre Nosotras',
    authorRole: 'Comunidad & Eventos',
    authorAvatar: 'https://i.ibb.co/23VcLTbq/Whats-App-Image-2026-07-29-at-9-29-35-PM.jpg',
    date: '15 de Julio, 2026',
    readTime: '4 min',
    featuredImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800&h=500',
    tags: ['Networking', 'Comunidad', 'Alianzas', 'Colaboración'],
    reactions: {
      inspires: 50,
      bravo: 41,
      useful: 38,
      fire: 25
    },
    comments: []
  }
];
