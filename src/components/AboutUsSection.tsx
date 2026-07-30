/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Target, Eye, HeartHandshake, Zap, Sparkles, Globe, 
  Users, Award, ArrowUpRight, MessageCircle, ShieldCheck
} from 'lucide-react';

interface AboutUsSectionProps {
  onOpenEntrepreneurProfile?: (id: string) => void;
}

export default function AboutUsSection({ onOpenEntrepreneurProfile }: AboutUsSectionProps) {
  const values = [
    {
      title: 'SORORIDAD',
      icon: HeartHandshake,
      color: 'text-[#f45f44]',
      bgColor: 'bg-[#faf0ec]',
      borderColor: 'border-[#f8d7ce]',
      description: 'Hermandad, empatía y colaboración activa entre mujeres para apoyarnos mutuamente en cada etapa.'
    },
    {
      title: 'EMPODERAMIENTO',
      icon: Zap,
      color: 'text-[#e9c8bc]',
      bgColor: 'bg-[#3d2c29]',
      borderColor: 'border-[#523d39]',
      textColor: 'text-white',
      description: 'Impulso de la autonomía, liderazgo, toma de decisiones y confianza profesional para el éxito empresarial.'
    },
    {
      title: 'INSPIRACIÓN',
      icon: Sparkles,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      description: 'Historias reales de esfuerzo y crecimiento que motivan a más mujeres a dar el gran paso.'
    },
    {
      title: 'IMPACTO SOCIAL',
      icon: Globe,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      description: 'Transformación positiva en la comunidad, creando oportunidades reales y fomentando una cultura de equidad.'
    }
  ];

  const leaders = [
    {
      name: 'Alejandra Méndez',
      role: 'CEO & Fundadora',
      bio: 'Alejandra Méndez es fundadora y presidenta de Entre Nosotras Mujeres de Élite, empresaria, conferencista internacional y especialista en belleza profesional con más de 25 años de experiencia. Como CEO de MA Fashion LLC y creadora del Método R.I.S.E., dedica su labor a impulsar el crecimiento personal, profesional y empresarial de las mujeres, promoviendo el liderazgo, la capacitación y las conexiones que generan impacto.',
      avatar: 'https://i.ibb.co/1fQwBH1c/Screenshot-2026-06-24-163407.png',
      imagePos: 'object-[center_12%]',
      badge: 'Presidencia & CEO',
      profileId: 'alejandra-mendez',
      phoneFormatted: '+1 (786) 961-8458',
      contactWa: 'https://wa.me/17869618458?text=Hola%20Alejandra%2C%20quisiera%20saber%20m%C3%A1s%20sobre%20Entre%20Nosotras'
    },
    {
      name: 'Luisana Muñoz',
      role: 'Directora de Marketing Digital & Comunicación Estratégica',
      bio: 'Luisana Méndez es Directora de Marketing Digital y Comunicación Estratégica de Entre Nosotras Mujeres de Élite. Especialista en marketing digital, lidera el desarrollo de estrategias de contenido, posicionamiento y crecimiento de la comunidad, impulsando la conexión entre mujeres emprendedoras y empresarias a través de la innovación y la comunicación efectiva.',
      avatar: 'https://i.ibb.co/2Y8SJ9vK/Whats-App-Image-2025-12-12-at-10-20-03-PM.jpg',
      imagePos: 'object-[center_15%]',
      badge: 'Marketing & Estrategia',
      phoneFormatted: '+1 (689) 255-7285',
      contactWa: 'https://wa.me/16892557285?text=Hola%20Luisana%2C%20me%20gustar%C3%ADa%20consultarte%20sobre%20marketing%20y%20comunicaci%C3%B3n%20en%20Entre%20Nosotras'
    }
  ];

  return (
    <section id="about-us-complete-section" className="w-full my-12 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 px-4 flex flex-col items-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-[#f8d7ce] bg-white p-1 transition-transform hover:scale-105 duration-300">
          <img 
            src="https://i.ibb.co/23VcLTbq/Whats-App-Image-2026-07-29-at-9-29-35-PM.jpg" 
            alt="Entre Nosotras Logo Oficial" 
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-widest text-[#f45f44] bg-[#faf0ec] border border-[#f8d7ce]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#f45f44]" />
          Nuestra Esencia Institucional
        </span>
        <h2 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#3d2c29] tracking-tight">
          Transformando el Liderazgo Femenino
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
          <strong>Entre Nosotras</strong> es más que un directorio: es una comunidad colaborativa dedicada a potenciar la autonomía, el crecimiento empresarial y la proyección de mujeres emprendedoras en el mundo hispano.
        </p>
      </div>

      {/* Misión y Visión Side-by-Side Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
        
        {/* Misión Card */}
        <div 
          id="mision-card" 
          className="relative bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#faf0ec] rounded-bl-full -z-0 opacity-60 group-hover:scale-110 transition-transform duration-500" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#faf0ec] text-[#f45f44] border border-[#f8d7ce] flex items-center justify-center shrink-0 shadow-sm">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-[#f45f44]">
                  Propósito Fundamental
                </span>
                <h3 className="font-sans font-bold text-xl text-[#3d2c29]">
                  Nuestra Misión
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal pt-2 border-t border-gray-100">
              Fomentar el crecimiento personal, profesional y empresarial de mujeres líderes y emprendedoras mediante espacios educativos, colaborativos y de networking estratégico que impulsen su empoderamiento, autonomía y capacidad de impacto en la sociedad.
            </p>
          </div>

          <div className="relative z-10 pt-6 mt-4 flex items-center justify-between text-xs text-[#f45f44] font-bold">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Espacios Educativos & Networking
            </span>
          </div>
        </div>

        {/* Visión Card */}
        <div 
          id="vision-card" 
          className="relative bg-gradient-to-br from-[#3d2c29] to-[#2b1f1d] rounded-3xl p-6 sm:p-8 text-white border border-[#523d39] shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#f45f44]/10 rounded-bl-full -z-0 group-hover:scale-110 transition-transform duration-500" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#e9c8bc] border border-white/15 flex items-center justify-center shrink-0 shadow-sm backdrop-blur-md">
                <Eye className="w-6 h-6 text-[#e9c8bc]" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-[#e9c8bc]">
                  Proyección Futura
                </span>
                <h3 className="font-sans font-bold text-xl text-white">
                  Nuestra Visión
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light pt-2 border-t border-white/10">
              Convertirnos en la red femenina más influyente de habla hispana, reconocida por formar mujeres integrales, exitosas y solidarias que transforman positivamente su entorno, crean oportunidades y promueven una cultura de apoyo, liderazgo y equidad.
            </p>
          </div>

          <div className="relative z-10 pt-6 mt-4 flex items-center justify-between text-xs text-[#e9c8bc] font-bold">
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Red Femenina Hispana de Impacto
            </span>
          </div>
        </div>

      </div>

      {/* Valores de la Comunidad */}
      <div id="our-values-block" className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-200 pb-3">
          <div>
            <h3 className="font-sans font-bold text-xl text-[#3d2c29]">
              Nuestros Valores Universales
            </h3>
            <p className="text-xs text-gray-500">
              Pilares éticos y humanos que guían cada acción y alianza en la comunidad.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#f45f44] uppercase tracking-wider bg-[#faf0ec] px-3 py-1 rounded-full border border-[#f8d7ce]">
            4 Principios Clave
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div 
                key={v.title}
                className={`p-5 rounded-2xl border ${v.borderColor} ${v.bgColor} transition-transform hover:-translate-y-1 duration-200 shadow-sm flex flex-col justify-between space-y-3`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`p-2 rounded-xl bg-white/80 shadow-xs ${v.color}`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-gray-400">
                      VALOR
                    </span>
                  </div>
                  <h4 className={`font-sans font-black text-sm tracking-wide ${v.textColor || 'text-[#3d2c29]'}`}>
                    {v.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    {v.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Integrantes / Liderazgo de la Comunidad */}
      <div id="community-leadership-block" className="max-w-7xl mx-auto px-2 sm:px-4 space-y-6 pt-4">
        
        {/* Header directly in the layout without heavy nesting */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-200 pb-4 px-1">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase text-[#f45f44] bg-[#faf0ec] border border-[#f8d7ce]">
              <Users className="w-3.5 h-3.5" />
              Equipo Directivo & Liderazgo
            </span>
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#3d2c29]">
              Líderes de la Comunidad
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl font-light">
              Conoce a las mujeres apasionadas que impulsan la visión, estrategia y comunicación de <strong>Entre Nosotras</strong>.
            </p>
          </div>
        </div>

        {/* Un-nested grid maximizing mobile reading width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
          {leaders.map((leader) => (
            <div 
              key={leader.name}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200/90 shadow-sm hover:border-[#f8d7ce] hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start group"
            >
              {/* Photo Frame focused on face */}
              <div className="relative shrink-0 mx-auto sm:mx-0 w-32 h-36 sm:w-36 sm:h-44 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-gray-100">
                <img 
                  src={leader.avatar} 
                  alt={leader.name}
                  className={`w-full h-full object-cover ${leader.imagePos} group-hover:scale-105 transition-transform duration-300`} 
                />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-md bg-[#3d2c29]/90 backdrop-blur-xs text-[#e9c8bc] font-mono text-[9px] font-extrabold uppercase shadow-xs whitespace-nowrap">
                  Líder Élite
                </span>
              </div>

              {/* Text & Content Block */}
              <div className="flex-1 space-y-3 text-center sm:text-left w-full">
                <div className="space-y-1">
                  <span className="inline-block text-[10px] font-mono font-bold text-[#f45f44] uppercase tracking-wider bg-[#faf0ec] px-2.5 py-0.5 rounded-full border border-[#f8d7ce]">
                    {leader.badge}
                  </span>
                  <h4 className="font-sans font-extrabold text-lg sm:text-xl text-[#3d2c29] leading-tight">
                    {leader.name}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-gray-700">
                    {leader.role}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed text-left">
                  {leader.bio}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-2.5 w-full">
                  {leader.profileId && onOpenEntrepreneurProfile && (
                    <button
                      type="button"
                      onClick={() => onOpenEntrepreneurProfile(leader.profileId)}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#3d2c29] text-white text-xs font-bold hover:bg-[#523d39] transition cursor-pointer shadow-xs active:scale-95"
                    >
                      Ver Perfil
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#e9c8bc]" />
                    </button>
                  )}

                  <a
                    href={leader.contactWa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition cursor-pointer shadow-xs active:scale-95"
                  >
                    <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>WhatsApp {leader.phoneFormatted}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
