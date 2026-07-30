/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Calendar, Clock, MapPin, Users, Video, MessageCircle, 
  ArrowUpRight, Sparkles, CheckCircle2, Play, Image as ImageIcon,
  ChevronRight, Filter, X, Award
} from 'lucide-react';
import { EventItem, INITIAL_EVENTS } from '../eventsData';

interface EventsSectionProps {
  onOpenEntrepreneurProfile?: (profileId: string) => void;
}

export default function EventsSection({ onOpenEntrepreneurProfile }: EventsSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const categories = ['Todos', 'Networking', 'Masterclass', 'Encuentro', 'Taller', 'Conferencia'];

  // Filter events by tab and category
  const filteredEvents = INITIAL_EVENTS.filter((evt) => {
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'upcoming' && evt.status === 'upcoming') ||
      (activeTab === 'completed' && evt.status === 'completed');

    const matchesCategory = selectedCategory === 'Todos' || evt.category === selectedCategory;

    return matchesTab && matchesCategory;
  });

  const upcomingCount = INITIAL_EVENTS.filter(e => e.status === 'upcoming').length;
  const completedCount = INITIAL_EVENTS.filter(e => e.status === 'completed').length;

  return (
    <section id="community-events-section" className="w-full my-12 space-y-8 scroll-mt-20">
      
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto text-center space-y-3 px-2 sm:px-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-mono font-black uppercase tracking-widest text-[#f45f44] bg-[#faf0ec] border border-[#f8d7ce]">
          <Calendar className="w-3.5 h-3.5 text-[#f45f44]" />
          Agenda & Encuentros de la Comunidad
        </span>
        <h2 className="font-sans font-extrabold text-2xl sm:text-4xl text-[#3d2c29] tracking-tight">
          Eventos & Experiencias Élite
        </h2>
        <p className="text-xs sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
          Conecta en persona y de forma virtual. Capacitaciones estratégicas, talleres de liderazgo y encuentros de networking diseñados para hacer crecer tu emprendimiento.
        </p>
      </div>

      {/* Control Tabs & Filter Pills (Clean, uncluttered responsive container) */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-2 sm:p-2.5 rounded-2xl border border-gray-200/80 shadow-xs">
          
          {/* Main Status Tabs */}
          <div className="flex items-center gap-1.5 bg-gray-100/80 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all' 
                  ? 'bg-[#3d2c29] text-white shadow-xs' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Todos ({INITIAL_EVENTS.length})
            </button>
            
            <button
              type="button"
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'upcoming' 
                  ? 'bg-[#3d2c29] text-white shadow-xs' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              Próximos ({upcomingCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('completed')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'completed' 
                  ? 'bg-[#3d2c29] text-white shadow-xs' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#e9c8bc] shrink-0" />
              Realizados ({completedCount})
            </button>
          </div>

          {/* Sub-category pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none px-1">
            <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0 hidden md:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#faf0ec] text-[#f45f44] border border-[#f8d7ce]'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white rounded-3xl border border-gray-100 max-w-md mx-auto space-y-3">
            <Calendar className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="font-bold text-gray-700 text-sm">No hay eventos en esta categoría</p>
            <p className="text-xs text-gray-500">Intenta seleccionar otro filtro o ver todos los eventos.</p>
            <button
              type="button"
              onClick={() => { setActiveTab('all'); setSelectedCategory('Todos'); }}
              className="px-4 py-2 text-xs font-bold text-white bg-[#3d2c29] rounded-xl hover:bg-[#523d39] transition"
            >
              Ver todos los eventos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {filteredEvents.map((evt) => (
              <div 
                key={evt.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-xs hover:shadow-md hover:border-[#f8d7ce] transition-all flex flex-col group"
              >
                {/* Media Header */}
                <div className="relative w-full h-48 sm:h-56 bg-gray-900 overflow-hidden shrink-0">
                  <img 
                    src={evt.image} 
                    alt={evt.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wide bg-[#3d2c29]/90 backdrop-blur-md text-[#e9c8bc] border border-white/20 shadow-xs">
                      {evt.category}
                    </span>

                    {evt.status === 'upcoming' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase text-emerald-300 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Próximo Evento
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase text-gray-200 bg-black/60 backdrop-blur-md border border-white/20 shadow-xs">
                        <CheckCircle2 className="w-3 h-3 text-[#e9c8bc]" />
                        Realizado
                      </span>
                    )}
                  </div>

                  {/* Video indicator badge if has video */}
                  {evt.videoUrl && (
                    <div className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f45f44] text-white text-[11px] font-bold shadow-md">
                      <Play className="w-3 h-3 fill-current" />
                      Video Disponible
                    </div>
                  )}

                  {/* Date Badge on Bottom Left */}
                  <div className="absolute bottom-3 left-3 z-10 text-white space-y-0.5">
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-[#e9c8bc] bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
                      <Calendar className="w-3.5 h-3.5 text-[#f45f44]" />
                      {evt.date}
                    </div>
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {evt.subtitle && (
                      <p className="text-[11px] font-mono font-bold text-[#f45f44] uppercase tracking-wider">
                        {evt.subtitle}
                      </p>
                    )}
                    <h3 className="font-sans font-extrabold text-lg sm:text-xl text-[#3d2c29] group-hover:text-[#f45f44] transition-colors leading-snug">
                      {evt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                      {evt.description}
                    </p>
                  </div>

                  {/* Meta details list */}
                  <div className="pt-2 border-t border-gray-100 text-xs text-gray-500 space-y-1.5 font-medium">
                    {evt.time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#f45f44] shrink-0" />
                        <span>{evt.time}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#f45f44] shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                    {evt.attendeesCount && (
                      <div className="flex items-center gap-2 text-gray-400 text-[11px]">
                        <Users className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{evt.attendeesCount}+ Asistentes participando</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedEvent(evt)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3d2c29] hover:text-[#f45f44] transition cursor-pointer"
                    >
                      <span>Ver Detalles</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {evt.status === 'upcoming' && evt.rsvpWaLink ? (
                      <a
                        href={evt.rsvpWaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition shadow-xs active:scale-95 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Reservar Cupo</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedEvent(evt)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#3d2c29] text-xs font-bold transition cursor-pointer"
                      >
                        {evt.videoUrl ? <Video className="w-3.5 h-3.5 text-[#f45f44]" /> : <ImageIcon className="w-3.5 h-3.5 text-gray-500" />}
                        <span>Ver Resumen</span>
                      </button>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Event Details & Media Modal */}
      {selectedEvent && (
        <div id="event-detail-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div id="event-detail-card-modal" className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-6 max-h-[90vh] flex flex-col">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body Scrollable */}
            <div className="overflow-y-auto flex-1 space-y-6 p-5 sm:p-8">
              
              {/* Media Header / Video Embed */}
              {selectedEvent.videoUrl ? (
                <div className="relative w-full rounded-2xl overflow-hidden bg-black shadow-lg" style={{ paddingBottom: '56.25%' }}>
                  <iframe 
                    src={selectedEvent.videoUrl} 
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture" 
                    className="absolute top-0 left-0 w-full h-full"
                    title={selectedEvent.title}
                  />
                </div>
              ) : (
                <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden bg-gray-900 shadow-md">
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase bg-[#3d2c29] text-[#e9c8bc] border border-white/20">
                      {selectedEvent.category}
                    </span>
                    {selectedEvent.status === 'upcoming' ? (
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase text-emerald-300 bg-emerald-950/80 border border-emerald-500/30">
                        Próximo Evento
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase text-gray-200 bg-black/60 border border-white/20">
                        Evento Realizado
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Text Info */}
              <div className="space-y-4">
                <div className="space-y-1">
                  {selectedEvent.subtitle && (
                    <p className="text-xs font-mono font-bold text-[#f45f44] uppercase tracking-wider">
                      {selectedEvent.subtitle}
                    </p>
                  )}
                  <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#3d2c29] leading-tight">
                    {selectedEvent.title}
                  </h2>
                </div>

                {/* Key metadata badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-[#faf8f6] rounded-2xl border border-gray-200/80 text-xs text-gray-700">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#f45f44] shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900">Fecha</p>
                      <p>{selectedEvent.date}</p>
                    </div>
                  </div>

                  {selectedEvent.time && (
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#f45f44] shrink-0" />
                      <div>
                        <p className="font-bold text-gray-900">Horario</p>
                        <p>{selectedEvent.time}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2.5 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-[#f45f44] shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900">Ubicación / Modalidad</p>
                      <p>{selectedEvent.location}</p>
                    </div>
                  </div>
                </div>

                {/* Full description */}
                <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                  <h4 className="font-bold text-sm text-[#3d2c29]">Acerca de este evento</h4>
                  <p>{selectedEvent.fullDetails || selectedEvent.description}</p>
                </div>

              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-200 transition cursor-pointer"
              >
                Cerrar
              </button>

              {selectedEvent.status === 'upcoming' && selectedEvent.rsvpWaLink && (
                <a
                  href={selectedEvent.rsvpWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition shadow-md active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Reservar Cupo por WhatsApp</span>
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
