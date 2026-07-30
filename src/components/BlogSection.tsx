/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, Search, Sparkles, Heart, Flame, ThumbsUp, Lightbulb, 
  MessageSquare, Share2, Clock, Calendar, User, ArrowLeft, ArrowRight, X, Send, Check
} from 'lucide-react';
import { BLOG_CATEGORIES, INITIAL_BLOG_POSTS, BlogPost, BlogComment } from '../blogData';

interface BlogSectionProps {
  onBackToHome?: () => void;
  selectedArticleId?: string | null;
}

export default function BlogSection({ onBackToHome, selectedArticleId }: BlogSectionProps) {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<BlogPost | null>(() => {
    if (selectedArticleId) {
      return INITIAL_BLOG_POSTS.find(p => p.id === selectedArticleId) || null;
    }
    return null;
  });

  // Comment Form State for Active Post
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesCat = selectedCategory === 'Todos' || post.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.authorName.toLowerCase().includes(query) ||
      post.tags.some(t => t.toLowerCase().includes(query));
    
    return matchesCat && matchesQuery;
  });

  // Reactions Handler
  const handleReaction = (postId: string, type: 'inspires' | 'bravo' | 'useful' | 'fire') => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          reactions: {
            ...p.reactions,
            [type]: p.reactions[type] + 1
          }
        };
      }
      return p;
    }));

    if (activePost && activePost.id === postId) {
      setActivePost(prev => prev ? {
        ...prev,
        reactions: {
          ...prev.reactions,
          [type]: prev.reactions[type] + 1
        }
      } : null);
    }
  };

  // Add Comment Handler
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePost || !commentName.trim() || !commentText.trim()) return;

    const newComment: BlogComment = {
      id: `c-${Date.now()}`,
      author: commentName.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120',
      comment: commentText.trim(),
      date: 'Ahora mismo'
    };

    setPosts(prev => prev.map(p => {
      if (p.id === activePost.id) {
        return {
          ...p,
          comments: [newComment, ...p.comments]
        };
      }
      return p;
    }));

    setActivePost(prev => prev ? {
      ...prev,
      comments: [newComment, ...prev.comments]
    } : null);

    setCommentName('');
    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  const handleShareWhatsApp = (post: BlogPost) => {
    const text = `Te comparto este inspirador artículo del Blog de Entre Nosotras:\n\n*${post.title}*\n\n"${post.excerpt}"\n\nLéelo completo en la comunidad.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div id="blog-page-container" className="w-full space-y-8 animate-fadeIn">
      
      {/* Top Breadcrumb & Back Navigation */}
      <nav id="blog-breadcrumbs" className="flex items-center justify-between text-xs text-gray-500 font-mono">
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
          <span className="text-[#3d2c29] font-bold">Blog Revista Entre Nosotras</span>
        </div>

        <span className="bg-[#f45f44]/10 text-[#f45f44] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
          {posts.length} Artículos
        </span>
      </nav>

      {/* Magazine Hero Header */}
      <header id="blog-hero" className="bg-[#3d2c29] text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#f45f44]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase text-[#e9c8bc] bg-white/10 tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-[#f45f44]" />
            Edición Digital & Comunidad
          </span>

          <h2 className="font-sans font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Historias, Formación y Sabiduría Emprendedora
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
            Un espacio editorial donde compartimos estrategias de negocio, bienestar, finanzas y vivencias de la red. Aprende, inspírate y conecta con otras mujeres creadoras.
          </p>

          {/* Search bar inside header */}
          <div className="pt-2 max-w-xl">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar temas (ej: 'finanzas', 'balayage', 'ventas', 'liderazgo')..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f45f44] placeholder-gray-400 shadow-sm"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Categories Filter Tabs */}
      <div id="blog-categories-tabs" className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all tracking-wide cursor-pointer ${
              selectedCategory === cat 
                ? 'bg-[#3d2c29] text-[#e9c8bc] shadow-sm' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Blog Grid */}
      {filteredPosts.length === 0 ? (
        <div className="p-12 border-2 border-dashed border-gray-200 rounded-3xl text-center max-w-md mx-auto space-y-3 bg-white">
          <BookOpen className="w-10 h-10 text-gray-300 mx-auto" />
          <p className="font-bold text-gray-700 text-sm">No encontramos artículos para esta búsqueda</p>
          <button 
            onClick={() => { setSelectedCategory('Todos'); setSearchQuery(''); }}
            className="px-4 py-1.5 text-xs font-bold bg-[#3d2c29] text-white rounded-full"
          >
            Ver todos los artículos
          </button>
        </div>
      ) : (
        <div id="blog-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article 
              key={post.id}
              onClick={() => setActivePost(post)}
              className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Image & Category Pill */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#f45f44] text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                    {post.category}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black/75 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {post.readTime}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#f45f44]" />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="font-sans font-bold text-base text-[#3d2c29] group-hover:text-[#f45f44] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0 border-t border-gray-50 mt-2 flex items-center justify-between text-xs pt-3">
                <div className="flex items-center gap-2">
                  <img 
                    src={post.authorAvatar} 
                    alt={post.authorName} 
                    className="w-6 h-6 rounded-full object-cover border border-gray-200"
                  />
                  <span className="text-xs font-semibold text-gray-700 truncate max-w-[120px]">{post.authorName}</span>
                </div>

                <span className="font-bold text-[#f45f44] text-xs inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Leer más <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Entrepreneur Author Banner */}
      <section id="blog-author-invite" className="bg-[#fcf8f6] border border-[#f0e3de] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#f45f44] bg-[#f45f44]/10 px-2.5 py-0.5 rounded-full">
            Comunidad Creadora
          </span>
          <h4 className="font-sans font-bold text-lg text-[#3d2c29]">
            ¿Eres emprendedora de Entre Nosotras y quieres compartir tu artículo?
          </h4>
          <p className="text-xs text-gray-600 max-w-xl font-light">
            Publica tus consejos de negocio, historias de superación o especialidades técnicas para inspirar a más de 500 mujeres de la red.
          </p>
        </div>

        <a 
          href="https://wa.me/14072181294?text=¡Hola!%20Soy%20emprendedora%20de%20Entre%20Nosotras%20y%20me%20gustaría%20publicar%20un%20artículo%20en%20el%20Blog."
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-[#f45f44] hover:bg-[#ff6f55] text-white font-bold text-xs rounded-full shadow-md transition shrink-0 cursor-pointer text-center"
        >
          Proponer Artículo por WhatsApp
        </a>
      </section>

      {/* ARTICLE READER MODAL */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#3d2c29] text-white shrink-0">
              <span className="text-xs font-bold text-[#e9c8bc] uppercase tracking-wider font-mono">
                Blog Entre Nosotras • {activePost.category}
              </span>
              <button 
                onClick={() => setActivePost(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scroll */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* Header Info */}
              <div className="space-y-3 border-b border-gray-100 pb-5">
                <span className="bg-[#f45f44] text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                  {activePost.category}
                </span>

                <h1 className="font-sans font-black text-xl sm:text-3xl text-[#3d2c29] leading-tight">
                  {activePost.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500 pt-2">
                  <div className="flex items-center gap-3">
                    <img 
                      src={activePost.authorAvatar} 
                      alt={activePost.authorName} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#f45f44]"
                    />
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{activePost.authorName}</p>
                      <p className="text-[11px] text-gray-500">{activePost.authorRole}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#f45f44]" /> {activePost.date}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#f45f44]" /> {activePost.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Main Featured Image */}
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-gray-100">
                <img 
                  src={activePost.featuredImage} 
                  alt={activePost.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Paragraphs */}
              <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed font-light">
                {activePost.content.map((paragraph, idx) => (
                  <p key={idx} className={idx === 0 ? "text-base sm:text-lg font-normal text-gray-900 border-l-4 border-[#f45f44] pl-4 py-1 bg-gray-50 rounded-r-lg" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activePost.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-lg font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* REACTION SYSTEM */}
              <div className="bg-[#faf8f6] border border-[#f0e3de] rounded-2xl p-5 space-y-3">
                <p className="text-xs font-bold text-[#3d2c29] uppercase tracking-wider text-center">
                  ¿Qué te pareció este artículo? Reacciona para apoyar a la autora
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button 
                    onClick={() => handleReaction(activePost.id, 'inspires')}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white hover:bg-rose-50 border border-gray-200 hover:border-rose-300 text-xs font-bold text-gray-700 hover:text-rose-600 transition cursor-pointer shadow-xs"
                  >
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span>Me inspira ({activePost.reactions.inspires})</span>
                  </button>

                  <button 
                    onClick={() => handleReaction(activePost.id, 'bravo')}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white hover:bg-amber-50 border border-gray-200 hover:border-amber-300 text-xs font-bold text-gray-700 hover:text-amber-600 transition cursor-pointer shadow-xs"
                  >
                    <ThumbsUp className="w-4 h-4 text-amber-500" />
                    <span>Bravo ({activePost.reactions.bravo})</span>
                  </button>

                  <button 
                    onClick={() => handleReaction(activePost.id, 'useful')}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 text-xs font-bold text-gray-700 hover:text-emerald-600 transition cursor-pointer shadow-xs"
                  >
                    <Lightbulb className="w-4 h-4 text-emerald-500" />
                    <span>Útil ({activePost.reactions.useful})</span>
                  </button>

                  <button 
                    onClick={() => handleReaction(activePost.id, 'fire')}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 text-xs font-bold text-gray-700 hover:text-orange-600 transition cursor-pointer shadow-xs"
                  >
                    <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                    <span>Excelente ({activePost.reactions.fire})</span>
                  </button>
                </div>

                {/* Social Share bar */}
                <div className="pt-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="font-bold text-gray-600 flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 text-[#f45f44]" /> Compartir lectura
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleShareWhatsApp(activePost)}
                      className="px-3 py-1.5 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#20bd5a] transition flex items-center gap-1 cursor-pointer"
                    >
                      WhatsApp
                    </button>
                    <button 
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition flex items-center gap-1 cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
                      {copiedLink ? '¡Enlace Copiado!' : 'Copiar Link'}
                    </button>
                  </div>
                </div>
              </div>

              {/* COMMENTS SECTION */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="font-sans font-bold text-lg text-[#3d2c29] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#f45f44]" />
                  Comentarios y Reflexiones ({activePost.comments.length})
                </h3>

                {/* List existing comments */}
                <div className="space-y-3">
                  {activePost.comments.length === 0 ? (
                    <p className="text-xs text-gray-500 italic bg-gray-50 p-4 rounded-xl text-center">
                      Sé la primera en dejar un comentario o reflexión sobre este artículo.
                    </p>
                  ) : (
                    activePost.comments.map(c => (
                      <div key={c.id} className="bg-gray-50 border border-gray-100 p-4 rounded-2xl space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <img src={c.avatar} alt={c.author} className="w-6 h-6 rounded-full object-cover" />
                            <span className="font-bold text-gray-800">{c.author}</span>
                          </div>
                          <span className="text-[10px] text-gray-400 font-mono">{c.date}</span>
                        </div>
                        <p className="text-xs text-gray-600 pl-8 font-light">{c.comment}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Submit new comment form */}
                <form onSubmit={handleAddComment} className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 shadow-xs">
                  <p className="text-xs font-bold text-[#3d2c29]">Deja tu opinión o mensaje para la autora:</p>
                  
                  {commentSuccess && (
                    <div className="p-2 bg-emerald-50 text-emerald-800 text-xs rounded-lg font-bold">
                      ¡Tu comentario ha sido publicado con éxito!
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      placeholder="Tu nombre completo" 
                      className="px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f45f44]"
                      required
                    />
                  </div>

                  <textarea 
                    rows={2}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Escribe tu reflexión o pregunta aquí..."
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f45f44] resize-none"
                    required
                  ></textarea>

                  <div className="flex justify-end">
                    <button 
                      type="submit"
                      className="px-5 py-2 bg-[#3d2c29] hover:bg-[#f45f44] text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" /> Publicar Comentario
                    </button>
                  </div>
                </form>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
              <button 
                onClick={() => setActivePost(null)}
                className="px-6 py-2 bg-[#3d2c29] text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Cerrar Artículo
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
