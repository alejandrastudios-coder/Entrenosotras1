/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Users, HelpCircle, UserPlus, Calendar } from 'lucide-react';

interface NavbarProps {
  onAddBusinessClick: () => void;
  onAboutClick: () => void;
  onEventsClick?: () => void;
  onRefreshClick: () => void;
}

export default function Navbar({ onAddBusinessClick, onAboutClick, onEventsClick, onRefreshClick }: NavbarProps) {
  return (
    <header id="app-header" className="sticky top-0 z-40 w-full bg-[#3d2c29] text-[#e9c8bc] border-b border-[#523d39] shadow-md px-4 py-3 sm:px-6">
      <div id="navbar-container" className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <div 
          id="navbar-brand" 
          onClick={onRefreshClick} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Logo oficial original */}
          <div id="brand-logo-container" className="relative w-11 h-11 bg-[#332422] rounded-xl overflow-hidden shadow-md border border-[#523d39] flex items-center justify-center transition-transform group-hover:scale-105 duration-300 shrink-0">
            <img 
              src="https://i.ibb.co/23VcLTbq/Whats-App-Image-2026-07-29-at-9-29-35-PM.jpg" 
              alt="Entre Nosotras Logo" 
              className="w-full h-full object-cover" 
            />
          </div>

          <div id="brand-text-block">
            <h1 className="font-sans font-bold text-lg leading-tight tracking-[0.16em] text-white">
              ENTRE NOSOTRAS
            </h1>
            <p className="font-mono text-[10px] tracking-wider text-[#dfbfae] uppercase">
              Comunidad de Emprendedoras
            </p>
          </div>
        </div>

        {/* Action Controls & Info */}
        <div id="navbar-actions" className="flex items-center flex-wrap justify-center gap-2.5 sm:gap-3">
          {onEventsClick && (
            <button
              id="btn-events"
              onClick={onEventsClick}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full bg-white/10 hover:bg-white/20 text-[#dfbfae] hover:text-white transition duration-200 border border-white/10 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#f45f44]" />
              Eventos
            </button>
          )}

          <button
            id="btn-about"
            onClick={onAboutClick}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full bg-white/10 hover:bg-white/20 text-[#dfbfae] hover:text-white transition duration-200 border border-white/10 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#f45f44]" />
            Misión & Liderazgo
          </button>
          
          <button
            id="btn-add-business"
            onClick={onAddBusinessClick}
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-[#f45f44] hover:bg-[#ff6f55] text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            Sumar Mi Emprendimiento
          </button>
        </div>

      </div>
    </header>
  );
}
