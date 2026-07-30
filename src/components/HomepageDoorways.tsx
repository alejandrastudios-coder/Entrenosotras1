/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Users, BookOpen, HeartHandshake, Calendar, Mail, ArrowRight, Sparkles 
} from 'lucide-react';
import { ActiveTab } from './Navbar';

interface HomepageDoorwaysProps {
  onNavigate: (tab: ActiveTab) => void;
}

export default function HomepageDoorways({ onNavigate }: HomepageDoorwaysProps) {
  const doorways = [
    {
      id: 'community',
      tab: 'community' as ActiveTab,
      badge: 'Nuestra Esencia',
      title: 'Comunidad Entre Nosotras',
      description: 'Conoce nuestra historia, misión, directiva y los beneficios exclusivos de pertenecer a la red.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600&h=400',
      icon: <Users className="w-5 h-5 text-[#f45f44]" />,
      cta: 'Conocer la Comunidad',
      gradient: 'from-[#3d2c29] to-[#2c1d1a]'
    },
    {
      id: 'blog',
      tab: 'blog' as ActiveTab,
      badge: 'Revista Digital',
      title: 'Blog & Historias de Éxito',
      description: 'Artículos de estrategia, finanzas, bienestar y vivencias redactados por expertas de la red.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600&h=400',
      icon: <BookOpen className="w-5 h-5 text-[#f45f44]" />,
      cta: 'Descubrir Artículos',
      gradient: 'from-[#2c1d1a] to-[#3d2c29]'
    },
    {
      id: 'resources',
      tab: 'resources' as ActiveTab,
      badge: 'Red de Apoyo',
      title: 'Recursos Comunitarios',
      description: 'Directorio verificado de iglesias, centros gratuitos, donaciones y ayuda para la mujer.',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600&h=400',
      icon: <HeartHandshake className="w-5 h-5 text-emerald-500" />,
      cta: 'Ver Directorio de Ayuda',
      gradient: 'from-[#1c2e26] to-[#243d33]'
    },
    {
      id: 'events',
      tab: 'events' as ActiveTab,
      badge: 'Encuentros & Ferias',
      title: 'Calendario de Eventos',
      description: 'Jornadas de networking, ferias emprendedoras y capacitaciones virtuales y presenciales.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600&h=400',
      icon: <Calendar className="w-5 h-5 text-[#f45f44]" />,
      cta: 'Explorar Eventos',
      gradient: 'from-[#3d2c29] to-[#4e3935]'
    }
  ];

  return (
    <section id="homepage-doorways-section" className="my-12 space-y-6">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#f45f44] bg-[#f45f44]/10">
          <Sparkles className="w-3.5 h-3.5" />
          Explora la Plataforma
        </span>
        <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#3d2c29] tracking-tight">
          Un espacio especializado para cada necesidad
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-light">
          Navega directamente hacia los centros de información, educación, alianzas y recursos de la red.
        </p>
      </div>

      {/* Doorway Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doorways.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigate(item.tab)}
            className="group bg-white rounded-3xl border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between relative"
          >
            {/* Top Image Preview */}
            <div className="relative h-48 bg-gray-100 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-white/90 backdrop-blur-md text-[#3d2c29] font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {item.badge}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-sans font-bold text-lg sm:text-xl leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Content & Action */}
            <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                {item.description}
              </p>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f45f44] group-hover:translate-x-1 transition-transform">
                  {item.cta} <ArrowRight className="w-4 h-4" />
                </span>
                <div className="p-2 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-[#f45f44]/10 group-hover:text-[#f45f44] transition">
                  {item.icon}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
