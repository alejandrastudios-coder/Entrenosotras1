/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, MessageCircle, ArrowUpRight, Star } from 'lucide-react';
import { Entrepreneur } from '../types';

interface EntrepreneurCardProps {
  key?: string;
  entrepreneur: Entrepreneur;
  onOpenDetails: (id: string) => void;
}

export default function EntrepreneurCard({ entrepreneur, onOpenDetails }: EntrepreneurCardProps) {
  const cleanPhone = entrepreneur.phone.replace(/[^\d]/g, '');
  const messageText = `¡Hola, ${entrepreneur.name}! 👋\n\nTe escribo desde la plataforma de la comunidad *Entre Nosotras*. Vi tu perfil de *${entrepreneur.businessName}* (${entrepreneur.category}) y me interesó muchísimo tu trabajo.\n\nMe gustaría consultar disponibilidad de turnos, conocer más sobre tus servicios y cómo coordinar una cita.\n\n¡Muchas gracias! 😊`;
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;

  return (
    <div 
      id={`card-${entrepreneur.id}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Category Banner pill & Cover Image */}
      <div id={`cover-wrapper-${entrepreneur.id}`} className="relative h-32 text-white bg-slate-100 overflow-hidden">
        <img 
          src={entrepreneur.coverImage} 
          alt={`Banner de ${entrepreneur.businessName}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div id={`overlay-${entrepreneur.id}`} className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        
        {/* Category Badge */}
        <span 
          id={`category-badge-${entrepreneur.id}`}
          className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase bg-black/60 backdrop-blur-md rounded-full border border-white/20"
        >
          {entrepreneur.category}
        </span>

        {/* Status Indicator */}
        <span 
          id={`status-badge-${entrepreneur.id}`}
          className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold uppercase rounded-full tracking-wider ${
            entrepreneur.status === 'online' 
              ? 'bg-green-500/90 text-white' 
              : 'bg-gray-700/80 text-gray-200'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${entrepreneur.status === 'online' ? 'bg-white animate-pulse' : 'bg-gray-400'}`} />
          {entrepreneur.status === 'online' ? 'Activa' : 'Desconectada'}
        </span>
      </div>

      {/* Profile Avatar overlapping */}
      <div id={`avatar-overlapping-${entrepreneur.id}`} className="relative px-5 pt-0 pb-3 flex justify-between items-end">
        <div className="-mt-10 relative">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-white">
            <img 
              src={entrepreneur.avatar} 
              alt={entrepreneur.name} 
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover ${entrepreneur.avatarPos || 'object-top'}`}
            />
          </div>
        </div>

        {/* Rating Stars */}
        <div id={`ratings-wrapper-${entrepreneur.id}`} className="flex items-center gap-1 text-xs font-semibold text-gray-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100/50">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{entrepreneur.rating.toFixed(1)}</span>
          <span className="text-gray-400 font-normal">({entrepreneur.reviewsCount})</span>
        </div>
      </div>

      {/* Main Content Info */}
      <div id={`main-info-${entrepreneur.id}`} className="px-5 pb-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Names */}
          <div>
            <h3 className="font-sans font-bold text-gray-900 text-base leading-snug group-hover:text-[#f45f44] transition-colors">
              {entrepreneur.businessName}
            </h3>
            <p className="font-mono text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
              Por {entrepreneur.name}
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#f45f44] shrink-0" />
            <span className="truncate">{entrepreneur.location}</span>
          </div>

          {/* Business Pitch Description */}
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed pt-1">
            {entrepreneur.description}
          </p>
        </div>

        {/* Action Buttons Footer */}
        <div id={`actions-footer-${entrepreneur.id}`} className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-50">
          <a
            id={`btn-chat-${entrepreneur.id}`}
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition duration-200"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            WhatsApp
          </a>

          <button
            id={`btn-details-${entrepreneur.id}`}
            onClick={() => onOpenDetails(entrepreneur.id)}
            type="button"
            className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-bold text-gray-700 bg-orange-50 hover:bg-orange-100 rounded-xl transition-all"
          >
            Conocer
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
