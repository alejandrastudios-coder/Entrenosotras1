/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, MessageCircle, Instagram, Facebook, 
  CheckCircle2, ArrowLeft, Clock, Sparkles, User
} from 'lucide-react';

interface ContactPageProps {
  onBackToHome?: () => void;
}

export default function ContactPage({ onBackToHome }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Sumarme a la comunidad',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    
    // Redirect cleanly to WhatsApp with structured message
    const waMessage = `Hola%20Entre%20Nosotras!%0A%0A*Nombre:*%20${encodeURIComponent(formData.name)}%0A*Correo:*%20${encodeURIComponent(formData.email || 'No especificado')}%0A*Teléfono:*%20${encodeURIComponent(formData.phone || 'No especificado')}%0A*Asunto:*%20${encodeURIComponent(formData.subject)}%0A%0A*Mensaje:*%20${encodeURIComponent(formData.message)}`;
    
    window.open(`https://wa.me/14072181294?text=${waMessage}`, '_blank');
    setSubmitted(true);
  };

  const contacts = [
    {
      title: 'Presidencia & Dirección General',
      name: 'Alejandra Méndez',
      role: 'CEO & Fundadora',
      phone: '+1 (786) 961-8458',
      wa: 'https://wa.me/17869618458?text=Hola%20Alejandra%2C%20quisiera%20saber%20m%C3%A1s%20sobre%20Entre%20Nosotras'
    },
    {
      title: 'Marketing & Comunicación',
      name: 'Luisana Muñoz',
      role: 'Directora de Marketing',
      phone: '+1 (689) 255-7285',
      wa: 'https://wa.me/16892557285?text=Hola%20Luisana%2C%20me%20gustar%C3%ADa%20consultarte%20sobre%20marketing%20y%20comunicaci%C3%B3n'
    },
    {
      title: 'Soporte General & Registro',
      name: 'Atención al Emprendedor',
      role: 'Comité de Admisiones',
      phone: '+1 (407) 218-1294',
      wa: 'https://wa.me/14072181294?text=Hola%2C%20quisiera%20asistencia%20para%20registrar%20mi%20emprendimiento'
    }
  ];

  return (
    <div id="contact-page-view" className="w-full space-y-8 animate-fadeIn">
      
      {/* Navigation Breadcrumbs */}
      <nav id="contact-breadcrumbs" className="flex items-center justify-between text-xs text-gray-500 font-mono">
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
          <span className="text-[#3d2c29] font-bold">Contacto & Atención Directa</span>
        </div>

        <span className="bg-[#3d2c29] text-[#e9c8bc] px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
          Estamos para Ayudarte
        </span>
      </nav>

      {/* Header Title Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#f45f44] bg-[#f45f44]/10">
          <Mail className="w-3.5 h-3.5" />
          Canales Oficiales
        </span>
        <h1 className="font-sans font-extrabold text-2xl sm:text-4xl text-[#3d2c29] tracking-tight">
          Ponte en Contacto con la Comunidad
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 font-light">
          ¿Tienes dudas sobre cómo registrar tu negocio, colaborar en el blog o asistir a los próximos eventos? Escríbenos directamente.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
        
        {/* Contact Form Column */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-md space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="font-sans font-bold text-lg text-[#3d2c29] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#f45f44]" /> Enviar Mensaje Directo
            </h2>
            <p className="text-xs text-gray-500 font-light mt-1">
              Completa los datos para iniciar conversación por WhatsApp con nuestro equipo.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-base">¡Mensaje Enviado con Éxito!</h3>
              <p className="text-xs">Te hemos redirigido a WhatsApp para continuar la conversación con un representante.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-emerald-700 underline cursor-pointer"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">Tu Nombre *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. María García"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#f45f44] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">WhatsApp / Teléfono *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ej. +1 407 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#f45f44] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">Correo Electrónico</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ejemplo@correo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#f45f44] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">Motivo de Contacto</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#f45f44] focus:outline-none"
                  >
                    <option value="Sumarme a la comunidad">Sumarme a la comunidad</option>
                    <option value="Publicar mi emprendimiento">Publicar mi emprendimiento</option>
                    <option value="Publicar en el Blog">Escribir un artículo en el Blog</option>
                    <option value="Información de Eventos">Información de Eventos & Ferias</option>
                    <option value="Auspicios y Alianzas">Auspicios y Alianzas Comerciales</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">Mensaje *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Cuéntanos sobre tu emprendimiento o la consulta que deseas hacernos..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#f45f44] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#f45f44] hover:bg-[#ff6f55] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Enviar Mensaje por WhatsApp
              </button>
            </form>
          )}
        </div>

        {/* Direct Contacts & Location Column */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#3d2c29] text-white p-6 rounded-3xl space-y-5 shadow-lg border border-[#523d39]">
            <h3 className="font-sans font-bold text-base text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#f45f44]" />
              Atención Directa por Área
            </h3>

            <div className="space-y-4">
              {contacts.map((c, i) => (
                <div key={i} className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-[#e9c8bc] uppercase tracking-wider block">
                    {c.title}
                  </span>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">{c.name}</p>
                      <p className="text-[11px] text-gray-300 font-light">{c.role}</p>
                    </div>
                    <a
                      href={c.wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#25D366] hover:bg-green-600 text-white font-bold text-[11px] rounded-xl transition flex items-center gap-1 shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Chat
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-4 shadow-sm">
            <h3 className="font-sans font-bold text-sm text-[#3d2c29] flex items-center gap-2 border-b border-gray-100 pb-2">
              <MapPin className="w-4 h-4 text-[#f45f44]" /> Sede & Ubicación
            </h3>

            <div className="space-y-2 text-xs text-gray-600">
              <p className="font-semibold text-gray-800">Florida Central, Estados Unidos</p>
              <p className="font-light">Presencia activa en Orlando, Kissimmee, St. Cloud, Deltona y condados vecinos.</p>
              <div className="pt-2 flex items-center gap-2 text-gray-500 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5 text-[#f45f44]" /> Atendemos Lunes a Sábado de 9:00 AM a 6:00 PM
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
