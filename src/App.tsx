/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, SlidersHorizontal, BookOpen, AlertCircle, 
  MapPin, Heart, ArrowRight, ShieldCheck, RefreshCw, X
} from 'lucide-react';
import Navbar from './components/Navbar';
import EntrepreneurCard from './components/EntrepreneurCard';
import ProfileDetails from './components/ProfileDetails';
import AddProfileModal from './components/AddProfileModal';
import SpecialOffersSection from './components/SpecialOffersSection';
import EventsSection from './components/EventsSection';
import AboutUsSection from './components/AboutUsSection';
import { INITIAL_ENTREPRENEURS } from './data';
import { Entrepreneur, Review, CATEGORIES } from './types';

export default function App() {
  // Directory State
  const [entrepreneurs, setEntrepreneurs] = useState<Entrepreneur[]>(INITIAL_ENTREPRENEURS);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Dialog Modals State
  const [selectedEntrepreneurId, setSelectedEntrepreneurId] = useState<string | null>(null);
  const [addBusinessOpen, setAddBusinessOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  // Smooth scroll to Events Section
  const handleScrollToEvents = () => {
    const el = document.getElementById('community-events-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reset the directory data
  const handleRefreshDirectory = () => {
    setEntrepreneurs(INITIAL_ENTREPRENEURS);
    setSelectedCategory('Todos');
    setSearchQuery('');
  };

  // Review Form addition
  const handleAddReview = (entrepreneurId: string, newReview: Review) => {
    setEntrepreneurs(prev => prev.map(e => {
      if (e.id === entrepreneurId) {
        const updatedReviews = [newReview, ...e.reviews];
        // Calculate new Average rating weighted
        const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
        const average = totalRating / updatedReviews.length;
        return {
          ...e,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length,
          rating: average
        };
      }
      return e;
    }));
  };

  // Add custom entrepreneur profile
  const handleSaveAddProfile = (newProfile: Entrepreneur) => {
    setEntrepreneurs(prev => [newProfile, ...prev]);
    setAddBusinessOpen(false);
  };

  // Live filter calculator search Query
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

  const selectedEntrepreneur = entrepreneurs.find(e => e.id === selectedEntrepreneurId);

  return (
    <div id="application-container" className="min-h-screen bg-[#faf8f6] font-sans flex flex-col antialiased">
      
      {/* Navbar Component */}
      <Navbar 
        onAddBusinessClick={() => setAddBusinessOpen(true)}
        onAboutClick={() => setAboutOpen(true)}
        onEventsClick={handleScrollToEvents}
        onRefreshClick={handleRefreshDirectory}
      />

      {/* Hero Welcome banner with high-impact video showcase */}
      <section 
        id="hero-banner" 
        className="w-full bg-[#1b100e] overflow-hidden border-b border-gray-100 select-none"
      >
        <div className="w-full max-w-none mx-auto">
          {/* Responsive container matching the 16:9 or 4:3 video ratio perfectly */}
          <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
            <iframe 
              src="https://player.vimeo.com/video/1203234411?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;loop=1&amp;muted=1&amp;background=1&amp;playsinline=1" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: 'none' }}
              title="Entre_Nosotras_video_con_logo"
            />
          </div>
        </div>
      </section>

      {/* Main Directory & Sidebar Controls */}
      <main id="main-directory" className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6">
        
        {/* Showcase special campaign offers (Flash & Seasonal) */}
        <SpecialOffersSection />

        {/* Navigation Filters & Search Input panel */}
        <div id="directory-controls" className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mb-8 space-y-4">
          
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input bar */}
            <div id="search-bar-wrapper" className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </span>
              <input 
                id="directory-search-input"
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, producto (ej: 'pistacho', 'serum', 'taza'), ubicación..." 
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f45f44] focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  id="btn-clear-search"
                  onClick={() => setSearchQuery('')}
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Rubros Selector Section inside header */}
            <div id="rubros-header-controls" className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none shrink-0 select-none">
              <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0 hidden sm:block" />
              <div className="flex gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    id={`filter-pill-${cat}`}
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
            <div id="search-meta-results" className="text-xs text-gray-500 font-medium">
              Buscando: <span className="text-[#f45f44] font-bold">"{searchQuery}"</span> en categotías {selectedCategory}. Mostrando {filteredEntrepreneurs.length} resultados.
            </div>
          )}
        </div>

        {/* Directory Card List grid layout */}
        {filteredEntrepreneurs.length === 0 ? (
          /* Empty Search results status display */
          <div id="empty-results-box" className="p-16 border-2 border-dashed border-gray-100 rounded-3xl text-center max-w-xl mx-auto space-y-4 bg-white/50 select-none">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <p className="font-sans font-bold text-gray-800 text-sm">No encontramos proyectos que coincidan</p>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
                Prueba relajando la búsqueda o usando términos genéricos sobre los rubros. Acuérdate de revisar las palabras en singular.
              </p>
            </div>
            <button
              id="btn-clear-all-states"
              onClick={handleRefreshDirectory}
              type="button"
              className="px-4 py-2 rounded-full text-xs font-bold text-white bg-[#3d2c29] hover:bg-[#523d39] transition-all"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          /* Cards Grid list */
          <div 
            id="directory-cards-grid" 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredEntrepreneurs.map((ent) => (
              <EntrepreneurCard 
                key={ent.id}
                entrepreneur={ent}
                onOpenDetails={(id) => setSelectedEntrepreneurId(id)}
              />
            ))}
          </div>
        )}

        {/* Dedicated Events Section (Próximos & Realizados) */}
        <EventsSection 
          onOpenEntrepreneurProfile={(id) => setSelectedEntrepreneurId(id)}
        />

        {/* Dedicated Misión, Visión, Valores y Liderazgo Section */}
        <AboutUsSection 
          onOpenEntrepreneurProfile={(id) => setSelectedEntrepreneurId(id)} 
        />

        {/* Cooperative Stats & About banner relocate */}
        <section 
          id="cooperative-about-card" 
          className="mt-12 bg-gradient-to-br from-[#3d2c29] to-[#2c1d1a] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg select-none"
        >
          {/* Decorative ambient spots */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#f45f44]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#e9c8bc]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 justify-between">
            <div className="space-y-3 max-w-xl text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase text-[#e9c8bc] bg-white/10 tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f45f44]" />
                Nuestra Comunidad Colectiva
              </span>
              <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                Impulsando la economía social juntas
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                Te damos la bienvenida a <strong>Entre Nosotras</strong>, un espacio diseñado para visibilizar proyectos auto-gestionados liderados por mujeres. Filtra por rubros, conoce sus trayectorias y ponte en contacto directo con ellas de forma fácil y segura a través de WhatsApp.
              </p>
            </div>

            {/* Stats block with layout */}
            <div id="hero-stats" className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto shrink-0 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/10 text-center text-[#e9c8bc]">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-2xl min-w-[120px]">
                <p className="font-mono text-xl sm:text-2xl font-black text-white">100%</p>
                <p className="text-[9px] uppercase font-bold text-gray-400 mt-1">Mujeres Líderes</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-2xl min-w-[120px]">
                <p className="font-mono text-xl sm:text-2xl font-black text-white">{entrepreneurs.length}</p>
                <p className="text-[9px] uppercase font-bold text-gray-400 mt-1">Proyectos Activos</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-2xl min-w-[120px]">
                <p className="font-mono text-xl sm:text-2xl font-black text-white font-sans">4</p>
                <p className="text-[9px] uppercase font-bold text-gray-400 mt-1 font-sans">Rubros Clave</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-2xl min-w-[120px]">
                <p className="font-mono text-xs sm:text-sm font-black text-white py-1">Patagonia</p>
                <p className="text-[9px] uppercase font-bold text-gray-400 mt-1">Y Alcance Federal</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Entrepreneur profile details modal dialog */}
      {selectedEntrepreneur && (
        <ProfileDetails 
          entrepreneur={selectedEntrepreneur}
          onClose={() => setSelectedEntrepreneurId(null)}
          onAddReview={handleAddReview}
        />
      )}

      {/* Sumar Mi Emprendimiento Modal component */}
      {addBusinessOpen && (
        <AddProfileModal 
          onClose={() => setAddBusinessOpen(false)}
          onSave={handleSaveAddProfile}
        />
      )}

      {/* Quiénes somos - About Modal dialog explanation */}
      {aboutOpen && (
        <div id="about-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div id="about-card-modal" className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all p-6 md:p-8 my-8 max-h-[90vh] overflow-y-auto">
            <button 
              id="btn-close-about"
              onClick={() => setAboutOpen(false)} 
              type="button"
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <AboutUsSection 
              onOpenEntrepreneurProfile={(id) => {
                setAboutOpen(false);
                setSelectedEntrepreneurId(id);
              }}
            />

            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button
                id="btn-close-about-ok"
                onClick={() => setAboutOpen(false)}
                type="button"
                className="px-6 py-2.5 font-bold text-xs sm:text-sm rounded-xl text-white bg-[#3d2c29] hover:bg-[#523d39] transition duration-200 cursor-pointer shadow-md"
              >
                Cerrar y Explorar la Red
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Consolidated Footer info with official logo */}
      <footer id="app-footer" className="mt-auto py-8 text-center text-xs font-mono tracking-wide text-gray-500 border-t border-gray-100 bg-white space-y-3">
        <div className="flex items-center justify-center gap-2.5">
          <img 
            src="https://i.ibb.co/23VcLTbq/Whats-App-Image-2026-07-29-at-9-29-35-PM.jpg" 
            alt="Entre Nosotras Logo" 
            className="w-8 h-8 rounded-lg object-cover border border-gray-200 shadow-xs" 
          />
          <span className="font-sans font-black text-xs text-[#3d2c29] tracking-[0.16em] uppercase">ENTRE NOSOTRAS</span>
        </div>
        <p>© {new Date().getFullYear()} Red Entre Nosotras • Hecho con Amor para Mujeres Creadoras</p>
      </footer>

    </div>
  );
}
