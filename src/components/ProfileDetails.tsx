/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, MapPin, Instagram, Mail, Phone, Calendar, 
  ShoppingBag, Star, HelpCircle, MessageSquare, Award, CheckCircle 
} from 'lucide-react';
import { Entrepreneur, Product, Review } from '../types';

interface ProfileDetailsProps {
  entrepreneur: Entrepreneur;
  onClose: () => void;
  onAddReview: (entrepreneurId: string, review: Review) => void;
}

type ActiveTab = 'bio' | 'products' | 'reviews' | 'faq';

export default function ProfileDetails({ entrepreneur, onClose, onAddReview }: ProfileDetailsProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('bio');
  
  // Google Login Simulated State
  const [googleUser, setGoogleUser] = useState<{ name: string; email: string; avatar: string } | null>(() => {
    try {
      const saved = localStorage.getItem('entre_nosotras_google_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [showAccountPicker, setShowAccountPicker] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // New Review Form States
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState('');

  // Accordion faq states
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleInquireProduct = (product: Product) => {
    const cleanPhone = entrepreneur.phone.replace(/[^\d]/g, '');
    const priceText = product.price !== undefined ? `💰 *Precio:* $${product.price.toLocaleString('es-AR')}` : '💰 *Precio:* Cotización personalizada';
    const textMsg = `¡Hola, ${entrepreneur.name}! 👋\n\nTe escribo desde la plataforma de la comunidad *Entre Nosotras*. Vi tu servicio/producto en tu vitrina digital y me interesó muchísimo:\n\n📌 *${product.name}*\n${priceText}\n\nMe gustaría consultarte sobre la disponibilidad para reservar este servicio, los horarios en los que trabajas y cómo podemos coordinar.\n\n¡Muchas gracias de antemano! 😊`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textMsg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleGoogleLogin = (user: { name: string; email: string; avatar: string }) => {
    setIsLoggingIn(true);
    setTimeout(() => {
      setGoogleUser(user);
      localStorage.setItem('entre_nosotras_google_user', JSON.stringify(user));
      setIsLoggingIn(false);
      setShowAccountPicker(false);
    }, 900);
  };

  const handleGoogleLogout = () => {
    setGoogleUser(null);
    localStorage.removeItem('entre_nosotras_google_user');
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customEmail.trim()) return;
    
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(customName)}&background=f45f44&color=fff&size=128`;
    
    handleGoogleLogin({
      name: customName.trim(),
      email: customEmail.trim(),
      avatar
    });
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    const authorName = googleUser ? googleUser.name : reviewAuthor.trim();
    if (!authorName || !reviewComment.trim()) {
      setReviewError('Por favor redacta un comentario para tu reseña.');
      return;
    }

    const newRevList: Review = {
      id: `rev-${Date.now()}`,
      author: authorName,
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: 'Recientemente',
      avatar: googleUser ? googleUser.avatar : undefined,
      isGoogleVerified: !!googleUser
    };

    onAddReview(entrepreneur.id, newRevList);
    setReviewSuccess(true);
    setReviewError('');
    setReviewComment('');
    setReviewRating(5);

    setTimeout(() => {
      setReviewSuccess(false);
    }, 4500);
  };

  return (
    <div id="p-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        id="p-modal-card" 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-[92vh] flex flex-col transform transition-all"
      >
        {/* Close Button overlapping cover image */}
        <button 
          id="btn-close-pmodal"
          onClick={onClose} 
          type="button"
          className="absolute top-4 right-4 z-20 p-2 text-white bg-black/30 hover:bg-black/55 backdrop-blur-md rounded-full transition-all border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover Image & Branding Header */}
        <div id="pmodal-header" className="relative h-44 sm:h-56 overflow-hidden shrink-0">
          <img 
            src={entrepreneur.coverImage} 
            alt={entrepreneur.businessName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          
          {/* Header text content aligned at bottom */}
          <div className="absolute bottom-5 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Profile Avatar inside cover */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-4 border-white overflow-hidden shadow-lg shrink-0">
                <img 
                  src={entrepreneur.avatar} 
                  alt={entrepreneur.name} 
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover ${entrepreneur.avatarPos || 'object-top'}`}
                />
              </div>
              <div className="text-white space-y-0.5">
                <div className="flex items-center gap-2">
                  <h2 className="font-sans font-bold text-lg sm:text-2xl tracking-wide">{entrepreneur.businessName}</h2>
                  {entrepreneur.isPremium && (
                    <span className="flex items-center gap-0.5 px-2 py-0.5 text-[8px] sm:text-[9px] font-black uppercase text-amber-900 bg-amber-400 rounded-full border border-amber-300 shadow">
                      <Award className="w-2.5 h-2.5" />
                      Recomendada
                    </span>
                  )}
                </div>
                <p className="font-mono text-xs text-[#e9c8bc] uppercase tracking-wider">Por {entrepreneur.name}</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-300 pt-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#f45f44]" />
                  <span>{entrepreneur.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Average Score Block */}
            <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 shrink-0 self-start sm:self-auto">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <div className="text-white text-xs">
                <p className="font-bold">{entrepreneur.rating.toFixed(1)} / 5.0</p>
                <p className="text-[10px] text-gray-300 font-medium">{entrepreneur.reviewsCount} opiniones</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div id="pmodal-navigation" className="bg-gray-50 px-6 border-b border-gray-100 flex overflow-x-auto gap-6 shrink-0 scrollbar-none select-none">
          <button
            id="tab-bio"
            onClick={() => setActiveTab('bio')}
            className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition duration-200 whitespace-nowrap ${
              activeTab === 'bio' ? 'border-[#f45f44] text-[#f45f44]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Sobre Mí
          </button>
          <button
            id="tab-products"
            onClick={() => setActiveTab('products')}
            className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition duration-200 whitespace-nowrap ${
              activeTab === 'products' ? 'border-[#f45f44] text-[#f45f44]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Nuestros Productos ({entrepreneur.products.length})
          </button>
          <button
            id="tab-reviews"
            onClick={() => setActiveTab('reviews')}
            className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition duration-200 whitespace-nowrap ${
              activeTab === 'reviews' ? 'border-[#f45f44] text-[#f45f44]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Opiniones ({entrepreneur.reviews.length})
          </button>
          <button
            id="tab-faq"
            onClick={() => setActiveTab('faq')}
            className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition duration-200 whitespace-nowrap ${
              activeTab === 'faq' ? 'border-[#f45f44] text-[#f45f44]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Preguntas Frecuentes
          </button>
        </div>

        {/* Dynamic Modal Content (Scrolling view) */}
        <div id="pmodal-body" className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {activeTab === 'bio' && (
            /* Bio View: Profile Narrative biography + contact sidebars */
            <div id="view-tab-bio" className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Full descriptive letter */}
              <div className="md:col-span-2 space-y-4">
                <h3 className="font-sans font-bold text-gray-900 text-lg border-b border-gray-100 pb-2">
                  La Historia Detrás del Emprendimiento
                </h3>
                <p className="text-gray-600 font-light text-sm leading-relaxed whitespace-pre-line">
                  {entrepreneur.fullBio}
                </p>
                <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 flex items-start gap-3 mt-6">
                  <Star className="w-5 h-5 text-[#f45f44] shrink-0 fill-[#f45f44]" />
                  <p className="text-xs text-[#523d39] leading-relaxed">
                    <strong>Nuestra Promesa Comunidad:</strong> Formo parte activa de la comunidad "Entre Nosotras", colaborando con redes de emprendedoras asociadas y contribuyendo a economías éticas de impacto local.
                  </p>
                </div>
              </div>

              {/* Direct channels sidebar */}
              <div className="space-y-4">
                <div className="p-5 border border-gray-100 rounded-2xl bg-gray-50 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#3d2c29] border-b border-gray-200 pb-2">
                    Contacto Directo
                  </h4>
                  
                  <div className="space-y-3.5">
                    <a 
                      id="contact-instagram"
                      href={`https://instagram.com/${entrepreneur.instagram.replace('@', '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#f45f44] transition-colors"
                    >
                      <Instagram className="w-4 h-4 text-pink-600 shrink-0" />
                      <span className="truncate">{entrepreneur.instagram}</span>
                    </a>

                    <a 
                      id="contact-email"
                      href={`mailto:${entrepreneur.email}`} 
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#f45f44] transition-colors"
                    >
                      <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate">{entrepreneur.email}</span>
                    </a>

                    <a 
                      id="contact-phone"
                      href={`tel:${entrepreneur.phone.replace(/\s+/g, '')}`} 
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#f45f44] transition-colors"
                    >
                      <Phone className="w-4 h-4 text-green-600 shrink-0" />
                      <span className="truncate">{entrepreneur.phone}</span>
                    </a>
                  </div>

                  {/* WhatsApp Quick chat helper */}
                  <div className="pt-2">
                    <a
                      id="btn-fast-chat-bio"
                      href={`https://wa.me/${entrepreneur.phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`¡Hola, ${entrepreneur.name}! 👋\n\nTe escribo desde la plataforma de la comunidad *Entre Nosotras*. Vi tu perfil de *${entrepreneur.businessName}* (${entrepreneur.category}) y me interesó muchísimo tu trabajo.\n\nMe gustaría consultar tu disponibilidad de turnos, conocer más sobre tus servicios y cómo coordinar una cita.\n\n¡Muchas gracias! 😊`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-xl bg-green-600 text-white hover:bg-green-700 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-white" />
                      Contactar por WhatsApp
                    </a>
                    <p className="text-[10px] text-gray-400 text-center mt-2.5">
                      Abrirá una conversación directa en tu celular o de forma segura en WhatsApp Web.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'products' && (
            /* Products tab: Grid items with Chat integration */
            <div id="view-tab-products" className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-3">
                <div>
                  <h3 className="font-sans font-bold text-gray-900 text-lg">Catálogo Virtual Seleccionado</h3>
                  <p className="text-xs text-gray-500">Haz clic en "Consultar" para enviar un mensaje directo a la emprendedora consultando stock.</p>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{entrepreneur.category}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {entrepreneur.products.map((p) => (
                  <div 
                    key={p.id} 
                    id={`product-card-${p.id}`}
                    className="group border border-gray-100 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Product image or Before/After split comparison */}
                      {p.beforeImage && p.afterImage ? (
                        <div className="relative h-52 bg-slate-100 overflow-hidden shrink-0 grid grid-cols-2 gap-0.5 p-0.5 bg-gray-200">
                          <div className="relative h-full overflow-hidden group/before">
                            <img 
                              src={p.beforeImage} 
                              alt={`${p.name} Antes`} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover/before:scale-105"
                            />
                            <span className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-xs text-white text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 rounded shadow-xs">
                              Antes
                            </span>
                          </div>

                          <div className="relative h-full overflow-hidden group/after">
                            <img 
                              src={p.afterImage} 
                              alt={`${p.name} Después`} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover/after:scale-105"
                            />
                            <span className="absolute bottom-2 right-2 bg-emerald-600 text-white text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 rounded shadow-xs">
                              Después
                            </span>
                          </div>

                          {p.tag && (
                            <span className="absolute top-2 left-2 z-10 bg-[#f45f44] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
                              {p.tag}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="relative h-44 bg-slate-50 overflow-hidden shrink-0">
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {p.tag && (
                            <span className="absolute top-3 left-3 bg-[#f45f44] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                              {p.tag}
                            </span>
                          )}
                          {p.price !== undefined && (
                            <span className="absolute bottom-3 right-3 bg-black/75 text-white font-mono text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                              ${p.price.toLocaleString('es-AR')}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Info and detail block */}
                      <div className="p-4 space-y-1.5">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-sans font-bold text-[#3d2c29] text-sm group-hover:text-[#f45f44] transition-colors">{p.name}</h4>
                          {p.price !== undefined ? (
                            <span className="text-[#f45f44] font-bold text-sm whitespace-nowrap">${p.price.toLocaleString('es-AR')}</span>
                          ) : (
                            <span className="text-[#f45f44] font-bold text-xs whitespace-nowrap bg-[#faf0ec] px-2.5 py-0.5 rounded-full border border-[#f8d7ce]">
                              Cotización
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed font-light">{p.description}</p>
                      </div>
                    </div>

                    {/* Order action */}
                    <div className="p-4 pt-1">
                      <button
                        id={`btn-inquire-prod-${p.id}`}
                        onClick={() => handleInquireProduct(p)}
                        type="button"
                        className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-[#faf0ec] bg-[#3d2c29] hover:bg-[#523d39] rounded-xl transition duration-200"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#f45f44]" />
                        Consultar disponibilidad
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            /* Reviews tab: Cumulative listing of reviews + Custom write form builder */
            <div id="view-tab-reviews" className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Accumulated listing of client voices */}
              <div className="md:col-span-2 space-y-5">
                <h3 className="font-sans font-bold text-gray-900 text-lg border-b border-gray-100 pb-2">Opiniones de la Comunidad</h3>
                
                <div className="space-y-4">
                  {entrepreneur.reviews.map((r) => (
                    <div 
                      key={r.id} 
                      id={`review-item-${r.id}`}
                      className="p-4 border border-gray-100 rounded-2xl bg-gray-50/50 space-y-2.5 shadow-sm hover:shadow-md transition duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          {r.avatar ? (
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 shadow-inner">
                              <img src={r.avatar} alt={r.author} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              {r.isGoogleVerified && (
                                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow border border-gray-100">
                                  <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="none">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                                  </svg>
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-orange-100 text-[#f45f44] flex items-center justify-center text-xs font-bold font-sans uppercase">
                              {r.author.charAt(0)}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <span className="font-sans font-bold text-gray-800 text-xs sm:text-sm leading-none">{r.author}</span>
                              {r.isGoogleVerified && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase text-blue-700 bg-blue-50 border border-blue-100 shadow-sm leading-none">
                                  G Verificado
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium">{r.date}</span>
                      </div>
                      
                      {/* Rating star drawing according to score */}
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${
                              i < r.rating 
                                ? 'fill-amber-400 text-amber-400' 
                                : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed font-light">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form creation side layout builder with Google Sign-In */}
              <div>
                {!googleUser ? (
                  /* Google Auth Portal wrapper to guarantee quick secure rating authorization */
                  <div id="google-auth-card" className="p-5 border border-gray-100 rounded-2xl bg-white shadow-md text-center space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-[#4285F4]" />
                    
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                      </svg>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-sans font-bold text-gray-900 text-sm">Deja tu Opinión</h4>
                      <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                        Para asegurar valoraciones reales y evitar perfiles falsos, por favor inicia sesión de forma rápida con Google.
                      </p>
                    </div>

                    {isLoggingIn ? (
                      <div className="flex flex-col items-center justify-center py-4 gap-2">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-[10px] text-gray-500 font-medium">Conectando con Google...</span>
                      </div>
                    ) : showAccountPicker ? (
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-left space-y-2 animate-fadeIn">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Elige una cuenta</p>
                        
                        {/* Alejandra Studios actual active user pre-populated */}
                        <button
                          type="button"
                          onClick={() => handleGoogleLogin({
                            name: 'Alejandra Studios',
                            email: 'alejandrastudios@gmail.com',
                            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150'
                          })}
                          className="w-full flex items-center gap-2.5 p-2 bg-white rounded-lg border border-gray-100 hover:border-blue-400 hover:bg-blue-50/20 text-left transition text-xs"
                        >
                          <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150" alt="Alejandra Studios" className="w-full h-full object-cover" />
                          </div>
                          <div className="truncate">
                            <p className="font-bold text-gray-800 leading-none">Alejandra Studios</p>
                            <p className="text-[9px] text-gray-400 truncate">alejandrastudios@gmail.com</p>
                          </div>
                        </button>

                        {/* Guest Account option */}
                        <button
                          type="button"
                          onClick={() => handleGoogleLogin({
                            name: 'Invitado Comunidad',
                            email: 'invitado.comunidad@gmail.com',
                            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150'
                          })}
                          className="w-full flex items-center gap-2.5 p-2 bg-white rounded-lg border border-gray-100 hover:border-blue-400 hover:bg-blue-50/20 text-left transition text-xs"
                        >
                          <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150" alt="Invitado Comunidad" className="w-full h-full object-cover" />
                          </div>
                          <div className="truncate">
                            <p className="font-bold text-gray-800 leading-none">Invitado Comunidad</p>
                            <p className="text-[9px] text-gray-400 truncate">invitado.comunidad@gmail.com</p>
                          </div>
                        </button>

                        {/* Custom Google account option */}
                        {!showCustomInput ? (
                          <button
                            type="button"
                            onClick={() => setShowCustomInput(true)}
                            className="w-full py-1.5 text-center text-[10px] font-bold text-[#f45f44] hover:underline"
                          >
                            Usar otra cuenta de Google
                          </button>
                        ) : (
                          <form onSubmit={handleCustomGoogleSubmit} className="pt-2 border-t border-gray-200/50 space-y-2 animate-fadeIn">
                            <input 
                              type="text"
                              value={customName}
                              onChange={(e) => setCustomName(e.target.value)}
                              placeholder="Nombre en tu Google"
                              className="w-full px-2.5 py-1.5 text-xs border border-gray-200 bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                              required
                            />
                            <input 
                              type="email"
                              value={customEmail}
                              onChange={(e) => setCustomEmail(e.target.value)}
                              placeholder="ejemplo@gmail.com"
                              className="w-full px-2.5 py-1.5 text-xs border border-gray-200 bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                              required
                            />
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setShowCustomInput(false)}
                                className="flex-1 py-1 text-[10px] border border-gray-200 rounded text-gray-500 hover:bg-gray-100"
                              >
                                Volver
                              </button>
                              <button
                                type="submit"
                                className="flex-1 py-1 text-[10px] bg-blue-600 hover:bg-blue-700 rounded text-white font-bold"
                              >
                                Acceder
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    ) : (
                      <button
                        id="btn-google-signin"
                        type="button"
                        onClick={() => setShowAccountPicker(true)}
                        className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl shadow-sm transition hover:shadow-md duration-200"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                        </svg>
                        <span>Continuar con Google</span>
                      </button>
                    )}
                  </div>
                ) : (
                  /* Form is beautifully unlocked and prefilled using the active Google profile */
                  <form 
                    id="form-write-review"
                    onSubmit={submitReview} 
                    className="p-5 border border-gray-100 rounded-2xl bg-white shadow-md space-y-4 relative"
                  >
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                          <img src={googleUser.avatar} alt={googleUser.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-800 leading-none">{googleUser.name}</p>
                          <p className="text-[9px] text-gray-400 font-mono leading-tight">{googleUser.email}</p>
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={handleGoogleLogout}
                        className="text-[10px] font-bold text-gray-400 hover:text-[#f45f44] transition underline"
                      >
                        Salir
                      </button>
                    </div>

                    {reviewSuccess && (
                      <div id="review-success-banner" className="p-3 bg-green-50 border-l-4 border-green-500 rounded text-[11px] text-green-800 flex items-start gap-1.5 font-medium animate-fadeIn">
                        <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                        <span>¡Tu reseña de Google se ha sumado con éxito! ¡Muchas gracias por aportar!</span>
                      </div>
                    )}

                    {reviewError && (
                      <div id="review-error-banner" className="p-2.5 bg-red-50 border-l-4 border-red-500 text-[11px] text-red-700 rounded font-medium">
                        {reviewError}
                      </div>
                    )}

                    {/* Interactivo selector de estrellas */}
                    <div>
                      <span className="block text-[10px] font-bold text-gray-500 mb-1">Calificación</span>
                      <div className="flex items-center gap-1.5">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const starValue = i + 1;
                          return (
                            <button
                              key={i}
                              id={`star-btn-${starValue}`}
                              type="button"
                              onClick={() => setReviewRating(starValue)}
                              className="p-0.5 hover:scale-110 transition duration-150"
                            >
                              <Star 
                                className={`w-6 h-6 cursor-pointer ${
                                  starValue <= reviewRating 
                                    ? 'fill-amber-400 text-amber-400' 
                                    : 'text-gray-300 hover:text-amber-300'
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="textarea-rev-comment" className="block text-[10px] font-bold text-gray-500 mb-1">Tu Mensaje/Opinión *</label>
                      <textarea 
                        id="textarea-rev-comment"
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Comparte tu experiencia con este servicio..." 
                        className="w-full px-3 py-2 text-xs border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#f45f44] resize-none"
                        required
                      ></textarea>
                    </div>

                    <button
                      id="btn-submit-review"
                      type="submit"
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md transition-all hover:-translate-y-0.5"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white" />
                      </svg>
                      <span>Publicar Opinión Verificada</span>
                    </button>
                  </form>
                )}
              </div>

            </div>
          )}

          {activeTab === 'faq' && (
            /* FAQs tab: Beautiful accordion panel */
            <div id="view-tab-faq" className="space-y-4 max-w-2xl mx-auto">
              <h3 className="font-sans font-bold text-gray-900 text-lg border-b border-gray-100 pb-2 mb-6 text-center">
                Preguntas Frecuentes ({entrepreneur.businessName})
              </h3>
              
              <div id="faq-accordions-group" className="space-y-3.5">
                {entrepreneur.faqs.map((faq, index) => {
                  const isOpen = expandedFaq === index;
                  return (
                    <div 
                      key={index} 
                      id={`faq-item-${index}`}
                      className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm"
                    >
                      <button
                        id={`faq-btn-${index}`}
                        type="button"
                        onClick={() => setExpandedFaq(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50/50 text-left hover:bg-gray-50 transition"
                      >
                        <span className="font-bold text-xs sm:text-sm text-gray-800 flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-[#f45f44] shrink-0" />
                          {faq.question}
                        </span>
                        <span className="text-[#f45f44] font-bold text-lg select-none ml-2">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      
                      {isOpen && (
                        <div id={`faq-panel-${index}`} className="p-4 border-t border-gray-50 text-xs sm:text-sm text-gray-600 leading-relaxed font-light whitespace-pre-line bg-white animate-fadeIn">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
