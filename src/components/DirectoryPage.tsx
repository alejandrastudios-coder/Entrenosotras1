/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, SlidersHorizontal, Store, ShieldCheck, X, RefreshCw, ArrowLeft, Sparkles 
} from 'lucide-react';
import { Entrepreneur, CATEGORIES } from '../types';
import EntrepreneurCard from './EntrepreneurCard';

interface DirectoryPageProps {
  entrepreneurs: Entrepreneur[];
  onOpenDetails: (id: string) => void;
  onAddBusinessClick: () => void;
  onBackToHome?: () => void;
}

export default function DirectoryPage({ 
  entrepreneurs, 
  onOpenDetails, 
  onAddBusinessClick,
  onBackToHome 
}: DirectoryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredEntrepreneurs = entrepreneurs.filter(e => {
    const catLower = e.category.toLowerCase();
    const selLower = selectedCategory.toLowerCase();

    const matchesCategory = 
      selectedCategory === 'Todos' || 
      e.category === selectedCategory ||
      catLower.includes(selLower) ||
      selLower.includes(catLower) ||
      (selectedCategory === 'Barbería' && (
        catLower.includes('barber') || 
        e.instagram.toLowerCase().includes('barber') ||
        e.businessName.toLowerCase().includes('barber') ||
        e.description.toLowerCase().includes('barber') ||
        e.id.includes('norely')
      )) ||
      (selectedCategory === 'Estilista & Estética' && (
        catLower.includes('estil') ||
        catLower.includes('peluquer') ||
        catLower.includes('estét')
      ));
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      e.name.toLowerCase().includes(query) ||
      e.businessName.toLowerCase().includes(query) ||
      e.category.toLowerCase().includes(query) ||
      e.location.toLowerCase().includes(query) ||
      e.description.toLowerCase().includes(query) ||
      e.products.some(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div id="directory-page-view" className="w-full space-y-8 animate-fadeIn">
      
      {/* Navigation Breadcrumbs */}
      <nav id="directory-breadcrumbs" className="flex items-center justify-between text-xs text-gray-500 font-mono">
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
          <span className="text-[#3d2c29] font-bold">Directorio de Emprendimientos</span>
        </div>

        <span className="bg-[#3d2c29] text-[#e9c8bc] px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
          {entrepreneurs.length} Negocios Verificados
        </span>
      </nav>

      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#f45f44] bg-[#f45f44]/10">
          <Store className="w-3.5 h-3.5" />
          Comercio Local Femenino
        </span>
        <h1 className="font-sans font-extrabold text-2xl sm:text-4xl text-[#3d2c29] tracking-tight">
          Directorio Oficial de Emprendedoras
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 font-light">
          Encuentra especialistas, servicios de belleza, gastronomía, modas y asesorías recomendadas por la comunidad Entre Nosotras.
        </p>
      </div>

      {/* Search Bar & Category Controls */}
      <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, servicio, producto (ej: 'serum', 'barbería'), ciudad..." 
              className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f45f44] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                type="button"
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none shrink-0 select-none">
            <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0 hidden sm:block" />
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  type="button"
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all uppercase tracking-wide cursor-pointer ${
                    selectedCategory === cat 
                      ? 'bg-[#3d2c29] text-[#e9c8bc] shadow-sm' 
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100/80 hover:text-gray-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>

        {searchQuery && (
          <div className="text-xs text-gray-500 font-medium">
            Resultados para: <span className="text-[#f45f44] font-bold">"{searchQuery}"</span> en categoría {selectedCategory}. Mostrando {filteredEntrepreneurs.length} proyectos.
          </div>
        )}
      </div>

      {/* Directory Cards Grid */}
      {filteredEntrepreneurs.length === 0 ? (
        <div className="p-16 border-2 border-dashed border-gray-100 rounded-3xl text-center max-w-xl mx-auto space-y-4 bg-white/50 select-none">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <p className="font-sans font-bold text-gray-800 text-sm">No encontramos proyectos que coincidan</p>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
              Prueba cambiando el término de búsqueda o seleccionando "Todos" en la categoría.
            </p>
          </div>
          <button
            onClick={() => { setSelectedCategory('Todos'); setSearchQuery(''); }}
            type="button"
            className="px-4 py-2 rounded-full text-xs font-bold text-white bg-[#3d2c29] hover:bg-[#523d39] transition-all cursor-pointer"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEntrepreneurs.map((ent) => (
            <EntrepreneurCard 
              key={ent.id}
              entrepreneur={ent}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      )}

      {/* Bottom CTA Banner */}
      <div className="bg-[#faf0ec] border border-[#f8d7ce] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-sans font-bold text-lg text-[#3d2c29]">
            ¿Tienes un emprendimiento o prestas servicios en Florida?
          </h3>
          <p className="text-xs text-gray-600 font-light">
            Únete a nuestro directorio oficial y conecta con cientos de clientes de la comunidad.
          </p>
        </div>
        <button
          onClick={onAddBusinessClick}
          className="px-6 py-3 bg-[#f45f44] hover:bg-[#ff6f55] text-white font-bold text-xs rounded-full shadow-md transition whitespace-nowrap cursor-pointer shrink-0"
        >
          Sumar Mi Emprendimiento
        </button>
      </div>

    </div>
  );
}
