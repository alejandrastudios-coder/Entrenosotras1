/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Sparkles, ArrowRight, Heart, MessageSquare, Compass } from 'lucide-react';
import { BLOG_CATEGORIES, INITIAL_BLOG_POSTS } from '../blogData';

interface BlogTeaserSectionProps {
  onOpenBlog: () => void;
  onOpenArticle?: (articleId: string) => void;
}

export default function BlogTeaserSection({ onOpenBlog, onOpenArticle }: BlogTeaserSectionProps) {
  const featuredPost = INITIAL_BLOG_POSTS.find(p => p.isFeatured) || INITIAL_BLOG_POSTS[0];
  const secondaryPost = INITIAL_BLOG_POSTS[1];

  return (
    <section 
      id="blog-teaser-section" 
      className="my-10 bg-gradient-to-br from-[#fdfaf8] via-white to-[#faf3f0] rounded-3xl p-6 sm:p-8 border border-[#f0e3de] shadow-sm relative overflow-hidden"
    >
      {/* Subtle ambient light accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#f45f44]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3d2c29]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        
        {/* Compact & Inspiring Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f0e3de] pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold text-[#f45f44] bg-[#f45f44]/10 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Blog de la Comunidad
            </div>
            <h3 className="font-sans font-black text-xl sm:text-2xl text-[#3d2c29] tracking-tight">
              Conversaciones que inspiran
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-light">
              "Una comunidad también se construye conversando, compartiendo experiencias y aprendiendo unas de otras."
            </p>
          </div>

          <button
            id="btn-explore-blog-teaser"
            onClick={onOpenBlog}
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3d2c29] hover:bg-[#f45f44] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 group shrink-0 cursor-pointer"
          >
            <span>Ver Blog Completo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 2-Column Teaser Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Featured Teaser Card */}
          <div 
            onClick={() => onOpenArticle ? onOpenArticle(featuredPost.id) : onOpenBlog()}
            className="lg:col-span-7 group bg-white rounded-2xl border border-gray-100 p-5 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden relative"
          >
            <div className="space-y-4">
              <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden bg-gray-100">
                <img 
                  src={featuredPost.featuredImage} 
                  alt={featuredPost.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#f45f44] text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {featuredPost.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {featuredPost.readTime} de lectura
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <img 
                    src={featuredPost.authorAvatar} 
                    alt={featuredPost.authorName} 
                    className="w-5 h-5 rounded-full object-cover border border-gray-200"
                  />
                  <span className="font-semibold text-gray-700">{featuredPost.authorName}</span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                </div>

                <h4 className="font-sans font-bold text-base sm:text-lg text-[#3d2c29] group-hover:text-[#f45f44] transition-colors leading-snug">
                  {featuredPost.title}
                </h4>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-light">
                  {featuredPost.excerpt}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#f45f44]">
              <span className="inline-flex items-center gap-1">
                Leer artículo destacado <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-gray-400 font-mono text-[11px] font-normal flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> {featuredPost.reactions.inspires + featuredPost.reactions.bravo}
              </span>
            </div>
          </div>

          {/* Secondary Teaser Cards Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            
            {/* Secondary article item */}
            <div 
              onClick={() => onOpenArticle ? onOpenArticle(secondaryPost.id) : onOpenBlog()}
              className="group bg-white rounded-2xl border border-gray-100 p-4 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex gap-4 items-center"
            >
              <img 
                src={secondaryPost.featuredImage} 
                alt={secondaryPost.title} 
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="space-y-1.5 flex-1 min-w-0">
                <span className="inline-block bg-gray-100 text-gray-700 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md">
                  {secondaryPost.category}
                </span>
                <h5 className="font-sans font-bold text-xs sm:text-sm text-[#3d2c29] group-hover:text-[#f45f44] transition-colors line-clamp-2 leading-tight">
                  {secondaryPost.title}
                </h5>
                <p className="text-[11px] text-gray-500 font-mono">
                  {secondaryPost.readTime} • {secondaryPost.authorName}
                </p>
              </div>
            </div>

            {/* Quick Categories Bar */}
            <div className="bg-[#3d2c29] text-white rounded-2xl p-4 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#e9c8bc] uppercase tracking-wider">
                <Compass className="w-4 h-4 text-[#f45f44]" />
                Temas Frecuentes
              </div>
              <div className="flex flex-wrap gap-1.5">
                {BLOG_CATEGORIES.slice(1, 7).map((cat) => (
                  <span 
                    key={cat}
                    onClick={onOpenBlog}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-white/10 text-gray-200 hover:bg-[#f45f44] hover:text-white transition cursor-pointer"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-gray-300 font-light pt-1 border-t border-white/10">
                Aprende de finanzas, liderazgo, belleza y testimonios reales de nuestra red.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
