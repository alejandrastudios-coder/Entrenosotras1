/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Tag, Percent } from 'lucide-react';
import SpecialOffersSection from './SpecialOffersSection';

interface OffersPageProps {
  onBackToHome?: () => void;
}

export default function OffersPage({ onBackToHome }: OffersPageProps) {
  return (
    <div id="offers-page-view" className="w-full space-y-8 animate-fadeIn">
      
      {/* Breadcrumbs */}
      <nav id="offers-breadcrumbs" className="flex items-center justify-between text-xs text-[#3d2c29] font-mono">
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
          <span className="text-[#3d2c29] font-bold">Ofertas Relámpago</span>
        </div>

        <span className="bg-[#3d2c29] text-[#e9c8bc] px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
          Ahorros Exclusivos
        </span>
      </nav>

      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#f45f44] bg-[#f45f44]/10">
          <Percent className="w-3.5 h-3.5" />
          Comercio Directo Sin Intermediarios
        </span>
        <h1 className="font-sans font-extrabold text-2xl sm:text-4xl text-[#3d2c29] tracking-tight">
          Ofertas & Promociones de la Comunidad
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 font-light">
          Aprovecha descuentos únicos en productos de belleza, vestuario, repostería y servicios profesionales ofrecidos directamente por nuestras emprendedoras.
        </p>
      </div>

      {/* Full Special Offers Section */}
      <SpecialOffersSection />

    </div>
  );
}
