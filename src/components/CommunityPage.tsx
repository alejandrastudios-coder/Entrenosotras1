/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, ShieldCheck, Target, Eye, HeartHandshake, Zap, Sparkles, 
  Globe, ChevronDown, ChevronUp, ArrowLeft, MessageCircle, CheckCircle2, Award
} from 'lucide-react';
import AboutUsSection from './AboutUsSection';

interface CommunityPageProps {
  onBackToHome?: () => void;
  onOpenEntrepreneurProfile?: (id: string) => void;
  onOpenAddBusinessModal?: () => void;
}

export default function CommunityPage({ 
  onBackToHome, 
  onOpenEntrepreneurProfile,
  onOpenAddBusinessModal
}: CommunityPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Qué es la comunidad Entre Nosotras y quiénes pueden formar parte?',
      a: 'Entre Nosotras es una red colaborativa e incluyente de mujeres emprendedoras, profesionales, artesanas y empresarias en Florida y de habla hispana. Está abierta a cualquier mujer que tenga una idea de negocio, un proyecto activo o un servicio profesional y busque conectar, aprender y visibilizarse.'
    },
    {
      q: '¿Cómo puedo publicar mi emprendimiento en el directorio?',
      a: 'Es muy sencillo. Puedes hacer clic en el botón "Sumar Mi Emprendimiento" ubicado en el menú principal o completar nuestro formulario vía WhatsApp. Nuestro equipo revisará tus datos y habilitará tu perfil con tus productos, redes sociales y contacto directo.'
    },
    {
      q: '¿Qué beneficios obtengo al pertenecer a la red?',
      a: 'Al sumarte a Entre Nosotras obtienes: visibilidad en nuestro directorio digital con enlace directo a tu WhatsApp, participación en ferias de ofertas relámpago, acceso a reuniones de networking, talleres de capacitación en finanzas y marketing, y la posibilidad de publicar artículos en nuestro blog.'
    },
    {
      q: '¿Tienen reuniones presenciales o ferias de emprendimiento?',
      a: 'Sí, organizamos periódicamente encuentros de networking, talleres de formación empresarial y ferias de venta presenciales en la Florida Central (Orlando, Kissimmee, Deltona, Saint Cloud). Consulta nuestro Calendario de Eventos para enterarte de las próximas fechas.'
    },
    {
      q: '¿Tiene algún costo pertenecer a Entre Nosotras?',
      a: 'Actualmente ofrecemos registro básico gratuito para emprendedoras locales con el objetivo de impulsar la economía colaborativa femenina. También contamos con membresías Élite opcionales para mayor destaque y publicidad prioritaria.'
    }
  ];

  const benefits = [
    'Directorio Digital 24/7 con enlace directo a tu WhatsApp',
    'Difusión de tus ofertas relámpago y promociones especiales',
    'Participación en rondas de networking y talleres grupales',
    'Posibilidad de publicar tus artículos en el Blog de la revista',
    'Red de referidos y alianzas estratégicas entre emprendedoras',
    'Soporte y acompañamiento continuo del equipo directivo'
  ];

  return (
    <div id="community-page-view" className="w-full space-y-10 animate-fadeIn">
      
      {/* Top Breadcrumbs */}
      <nav id="community-breadcrumbs" className="flex items-center justify-between text-xs text-gray-500 font-mono">
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
          <span className="text-[#3d2c29] font-bold">Comunidad & Liderazgo</span>
        </div>

        <span className="bg-[#3d2c29] text-[#e9c8bc] px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
          Quiénes Somos
        </span>
      </nav>

      {/* Hero Banner */}
      <header className="bg-[#3d2c29] text-white rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f45f44]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase text-[#e9c8bc] bg-white/10 tracking-widest border border-white/10">
            <Users className="w-3.5 h-3.5 text-[#f45f44]" />
            Nuestra Red
          </span>

          <h1 className="font-sans font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Una Red de Mujeres Creadoras Impulsando la Economía Social
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
            En <strong>Entre Nosotras</strong> creemos en el poder de la sororidad, la capacitación constante y las alianzas estratégicas para transformar pequeños proyectos en negocios prósperos y sostenibles.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onOpenAddBusinessModal}
              className="px-6 py-3 bg-[#f45f44] hover:bg-[#ff6f55] text-white font-bold text-xs rounded-full shadow-md transition cursor-pointer"
            >
              Sumar Mi Emprendimiento a la Red
            </button>
            <a 
              href="https://wa.me/14072181294?text=¡Hola!%20Quisiera%20más%20información%20sobre%20cómo%20formar%20parte%20de%20Entre%20Nosotras."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-full transition flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* Main Mission, Vision & Leaders Section */}
      <AboutUsSection onOpenEntrepreneurProfile={onOpenEntrepreneurProfile} />

      {/* Membership Benefits Box */}
      <section id="community-benefits-box" className="bg-[#fdfaf8] border border-[#f0e3de] rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#f45f44] bg-[#f45f44]/10 px-3 py-1 rounded-full">
            ¿Por qué unirte?
          </span>
          <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#3d2c29]">
            Beneficios Exclusivos para Nuestras Emprendedoras
          </h3>
          <p className="text-xs text-gray-600 font-light">
            Formar parte de Entre Nosotras te brinda acceso inmediato a herramientas de promoción y una red de respaldo continuo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {benefits.map((b, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#f45f44] shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-gray-800 leading-snug">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="community-faq-section" className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Preguntas Frecuentes
          </span>
          <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#3d2c29]">
            Todo lo que necesitas saber
          </h3>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 bg-gray-50/50 hover:bg-gray-50 transition cursor-pointer"
                >
                  <span className="font-sans font-bold text-xs sm:text-sm text-[#3d2c29]">
                    {faq.q}
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#f45f44] shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 bg-white border-t border-gray-100 text-xs text-gray-600 leading-relaxed font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
