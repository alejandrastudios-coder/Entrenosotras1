/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Send, Store, Info, MessageCircle, Sparkles } from 'lucide-react';

interface AddProfileModalProps {
  onClose: () => void;
}

export default function AddProfileModal({ onClose }: AddProfileModalProps) {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [fullBio, setFullBio] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [email, setEmail] = useState('');
  const [productsDetail, setProductsDetail] = useState('');

  const [formError, setFormError] = useState('');

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !businessName.trim() || !category.trim() || !phone.trim()) {
      setFormError('Por favor completa al menos tu nombre, el nombre de tu emprendimiento, el rubro y tu teléfono.');
      return;
    }

    setFormError('');

    // Format WhatsApp message
    const messageParts = [
      '¡Hola! 👋 Me gustaría sumar mi emprendimiento a la comunidad *Entre Nosotras*.\n',
      '📌 *DATOS PRINCIPALES*',
      `• *Nombre Completo:* ${name.trim()}`,
      `• *Emprendimiento:* ${businessName.trim()}`,
      `• *Rubro / Categoría:* ${category.trim()}`,
      `• *Ubicación:* ${location.trim() || 'No especificada'}`,
      '',
      '📝 *DESCRIPCIÓN Y DETALLES*',
      `• *Frase / Slogan:* ${description.trim() || 'Sin especificar'}`,
      `• *Historia / Biografía:* ${fullBio.trim() || 'Sin especificar'}`,
      '',
      '📞 *CONTACTO Y REDES*',
      `• *Teléfono / WhatsApp:* ${phone.trim()}`,
      `• *Instagram:* ${instagram.trim() ? (instagram.startsWith('@') ? instagram.trim() : `@${instagram.trim()}`) : 'No especificado'}`,
      `• *Email Comercial:* ${email.trim() || 'No especificado'}`,
      '',
      '🛍️ *PRODUCTOS Y SERVICIOS*',
      `${productsDetail.trim() || 'Se coordinará el detalle de productos directamente.'}`
    ];

    const fullMessage = messageParts.join('\n');
    const targetPhone = '14072181294'; // Admin phone number
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(fullMessage)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div id="modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto">
      <div 
        id="modal-card" 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div id="modal-header" className="flex items-center justify-between px-6 py-4 bg-[#3d2c29] text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f45f44]/20 border border-[#f45f44]/40 flex items-center justify-center text-[#f45f44]">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-base sm:text-lg tracking-wide text-white">
                Sumar Mi Emprendimiento
              </h3>
              <p className="font-mono text-[11px] text-[#e9c8bc] tracking-wider">
                Comunidad "Entre Nosotras"
              </p>
            </div>
          </div>
          <button 
            id="btn-close-modal"
            onClick={onClose} 
            type="button"
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition duration-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Container */}
        <div id="modal-body-scroll" className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          
          {/* Info Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 flex gap-3 items-start">
            <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-emerald-950 text-sm">
                Registro directo vía WhatsApp
              </p>
              <p className="text-emerald-800 leading-relaxed">
                Completa tus datos en el siguiente formulario. Al finalizar, haz clic en el botón para enviar tu información directamente por WhatsApp al número <strong className="font-mono text-emerald-950">+1 (407) 218-1294</strong> para la revisión e incorporación de tu vitrina.
              </p>
            </div>
          </div>

          {formError && (
            <div id="form-error-banner" className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r text-xs text-red-700 font-bold">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmitWhatsApp} className="space-y-5">
            
            {/* Step 1: Principal Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#3d2c29] uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-2">
                <Sparkles className="w-4 h-4 text-[#f45f44]" />
                Información del Emprendimiento
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="input-owner-name" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                    Tu Nombre Completo *
                  </label>
                  <input 
                    id="input-owner-name"
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Alejandra Méndez" 
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f45f44] focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="input-biz-name" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                    Nombre del Emprendimiento *
                  </label>
                  <input 
                    id="input-biz-name"
                    type="text" 
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Ej. Alejandra Hair & Beauty" 
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f45f44] focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="input-category-text" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                    Rubro / Categoría *
                  </label>
                  <input 
                    id="input-category-text"
                    type="text" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Ej. Estilista, Barbería, Repostería, Estética..." 
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f45f44] focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="input-loc-text" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                    Ubicación (Ciudad / Zona)
                  </label>
                  <input 
                    id="input-loc-text"
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ej. Orlando, Deltona, Saint Cloud..." 
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f45f44] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="input-desc-text" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Frase o Slogan descriptivo
                </label>
                <input 
                  id="input-desc-text"
                  type="text" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ej. Especialista en Balayage, Morena Iluminada y estilismo personalizado..." 
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f45f44] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="input-bio-text" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Historia / Detalles de tu Proyecto
                </label>
                <textarea 
                  id="input-bio-text"
                  rows={3}
                  value={fullBio}
                  onChange={(e) => setFullBio(e.target.value)}
                  placeholder="Escribe libremente sobre tu trayectoria, tus especialidades, horarios de atención o lo que quieras destacar..." 
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f45f44] focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>
            </div>

            {/* Step 2: Contact Information */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-[#3d2c29] uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-2">
                <Info className="w-4 h-4 text-[#f45f44]" />
                Datos de Contacto
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="input-phone-text" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                    Teléfono / WhatsApp *
                  </label>
                  <input 
                    id="input-phone-text"
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej. +1 (407) 218-1294" 
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f45f44] transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="input-instagram-text" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                    Instagram (@usuario)
                  </label>
                  <input 
                    id="input-instagram-text"
                    type="text" 
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="Ej. @mi_emprendimiento" 
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f45f44] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="input-email-text" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                    E-mail Comercial
                  </label>
                  <input 
                    id="input-email-text"
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ej. contacto@ejemplo.com" 
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f45f44] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Products and Services Details */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-[#3d2c29] uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-2">
                <Store className="w-4 h-4 text-[#f45f44]" />
                Servicios y Productos Ofrecidos
              </h4>

              <div>
                <label htmlFor="input-products-text" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Detalle de Servicios, Productos o Promociones
                </label>
                <textarea 
                  id="input-products-text"
                  rows={4}
                  value={productsDetail}
                  onChange={(e) => setProductsDetail(e.target.value)}
                  placeholder="Escribe libremente los servicios o productos que ofreces (ej. Balayage, Morena Iluminada, Cortes, Postres, etc.), precios aproximados o cómo te gusta atender a tus clientes..." 
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f45f44] transition-all resize-none"
                ></textarea>
                <span className="text-[11px] text-gray-500 mt-1 block">
                  Puedes detallar todo lo que desees. Se enviará en un formato claro y organizado por WhatsApp.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <button
                id="btn-cancel-modal"
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition cursor-pointer"
              >
                Cancelar
              </button>

              <button
                id="btn-submit-whatsapp"
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-bold text-sm bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Enviar Solicitud por WhatsApp (+1 407 218-1294)
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
