/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Home, Users, Store, Tag, Calendar, BookOpen, HeartHandshake, 
  Mail, UserPlus, Menu, X, Sparkles 
} from 'lucide-react';

export type ActiveTab = 'home' | 'directory' | 'community' | 'offers' | 'events' | 'blog' | 'resources' | 'contact';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onAddBusinessClick: () => void;
  onRefreshClick: () => void;
}

export default function Navbar({ 
  activeTab, 
  onSelectTab, 
  onAddBusinessClick, 
  onRefreshClick 
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: ActiveTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home, highlight: false },
    { id: 'community', label: 'Comunidad', icon: Users, highlight: false },
    { id: 'directory', label: 'Emprendimientos', icon: Store, highlight: false },
    { id: 'offers', label: 'Ofertas', icon: Tag, highlight: false },
    { id: 'events', label: 'Eventos', icon: Calendar, highlight: false },
    { id: 'blog', label: 'Blog', icon: BookOpen, highlight: true },
    { id: 'resources', label: 'Recursos', icon: HeartHandshake, highlight: false },
    { id: 'contact', label: 'Contacto', icon: Mail, highlight: false },
  ];

  return (
    <header id="app-header" className="sticky top-0 z-40 w-full bg-[#3d2c29] text-[#e9c8bc] border-b border-[#523d39] shadow-md px-4 py-2.5 sm:px-6">
      <div id="navbar-container" className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <div 
          id="navbar-brand" 
          onClick={() => { onSelectTab('home'); onRefreshClick(); setMobileMenuOpen(false); }} 
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div id="brand-logo-container" className="relative w-10 h-10 sm:w-11 sm:h-11 bg-[#332422] rounded-xl overflow-hidden shadow-md border border-[#523d39] flex items-center justify-center transition-transform group-hover:scale-105 duration-300 shrink-0">
            <img 
              src="https://i.ibb.co/23VcLTbq/Whats-App-Image-2026-07-29-at-9-29-35-PM.jpg" 
              alt="Entre Nosotras Logo" 
              className="w-full h-full object-cover" 
            />
          </div>

          <div id="brand-text-block">
            <h1 className="font-sans font-bold text-base sm:text-lg leading-tight tracking-[0.16em] text-white">
              ENTRE NOSOTRAS
            </h1>
            <p className="font-mono text-[9px] sm:text-[10px] tracking-wider text-[#dfbfae] uppercase">
              Comunidad de Emprendedoras
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links Menu */}
        <nav id="desktop-nav-menu" className="hidden xl:flex items-center gap-1 text-xs font-semibold">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as ActiveTab)}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive 
                    ? item.highlight 
                      ? 'bg-[#f45f44] text-white font-bold shadow-xs'
                      : 'bg-white/20 text-white font-bold shadow-xs' 
                    : 'text-[#dfbfae] hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#f45f44]'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div id="navbar-actions-right" className="flex items-center gap-2">
          
          <button
            id="btn-add-business"
            onClick={onAddBusinessClick}
            type="button"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-full bg-[#f45f44] hover:bg-[#ff6f55] text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer shrink-0"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Sumar Mi Emprendimiento</span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#e9c8bc] hover:text-white transition cursor-pointer"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div id="mobile-drawer-menu" className="xl:hidden mt-3 pt-3 border-t border-[#523d39] space-y-2 pb-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id as ActiveTab)}
                  className={`p-2.5 rounded-xl flex items-center gap-2 text-left transition ${
                    isActive 
                      ? 'bg-[#f45f44] text-white font-bold shadow-sm' 
                      : 'bg-white/5 text-[#dfbfae] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-[#f45f44] group-hover:text-white" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => { onAddBusinessClick(); setMobileMenuOpen(false); }}
            type="button"
            className="w-full mt-2 py-2.5 text-center text-xs font-bold rounded-xl bg-[#f45f44] text-white shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Sumar Mi Emprendimiento por WhatsApp
          </button>
        </div>
      )}

    </header>
  );
}
