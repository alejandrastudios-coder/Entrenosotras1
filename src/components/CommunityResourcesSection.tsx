/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building2, HeartHandshake, Church, ShieldAlert, Users, Search, MapPin, 
  Phone, MessageCircle, Clock, ExternalLink, ArrowLeft, CheckCircle2, Sparkles, X, PlusCircle
} from 'lucide-react';
import { RESOURCE_CATEGORIES, INITIAL_RESOURCES, CommunityResource } from '../resourcesData';

interface CommunityResourcesSectionProps {
  onBackToHome?: () => void;
}

export default function CommunityResourcesSection({ onBackToHome }: CommunityResourcesSectionProps) {
  const [resources] = useState<CommunityResource[]>(INITIAL_RESOURCES);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedZone, setSelectedZone] = useState<string>('Todas');
  const [activeResourceModal, setActiveResourceModal] = useState<CommunityResource | null>(null);

  const zones = ['Todas', 'Orlando', 'Deltona', 'Kissimmee', 'Saint Cloud'];

  const filteredResources = resources.filter(res => {
    const matchesCat = selectedCategory === 'Todos' || res.category === selectedCategory;
    const matchesZone = selectedZone === 'Todas' || res.zone.toLowerCase().includes(selectedZone.toLowerCase());
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      res.title.toLowerCase().includes(query) ||
      res.subtitle.toLowerCase().includes(query) ||
      res.description.toLowerCase().includes(query) ||
      res.address.toLowerCase().includes(query) ||
      res.activities.some(a => a.toLowerCase().includes(query));

    return matchesCat && matchesZone && matchesQuery;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Iglesias':
        return <Church className="w-5 h-5 text-amber-600" />;
      case 'Centros Gratuitos':
        return <Building2 className="w-5 h-5 text-emerald-600" />;
      case 'Donaciones':
        return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      case 'Recursos para la Mujer':
        return <ShieldAlert className="w-5 h-5 text-purple-600" />;
      default:
        return <Users className="w-5 h-5 text-blue-600" />;
    }
  };

  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case 'Iglesias':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'Centros Gratuitos':
        return 'bg-emerald-100 text-emerald-900 border-emerald-200';
      case 'Donaciones':
        return 'bg-rose-100 text-rose-900 border-rose-200';
      case 'Recursos para la Mujer':
        return 'bg-purple-100 text-purple-900 border-purple-200';
      default:
        return 'bg-blue-100 text-blue-900 border-blue-200';
    }
  };

  return (
    <div id="community-resources-page" className="w-full space-y-8 animate-fadeIn">
      
      {/* Top Breadcrumb & Navigation */}
      <nav id="resources-breadcrumbs" className="flex items-center justify-between text-xs text-gray-500 font-mono">
        <div className="flex items-center gap-2">
          {onBackToHome && (
            <button 
              onClick={onBackToHome}
              className="inline-flex items-center gap-1 text-[#f45f44] hover:underline font-sans font-bold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Inicio
            </button>
          )}
          <span>/</span>
          <span className="text-[#3d2c29] font-bold">Recursos Comunitarios & Apoyo</span>
        </div>

        <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
          {resources.length} Centros & Entidades
        </span>
      </nav>

      {/* Trust & Warmth Hero Banner */}
      <header id="resources-hero" className="bg-gradient-to-br from-[#1c2e26] via-[#243d33] to-[#12221b] text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase text-emerald-300 bg-white/10 tracking-widest border border-emerald-400/20">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
            Centro de Ayuda y Respaldo Comunitario
          </span>

          <h2 className="font-sans font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Información Útil, Redes de Apoyo e Instituciones Aliadas
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-light">
            Queremos que ninguna mujer ni familia camine sola. En esta guía organizada encontrarás información verificada de iglesias, instituciones gratuitas, centros de donaciones, recursos para la mujer y servicios públicos.
          </p>

          {/* Search bar inside header */}
          <div className="pt-2 max-w-xl">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por institución, servicio (ej. 'alimentos', 'inglés', 'iglesia', 'ropa')..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400 shadow-sm"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Filter Toolbar (Categories & Zones) */}
      <div id="resources-filter-toolbar" className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
        
        {/* Category Pills */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Filtrar por Categoría de Ayuda:</p>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {RESOURCE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all tracking-wide cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-[#243d33] text-emerald-300 shadow-sm' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Zone Selector */}
        <div className="pt-3 border-t border-gray-100 flex items-center gap-3 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider shrink-0">Zona / Ciudad:</span>
          <div className="flex gap-1.5">
            {zones.map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  selectedZone === zone 
                    ? 'bg-emerald-100 text-emerald-950 font-bold border border-emerald-300' 
                    : 'bg-white text-gray-500 hover:text-gray-800'
                }`}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Cards List Grid */}
      {filteredResources.length === 0 ? (
        <div className="p-12 border-2 border-dashed border-gray-200 rounded-3xl text-center max-w-md mx-auto space-y-3 bg-white">
          <Building2 className="w-10 h-10 text-gray-300 mx-auto" />
          <p className="font-bold text-gray-700 text-sm">No encontramos recursos que coincidan con la búsqueda</p>
          <button 
            onClick={() => { setSelectedCategory('Todos'); setSelectedZone('Todas'); setSearchQuery(''); }}
            className="px-4 py-1.5 text-xs font-bold bg-[#243d33] text-white rounded-full"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div id="resources-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div 
              key={res.id}
              onClick={() => setActiveResourceModal(res)}
              className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
            >
              <div className="space-y-4">
                
                {/* Header Category Tag & Verified Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getCategoryBadgeStyle(res.category)}`}>
                    {getCategoryIcon(res.category)}
                    {res.category}
                  </span>

                  {res.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verificado
                    </span>
                  )}
                </div>

                {/* Titles */}
                <div className="space-y-1">
                  <h3 className="font-sans font-bold text-base text-[#3d2c29] group-hover:text-emerald-700 transition-colors leading-snug">
                    {res.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-800">
                    {res.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed font-light">
                  {res.description}
                </p>

                {/* Key metadata */}
                <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs text-gray-600 font-mono">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="truncate">{res.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate text-[11px]">{res.schedule}</span>
                  </div>
                </div>

              </div>

              {/* Action Link Footer */}
              <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span className="group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Ver detalles e información <ExternalLink className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full font-mono">
                  {res.zone}
                </span>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Suggest Resource Invitation Banner */}
      <section id="suggest-resource-banner" className="bg-[#f0f7f4] border border-[#d2e8dd] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-2.5 py-0.5 rounded-full">
            Construyamos la Red de Apoyo
          </span>
          <h4 className="font-sans font-bold text-lg text-[#1c2e26]">
            ¿Conoces o diriges una iglesia, fundación o centro gratuito en la zona?
          </h4>
          <p className="text-xs text-emerald-900 max-w-xl font-light">
            Ayúdanos a mantener este directorio actualizado. Escríbenos directamente para sumar nuevas instituciones de apoyo a la guía.
          </p>
        </div>

        <a 
          href="https://wa.me/14072181294?text=¡Hola!%20Me%20gustaría%20recomendar%20un%20Recurso%20Comunitario%20o%20Iglesia%20para%20sumar%20al%20directorio%20de%20Entre%20Nosotras."
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-[#243d33] hover:bg-[#12221b] text-white font-bold text-xs rounded-full shadow-md transition shrink-0 cursor-pointer text-center flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          Proponer Recurso por WhatsApp
        </a>
      </section>

      {/* RESOURCE DETAIL MODAL */}
      {activeResourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#243d33] text-white shrink-0">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                {getCategoryIcon(activeResourceModal.category)}
                {activeResourceModal.category}
              </span>
              <button 
                onClick={() => setActiveResourceModal(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              
              <div className="space-y-2 border-b border-gray-100 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {activeResourceModal.zone}
                </span>

                <h2 className="font-sans font-black text-xl sm:text-2xl text-[#3d2c29]">
                  {activeResourceModal.title}
                </h2>

                <p className="text-xs font-bold text-emerald-800">
                  {activeResourceModal.subtitle}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#3d2c29] uppercase tracking-wider">
                  Descripción y Misión
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed font-light bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  {activeResourceModal.description}
                </p>
              </div>

              {/* Activities list */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#3d2c29] uppercase tracking-wider">
                  Servicios, Horarios y Actividades Disponibles
                </h4>
                <ul className="space-y-2 text-xs text-gray-700">
                  {activeResourceModal.activities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact info card */}
              <div className="bg-[#f0f7f4] border border-[#d2e8dd] rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                  Ubicación y Datos de Contacto Directo
                </h4>

                <div className="space-y-2 text-xs text-emerald-900 font-mono">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>Dirección:</strong> {activeResourceModal.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span><strong>Horario:</strong> {activeResourceModal.schedule}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span><strong>Teléfono:</strong> {activeResourceModal.phone}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <a 
                    href={`tel:${activeResourceModal.phone.replace(/[^\d+]/g, '')}`}
                    className="px-4 py-2 bg-[#243d33] hover:bg-[#12221b] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition"
                  >
                    <Phone className="w-3.5 h-3.5" /> Llamar por Teléfono
                  </a>

                  {activeResourceModal.whatsapp && (
                    <a 
                      href={`https://wa.me/${activeResourceModal.whatsapp}?text=¡Hola!%20Les%20escribo%20desde%20la%20guía%20de%20la%20comunidad%20Entre%20Nosotras%20para%20consultar%20sobre%20sus%20servicios%20y%20horarios.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Escribir a WhatsApp
                    </a>
                  )}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
              <button 
                onClick={() => setActiveResourceModal(null)}
                className="px-6 py-2 bg-[#243d33] text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Cerrar Ventana
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
