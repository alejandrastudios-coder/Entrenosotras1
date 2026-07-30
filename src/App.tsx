/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, SlidersHorizontal, Store, Sparkles, ArrowRight, X, ShieldCheck
} from 'lucide-react';
import Navbar, { ActiveTab } from './components/Navbar';
import EntrepreneurCard from './components/EntrepreneurCard';
import ProfileDetails from './components/ProfileDetails';
import AddProfileModal from './components/AddProfileModal';
import SpecialOffersSection from './components/SpecialOffersSection';
import HomepageDoorways from './components/HomepageDoorways';
import DirectoryPage from './components/DirectoryPage';
import CommunityPage from './components/CommunityPage';
import OffersPage from './components/OffersPage';
import EventsPage from './components/EventsPage';
import BlogSection from './components/BlogSection';
import CommunityResourcesSection from './components/CommunityResourcesSection';
import ContactPage from './components/ContactPage';
import { INITIAL_ENTREPRENEURS } from './data';
import { Entrepreneur, Review, CATEGORIES } from './types';

export default function App() {
  // Navigation View State
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedBlogArticleId, setSelectedBlogArticleId] = useState<string | null>(null);

  // Directory State with LocalStorage persistence & cleanup for test profiles
  const [entrepreneurs, setEntrepreneurs] = useState<Entrepreneur[]>(() => {
    try {
      const saved = localStorage.getItem('entre_nosotras_profiles');
      if (saved) {
        const parsed: Entrepreneur[] = JSON.parse(saved);
        const cleaned = parsed.filter(e => 
          e.name !== '1' && 
          e.businessName !== '1' && 
          e.id !== '1' &&
          !e.name.toLowerCase().includes('1 de barberia') &&
          !e.businessName.toLowerCase().includes('1 de barberia')
        );
        return cleaned.length > 0 ? cleaned : INITIAL_ENTREPRENEURS;
      }
    } catch (err) {
      console.error('Error loading saved profiles:', err);
    }
    return INITIAL_ENTREPRENEURS;
  });

  // Save to LocalStorage whenever entrepreneurs change
  useEffect(() => {
    try {
      localStorage.setItem('entre_nosotras_profiles', JSON.stringify(entrepreneurs));
    } catch (err) {
      console.error('Error saving profiles:', err);
    }
  }, [entrepreneurs]);

  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Dialog Modals State
  const [selectedEntrepreneurId, setSelectedEntrepreneurId] = useState<string | null>(null);
  const [addBusinessOpen, setAddBusinessOpen] = useState(false);

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

  // Live filter calculator for homepage teaser directory
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

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab !== 'blog') setSelectedBlogArticleId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="application-container" className="min-h-screen bg-[#faf8f6] font-sans flex flex-col antialiased">
      
      {/* Navbar Component */}
      <Navbar 
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onAddBusinessClick={() => setAddBusinessOpen(true)}
        onRefreshClick={handleRefreshDirectory}
      />

      {/* RENDER DEDICATED INDEPENDENT PAGES / VIEWS */}

      {/* 1. HOMEPAGE VIEW */}
      {activeTab === 'home' && (
        <main className="flex-1 w-full">
          
          {/* PRIMERA SECCIÓN: Video Principal (Hero Section Protagonista) */}
          <section 
            id="hero-banner" 
            className="w-full bg-[#1b100e] overflow-hidden border-b border-gray-100 select-none shadow-md"
          >
            <div className="w-full max-w-none mx-auto">
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

          {/* Main Landing Sections Container */}
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 space-y-12">
            
            {/* SEGUNDA SECCIÓN: Ofertas Relámpago de la Comunidad */}
            <SpecialOffersSection />

            {/* TERCERA SECCIÓN: Buscador & Introducción de Emprendimientos */}
            <section id="directory-intro-section" className="space-y-6">
              
              {/* Introducción Minimalista y Elegante */}
              <div className="text-center max-w-3xl mx-auto space-y-3 px-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#f45f44] bg-[#f45f44]/10">
                  <Store className="w-3.5 h-3.5" />
                  Directorio Verificado
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-4xl text-[#3d2c29] tracking-tight">
                  Encuentra el servicio que necesitas
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                  Dentro de la comunidad podrás encontrar profesionales, emprendimientos, especialistas, empresas y servicios recomendados por las mismas integrantes en la Florida Central.
                </p>
              </div>

              {/* Buscador & Filtros */}
              <div id="directory-controls" className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm space-y-4">
                <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
                  
                  {/* Buscador por Nombre, Empresa, Categoría, Servicio, Ubicación */}
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Search className="w-4 h-4 text-gray-400" />
                    </span>
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar por nombre, empresa, categoría, servicio o ubicación..." 
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

                  {/* Rubros selector */}
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
              </div>

              {/* Sample Grid Preview (Limit 4 cards on home for clean look) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredEntrepreneurs.slice(0, 4).map((ent) => (
                  <EntrepreneurCard 
                    key={ent.id}
                    entrepreneur={ent}
                    onOpenDetails={(id) => setSelectedEntrepreneurId(id)}
                  />
                ))}
              </div>

              {/* Button to View Full Directory */}
              <div className="text-center pt-2">
                <button
                  onClick={() => handleSelectTab('directory')}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3d2c29] hover:bg-[#523d39] text-[#e9c8bc] font-bold text-xs rounded-full shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <Store className="w-4 h-4 text-[#f45f44]" />
                  <span>Ver Directorio Completo de Emprendimientos ({entrepreneurs.length})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </section>

            {/* BLOQUES INVITACIÓN / PUERTAS DE ENTRADA A LAS OTRAS PÁGINAS */}
            <HomepageDoorways onNavigate={handleSelectTab} />

          </div>
        </main>
      )}

      {/* 2. DEDICATED DIRECTORY PAGE */}
      {activeTab === 'directory' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6">
          <DirectoryPage 
            entrepreneurs={entrepreneurs}
            onOpenDetails={(id) => setSelectedEntrepreneurId(id)}
            onAddBusinessClick={() => setAddBusinessOpen(true)}
            onBackToHome={() => handleSelectTab('home')}
          />
        </main>
      )}

      {/* 3. DEDICATED COMMUNITY PAGE */}
      {activeTab === 'community' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6">
          <CommunityPage 
            onBackToHome={() => handleSelectTab('home')}
            onOpenEntrepreneurProfile={(id) => setSelectedEntrepreneurId(id)}
            onOpenAddBusinessModal={() => setAddBusinessOpen(true)}
          />
        </main>
      )}

      {/* 4. DEDICATED OFFERS PAGE */}
      {activeTab === 'offers' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6">
          <OffersPage onBackToHome={() => handleSelectTab('home')} />
        </main>
      )}

      {/* 5. DEDICATED EVENTS PAGE */}
      {activeTab === 'events' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6">
          <EventsPage 
            onBackToHome={() => handleSelectTab('home')}
            onOpenEntrepreneurProfile={(id) => setSelectedEntrepreneurId(id)}
          />
        </main>
      )}

      {/* 6. DEDICATED BLOG PAGE */}
      {activeTab === 'blog' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6">
          <BlogSection 
            selectedArticleId={selectedBlogArticleId}
            onBackToHome={() => handleSelectTab('home')}
          />
        </main>
      )}

      {/* 7. DEDICATED COMMUNITY RESOURCES PAGE */}
      {activeTab === 'resources' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6">
          <CommunityResourcesSection />
        </main>
      )}

      {/* 8. DEDICATED CONTACT PAGE */}
      {activeTab === 'contact' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6">
          <ContactPage onBackToHome={() => handleSelectTab('home')} />
        </main>
      )}

      {/* Entrepreneur Full Profile Details Modal */}
      {selectedEntrepreneur && (
        <ProfileDetails 
          entrepreneur={selectedEntrepreneur}
          onClose={() => setSelectedEntrepreneurId(null)}
          onAddReview={handleAddReview}
        />
      )}

      {/* Add New Entrepreneur Profile Modal */}
      {addBusinessOpen && (
        <AddProfileModal 
          onClose={() => setAddBusinessOpen(false)}
        />
      )}

      {/* Footer */}
      <footer id="app-footer" className="bg-[#3d2c29] text-[#e9c8bc] border-t border-[#523d39] mt-16 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#523d39]">
                <img src="https://i.ibb.co/23VcLTbq/Whats-App-Image-2026-07-29-at-9-29-35-PM.jpg" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-sans font-bold text-white text-sm">ENTRE NOSOTRAS</h3>
            </div>
            <p className="text-[#dfbfae] leading-relaxed font-light">
              Plataforma y comunidad oficial de emprendedoras locales en la Florida Central.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Navegación</h4>
            <ul className="space-y-1.5 text-[#dfbfae]">
              <li><button onClick={() => handleSelectTab('home')} className="hover:text-white cursor-pointer">Inicio</button></li>
              <li><button onClick={() => handleSelectTab('community')} className="hover:text-white cursor-pointer">Comunidad</button></li>
              <li><button onClick={() => handleSelectTab('directory')} className="hover:text-white cursor-pointer">Directorio</button></li>
              <li><button onClick={() => handleSelectTab('offers')} className="hover:text-white cursor-pointer">Ofertas Relámpago</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Secciones</h4>
            <ul className="space-y-1.5 text-[#dfbfae]">
              <li><button onClick={() => handleSelectTab('events')} className="hover:text-white cursor-pointer">Eventos & Agenda</button></li>
              <li><button onClick={() => handleSelectTab('blog')} className="hover:text-white cursor-pointer">Blog Digital</button></li>
              <li><button onClick={() => handleSelectTab('resources')} className="hover:text-white cursor-pointer">Recursos Comunitarios</button></li>
              <li><button onClick={() => handleSelectTab('contact')} className="hover:text-white cursor-pointer">Contacto & Atención</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Contacto Directo</h4>
            <p className="text-[#dfbfae]">Florida Central (Kissimmee, Orlando, Deltona)</p>
            <p className="text-white font-mono font-bold">+1 (407) 218-1294</p>
            <button
              onClick={() => setAddBusinessOpen(true)}
              className="mt-2 px-4 py-2 bg-[#f45f44] text-white font-bold rounded-xl text-[11px] hover:bg-[#ff6f55] transition cursor-pointer"
            >
              Sumar Mi Emprendimiento
            </button>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-[#523d39] text-center text-[10px] text-[#dfbfae] font-mono">
          © {new Date().getFullYear()} Entre Nosotras. Todos los derechos reservados.
        </div>
      </footer>

    </div>
  );
}
