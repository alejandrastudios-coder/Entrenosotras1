/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles, Award, MessageCircle, Percent, Gift, ChevronRight } from 'lucide-react';
import { SPECIAL_OFFERS } from '../offersData';
import { INITIAL_ENTREPRENEURS } from '../data';
import { SpecialOffer } from '../types';

export default function SpecialOffersSection() {
  const [activeTab, setActiveTab] = useState<'flash' | 'seasonal'>('flash');
  
  // Real active countdown timer state for flash offers
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 2,
    minutes: 44,
    seconds: 12,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Restart countdown cycle for preview freshness
          return { hours: 3, minutes: 12, seconds: 45 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatWithZero = (num: number) => num.toString().padStart(2, '0');

  const filteredOffers = SPECIAL_OFFERS.filter((off) => off.offerType === activeTab);

  return (
    <section 
      id="special-offers-section" 
      className="bg-white rounded-3xl border border-orange-100/60 p-6 md:p-8 shadow-md mb-10 overflow-hidden relative"
    >
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-50/40 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Section Header */}
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase text-amber-700 bg-amber-50 tracking-wider">
            <Percent className="w-3.5 h-3.5 text-[#f45f44]" />
            Oportunidades Únicas
          </span>
          <h2 className="font-sans font-extrabold text-2xl text-gray-900 tracking-tight mt-1">
            Vitrina de Ofertas de la Comunidad
          </h2>
          <p className="text-xs text-gray-500 max-w-xl">
            Descubrí promociones exclusivas con stock ultra-limitado o cupones diseñados para fechas célebres directamente de nuestras creadoras.
          </p>
        </div>

        {/* Action Toggle Switch styled like premium hubs */}
        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100 max-sm:w-full shrink-0 select-none">
          <button
            id="offer-tab-flash"
            type="button"
            onClick={() => setActiveTab('flash')}
            className={`flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-extrabold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'flash'
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Relámpago
          </button>
          <button
            id="offer-tab-seasonal"
            type="button"
            onClick={() => setActiveTab('seasonal')}
            className={`flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-extrabold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'seasonal'
                ? 'bg-[#3d2c29] text-[#e9c8bc] shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Gift className="w-3.5 h-3.5 text-[#f45f44]" />
            Fechas Especiales
          </button>
        </div>
      </div>

      {activeTab === 'flash' ? (
        /* LIGHTNING FLASH DEALS HUB */
        <div id="flash-deals-tab-container" className="space-y-6">
          {/* Header Banner countdown clock */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50/70 border border-orange-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 text-white rounded-xl flex items-center justify-center animate-pulse">
                <Flame className="w-5 h-5 fill-white" />
              </div>
              <div>
                <p className="font-sans font-bold text-gray-900 text-sm">¡Ahorros Relámpago de la Semana!</p>
                <p className="text-[11px] text-gray-500 leading-snug">Artículos únicos a precio de costo por tiempo limitado. Trato directo sin comisiones intermedias.</p>
              </div>
            </div>

            {/* Timer visual */}
            <div className="flex items-center gap-2 shrink-0">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cierra en:</span>
              <div className="flex items-center gap-1 font-mono text-sm font-black text-white">
                <span className="bg-[#3d2c29] px-2 py-1 rounded-md min-w-[32px] text-center shadow-sm text-xs sm:text-sm">{formatWithZero(timeLeft.hours)}</span>
                <span className="text-[#3d2c29] font-bold">:</span>
                <span className="bg-[#3d2c29] px-2 py-1 rounded-md min-w-[32px] text-center shadow-sm text-xs sm:text-sm">{formatWithZero(timeLeft.minutes)}</span>
                <span className="text-[#3d2c29] font-bold">:</span>
                <span className="bg-orange-500 px-2 py-1 rounded-md min-w-[32px] text-center shadow-sm text-xs sm:text-sm">{formatWithZero(timeLeft.seconds)}</span>
              </div>
            </div>
          </div>

          {/* Flash Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOffers.map((off) => {
              const stockRemaining = off.stockLimit - off.stockSold;
              const progressPercentage = (off.stockSold / off.stockLimit) * 100;
              const hasFewLeft = stockRemaining <= 2;
              const discountPercent = Math.round(((off.originalPrice - off.discountPrice) / off.originalPrice) * 100);

              const entrepreneur = INITIAL_ENTREPRENEURS.find(e => e.id === off.entrepreneurId);
              const phone = entrepreneur?.phone || "+54 11 3456-7890";
              const cleanPhone = phone.replace(/[^\d]/g, '');
              const customText = `¡Hola, ${off.entrepreneurName}! 👋\n\nTe escribo desde la plataforma de la comunidad *Entre Nosotras*. Vi tu *Oferta Relámpago* activa y me encantaría reservarla antes de que se agote:\n\n⚡ *Oferta:* ${off.productName}\n💰 *Precio Especial:* $${off.discountPrice.toLocaleString('es-AR')} (Antes: $${off.originalPrice.toLocaleString('es-AR')})\n\n¿Aún tienes disponibilidad/cupo para coordinar y agendar esta promoción?\n\n¡Muchas gracias! ⚡😊`;
              const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customText)}`;

              return (
                <div 
                  key={off.id} 
                  id={`flash-box-${off.id}`}
                  className="group relative flex flex-col sm:flex-row bg-slate-50/50 hover:bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 p-4 gap-4"
                >
                  {/* Photo area */}
                  <div className="relative w-full sm:w-40 h-40 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <img 
                      src={off.image} 
                      alt={off.productName} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                      {discountPercent}% OFF
                    </span>
                  </div>

                  {/* Offering info */}
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Store Brand link context */}
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        <span>{off.businessName}</span>
                        <span className="text-[#f45f44]">•</span>
                        <span>Por {off.entrepreneurName}</span>
                      </div>

                      <h3 className="font-sans font-bold text-gray-900 text-sm mt-1 mb-1.5 leading-snug group-hover:text-orange-600 transition-colors">
                        {off.productName}
                      </h3>
                      
                      <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                        {off.description}
                      </p>
                    </div>

                    {/* Stock Bar Meter & Prices */}
                    <div className="space-y-2">
                      <div className="flex items-end justify-between gap-2">
                        {/* Prices */}
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-lg font-black text-red-600">${off.discountPrice.toLocaleString('es-AR')}</span>
                          <span className="font-mono text-xs text-gray-400 line-through">${off.originalPrice.toLocaleString('es-AR')}</span>
                        </div>

                        {/* Stock remaining alarm message */}
                        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                          hasFewLeft ? 'text-red-600 bg-red-50 animate-pulse' : 'text-[#3d2c29] bg-orange-50'
                        }`}>
                          {stockRemaining > 0 ? `Quedan ${stockRemaining} unid.` : '¡Agotado!'}
                        </span>
                      </div>

                      {/* Stock Bar progress */}
                      <div className="space-y-1">
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              hasFewLeft ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-orange-400'
                            }`} 
                            style={{ width: `${progressPercentage}%` }} 
                          />
                        </div>
                        <div className="flex justify-between items-center text-[9px] text-gray-400 font-mono uppercase">
                          <span>{off.stockSold} vendidos</span>
                          <span>Cap: {off.stockLimit}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <a
                      id={`btn-flash-claim-${off.id}`}
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl transition shadow-sm hover:scale-[1.01]"
                    >
                      <MessageCircle className="w-3.5 h-3.5 shrink-0 text-white" />
                      Reservar por WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* PROGRAMMED HOLIDAYS & SPECIAL DATES */
        <div id="seasonal-campaigns-tab-container" className="space-y-6">
          
          <div className="p-4 bg-[#fcf8f6] border border-orange-100/50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#3d2c29] text-white rounded-xl flex items-center justify-center">
                <Gift className="w-5 h-5 text-[#f45f44]" />
              </div>
              <div>
                <p className="font-sans font-bold text-[#3d2c29] text-sm">Fechas Claves del Año</p>
                <p className="text-[11px] text-gray-500 leading-snug">
                  Descubrí cómo se organizan nuestras productoras para el calendario festivo (e.g., Día de la Madre 🌸). ¡Suma un cupón de regalo y ahorra en tu encargo!
                </p>
              </div>
            </div>

            {/* Calendar Banner Highlight */}
            <div className="flex items-center gap-2.5 bg-white border border-gray-100 px-3 py-1.5 rounded-xl shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f45f44] animate-pulse" />
              <div className="text-left">
                <p className="text-[10px] uppercase font-mono text-gray-400 font-bold">Campaña Activa</p>
                <p className="text-[11px] text-gray-800 font-bold">Octubre Especial Mamá 🌸</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOffers.map((off) => {
              const discountPercent = Math.round(((off.originalPrice - off.discountPrice) / off.originalPrice) * 100);

              const entrepreneur = INITIAL_ENTREPRENEURS.find(e => e.id === off.entrepreneurId);
              const phone = entrepreneur?.phone || "+54 11 3456-7890";
              const cleanPhone = phone.replace(/[^\d]/g, '');
              const customText = `¡Hola, ${off.entrepreneurName}! 👋\n\nTe escribo desde la plataforma de la comunidad *Entre Nosotras*. Vi tu oferta especial para la campaña de *"${off.seasonalEventName}"* y me encantaría reservarla:\n\n🌸 *Especial:* ${off.productName}\n💰 *Precio Promocional:* $${off.discountPrice.toLocaleString('es-AR')}\n🎟️ *Código de Descuento:* ${off.couponCode || 'PROMO'}\n\n¿Me podrías contar cómo coordinamos la reserva y los detalles del servicio?\n\n¡Muchas gracias! 🌸😊`;
              const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customText)}`;

              return (
                <div 
                  key={off.id} 
                  id={`seasonal-box-${off.id}`}
                  className="group relative flex flex-col sm:flex-row bg-white border border-orange-100/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 p-4 gap-4"
                >
                  {/* Photo area */}
                  <div className="relative w-full sm:w-40 h-40 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <img 
                      src={off.image} 
                      alt={off.productName} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-2 left-2 bg-[#3d2c29] text-[#e9c8bc] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-sm border border-orange-200/50">
                      {off.seasonalEventName}
                    </span>
                  </div>

                  {/* Offering info */}
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Store Brand link context */}
                      <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        <span>{off.businessName}</span>
                        <span className="text-orange-500">Ahorra {discountPercent}%</span>
                      </div>

                      <h3 className="font-sans font-bold text-gray-900 text-sm mt-1 mb-1.5 leading-snug group-hover:text-[#f45f44] transition-colors">
                        {off.productName}
                      </h3>
                      
                      <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                        {off.description}
                      </p>
                    </div>

                    {/* Prices along Coupon Code pill */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-mono text-base font-black text-gray-900">${off.discountPrice.toLocaleString('es-AR')}</span>
                        <span className="font-mono text-[10px] text-gray-400 line-through">${off.originalPrice.toLocaleString('es-AR')}</span>
                      </div>

                      {/* Display Coupon Pill */}
                      {off.couponCode && (
                        <div className="flex flex-col items-end">
                          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Cupón</span>
                          <span className="font-mono text-[10px] font-black text-[#f45f44] bg-orange-50 border border-orange-100 px-2 py-0.5 rounded">
                            {off.couponCode}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <a
                      id={`btn-seasonal-claim-${off.id}`}
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-white shrink-0" />
                      Consultar Promo por WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Educational calendar guide explaining Madre, Fiestas structure */}
          <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#f45f44]" />
              Guía de Fechas Destacadas en Entre Nosotras
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px] text-gray-500 leading-relaxed pt-1 select-none">
              <div className="space-y-0.5 p-2 bg-white rounded-lg border border-gray-100">
                <p className="font-bold text-gray-800">🌸 Día de la Madre (Octubre)</p>
                <p>Las productoras arman cofres dulces, sets de vajilla decorada y combos skincare listos para regalar, con envíos coordinados de regalos sorpresa.</p>
              </div>
              <div className="space-y-0.5 p-2 bg-white rounded-lg border border-gray-100">
                <p className="font-bold text-gray-800">💝 Día de la Amiga (Julio)</p>
                <p>Kits duales (champús sólidos X2, sets de mates "para compartir" o alfajores por docena compartidos) con descuentos por cantidad.</p>
              </div>
              <div className="space-y-0.5 p-2 bg-white rounded-lg border border-gray-100">
                <p className="font-bold text-gray-800">🎄 Especial Navidad (Diciembre)</p>
                <p>Adornos en cerámica hechos a mano, panettone artesanal de masa madre con almendras y cosmética sólida para obsequios éticos de fin de año.</p>
              </div>
            </div>
          </div>

        </div>
      )}
    </section>
  );
}
