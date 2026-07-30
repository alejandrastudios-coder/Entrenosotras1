/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Check, ArrowRight, Store, FileText, Gift, Info, Lock } from 'lucide-react';
import { Entrepreneur, Product, CATEGORIES } from '../types';

interface AddProfileModalProps {
  onClose: () => void;
  onSave: (newProfile: Entrepreneur) => void;
}

// Preset assets matching categories for flawless visual outcomes
const COVER_PRESETS: Record<string, { bg: string; av: string }> = {
  'Barbería': {
    bg: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800&h=400',
    av: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300'
  },
  'Estilista & Estética': {
    bg: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800&h=400',
    av: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300'
  }
};

export default function AddProfileModal({ onClose, onSave }: AddProfileModalProps) {
  const [authorized, setAuthorized] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState<string>('Barbería');
  const [description, setDescription] = useState('');
  const [fullBio, setFullBio] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [email, setEmail] = useState('');

  // Product Inputs
  const [prod1Name, setProd1Name] = useState('');
  const [prod1Price, setProd1Price] = useState('');
  const [prod1Desc, setProd1Desc] = useState('');
  
  const [prod2Name, setProd2Name] = useState('');
  const [prod2Price, setProd2Price] = useState('');
  const [prod2Desc, setProd2Desc] = useState('');

  const [formError, setFormError] = useState('');

  const handleNextStep = () => {
    if (!name.trim() || !businessName.trim() || !description.trim() || !fullBio.trim() || !location.trim()) {
      setFormError('Por favor completa todos los campos principales antes de continuar.');
      return;
    }
    setFormError('');
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!prod1Name.trim() || !prod1Price.trim()) {
      setFormError('Al menos debes registrar un producto estrella para inaugurar tu vidriera virtual.');
      return;
    }

    const priceNum1 = parseFloat(prod1Price);
    if (isNaN(priceNum1) || priceNum1 <= 0) {
      setFormError('Por favor ingresa un precio número válido para tu primer producto.');
      return;
    }

    const products: Product[] = [
      {
        id: `p-${Date.now()}-1`,
        name: prod1Name.trim(),
        description: prod1Desc.trim() || 'Edición especial para la comunidad "Entre Nosotras".',
        price: priceNum1,
        // Usamos una linda foto por defecto para el producto
        image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=400&h=300',
        tag: 'Inauguración'
      }
    ];

    if (prod2Name.trim() && prod2Price.trim()) {
      const priceNum2 = parseFloat(prod2Price);
      if (!isNaN(priceNum2) && priceNum2 > 0) {
        products.push({
          id: `p-${Date.now()}-2`,
          name: prod2Name.trim(),
          description: prod2Desc.trim() || 'Elaborado bajo pedido con amor.',
          price: priceNum2,
          image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400&h=300'
        });
      }
    }

    // presets decorativos
    const preset = COVER_PRESETS[category] || COVER_PRESETS['Barbería'];

    const newProfile: Entrepreneur = {
      id: `profile-${Date.now()}`,
      name: name.trim(),
      businessName: businessName.trim(),
      category: category,
      description: description.trim(),
      fullBio: fullBio.trim(),
      avatar: preset.av,
      coverImage: preset.bg,
      location: location.trim(),
      rating: 5.0,
      reviewsCount: 1,
      reviews: [
        {
          id: `r-init-${Date.now()}`,
          author: 'Leticia V. (Coordinadora)',
          rating: 5,
          comment: '¡Te damos la más cálida bienvenida a Entre Nosotras! Tu proyecto es tan inspirador como necesario.',
          date: 'Hoy'
        }
      ],
      faqs: [
        {
          question: '¿Cómo coordinar una compra?',
          answer: 'Escribime directamente al chat de aquí de la web para coordinar formas de entrega y consultar stock.'
        },
        {
          question: '¿Hacen entregas personalizadas?',
          answer: '¡Sí! Todo lo hacemos de forma artesanal y ajustable a lo que necesites.'
        }
      ],
      phone: phone.trim() || '+54 11 1234-5678',
      instagram: instagram.trim() ? (instagram.startsWith('@') ? instagram : `@${instagram}`) : '@entrenosotras.comunidad',
      email: email.trim() || 'hola@entrenosotras.com',
      products: products,
      status: 'online',
      isPremium: false
    };

    onSave(newProfile);
  };

  return (
    <div id="modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto">
      <div 
        id="modal-card" 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div id="modal-header" className="flex items-center justify-between p-5 bg-[#3d2c29] text-white">
          <div className="flex items-center gap-2.5">
            <Store className="w-5 h-5 text-[#f45f44]" />
            <div>
              <h3 className="font-sans font-bold text-lg tracking-wide">
                Sumar Mi Emprendimiento
              </h3>
              <p className="font-mono text-[10px] text-[#e9c8bc] uppercase tracking-wider">
                Unirse a la Red "Entre Nosotras"
              </p>
            </div>
          </div>
          <button 
            id="btn-close-modal"
            onClick={onClose} 
            type="button"
            className="p-1 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Container */}
        <div id="modal-body-scroll" className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {!authorized ? (
            <div id="passcode-verification-step" className="py-6 flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 bg-orange-50 text-[#f45f44] border border-orange-100 rounded-2xl flex items-center justify-center shadow-inner">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-2 max-w-sm">
                <h4 className="font-sans font-black text-lg text-gray-900 tracking-tight">
                  Código de Invitación Requerido
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Para mantener la fidelidad rústica y resguardar la autenticidad de nuestra red de emprendedoras patagónicas, solicitamos ingresar la clave de la cooperativa.
                </p>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                if (passcode.trim().toLowerCase() === 'fuerza') {
                  setAuthorized(true);
                  setPasscodeError('');
                } else {
                  setPasscodeError('Código de invitación incorrecto. Intentá con el código oficial ("fuerza").');
                }
              }} className="w-full max-w-xs space-y-4">
                <div>
                  <input
                    id="input-verification-passcode"
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Clave de acceso..."
                    className="w-full px-4 py-2.5 text-center text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f45f44] focus:border-transparent tracking-widest font-mono font-bold"
                  />
                </div>

                {passcodeError && (
                  <p className="text-xs text-red-600 font-bold bg-red-50 py-2 px-3 rounded-lg border border-red-100">
                    {passcodeError}
                  </p>
                )}

                <button
                  id="btn-verify-passcode"
                  type="submit"
                  className="w-full py-2.5 font-bold text-sm text-white bg-[#3d2c29] hover:bg-[#523d39] rounded-xl shadow transition"
                >
                  Verificar Clave
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Progress Indicator */}
              <div id="step-timeline" className="flex items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-[#f45f44] text-white' : 'bg-green-100 text-green-700'}`}>
                    {step === 1 ? '1' : <Check className="w-3.5 h-3.5" />}
                  </span>
                  <span className={`text-xs font-bold ${step === 1 ? 'text-gray-800' : 'text-green-700'}`}>Tus Datos</span>
                </div>
                <div className="h-[2px] w-12 bg-gray-200"></div>
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-[#f45f44] text-white' : 'bg-gray-100 text-gray-400'}`}>
                    2
                  </span>
                  <span className={`text-xs font-bold ${step === 2 ? 'text-gray-800' : 'text-gray-400'}`}>Tus Productos</span>
                </div>
              </div>

              {formError && (
                <div id="form-error-banner" className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 rounded-r text-xs text-red-700 font-medium">
                  {formError}
                </div>
              )}

              {step === 1 ? (
                /* Step 1: Principal Details Form */
                <div id="step-1-inputs" className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="input-owner-name" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Tu Nombre Completo *</label>
                      <input 
                        id="input-owner-name"
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. María Josefa" 
                        className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f45f44] focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="input-biz-name" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Nombre del Emprendimiento *</label>
                      <input 
                        id="input-biz-name"
                        type="text" 
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Ej. Barro & Fuego" 
                        className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f45f44] focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="select-category" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Rubro Principal *</label>
                      <select 
                        id="select-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f45f44] focus:border-transparent transition-all"
                      >
                        {CATEGORIES.filter(c => c !== 'Todos').map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="input-loc" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Ubicación física (Localidad/Ciudad) *</label>
                      <input 
                        id="input-loc"
                        type="text" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Ej. San Cristóbal, CABA" 
                        className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f45f44] focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="input-desc" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Breve frase/slogan descriptivo *</label>
                    <input 
                      id="input-desc"
                      type="text" 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Ej. Objetos de decoración modelados en gres silvestre rústico." 
                      maxLength={120}
                      className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f45f44] focus:border-transparent transition-all"
                      required
                    />
                    <span className="text-[10px] text-gray-400 mt-1 block">Una breve línea para el catálogo de búsqueda rápido de usuarios.</span>
                  </div>

                  <div>
                    <label htmlFor="input-bio" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Tu historia detallada (Biografía) *</label>
                    <textarea 
                      id="input-bio"
                      rows={3}
                      value={fullBio}
                      onChange={(e) => setFullBio(e.target.value)}
                      placeholder="Contanos tu trayectoria, tu pasión, cómo nació tu idea, cómo trabajas y lo que te inspira..." 
                      className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f45f44] focus:border-transparent transition-all resize-none"
                      required
                    ></textarea>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <h4 className="text-xs font-bold text-[#3d2c29] mb-3 uppercase tracking-wider flex items-center gap-1">Canales de Contacto (Público)</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label htmlFor="input-instagram" className="block text-[10px] font-bold text-gray-500 mb-1">Instagram (@usuario)</label>
                        <input 
                          id="input-instagram"
                          type="text" 
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          placeholder="@barroyfuego" 
                          className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#f45f44]"
                        />
                      </div>
                      <div>
                        <label htmlFor="input-phone" className="block text-[10px] font-bold text-gray-500 mb-1">Teléfono/WhatsApp</label>
                        <input 
                          id="input-phone"
                          type="text" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+54 11 5555" 
                          className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#f45f44]"
                        />
                      </div>
                      <div>
                        <label htmlFor="input-email" className="block text-[10px] font-bold text-gray-500 mb-1">E-mail Comercial</label>
                        <input 
                          id="input-email"
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tienda@barro.com" 
                          className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#f45f44]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      id="btn-step-1-next"
                      type="button"
                      onClick={handleNextStep}
                      className="flex items-center gap-1.5 px-5 py-2.5 font-semibold text-sm rounded-lg bg-[#3d2c29] text-white hover:bg-[#523d39] transition-all"
                    >
                      Siguiente paso
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Step 2: Products Form */
                <div id="step-2-inputs" className="space-y-6">
                  
                  <div id="step-2-infobox" className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-xs text-orange-800 flex gap-2">
                    <Info className="w-5 h-5 text-[#f45f44] shrink-0" />
                    <p>
                      <strong>¡Hagamos florecer tu vidriera!</strong> Registra tus dos productos/servicios estrella. Los usuarios podrán realizar consultas y compras directas sobre estos ítems en tu panel de chat.
                    </p>
                  </div>

                  {/* Product 1 (Required) */}
                  <div id="propduct-1-box" className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 space-y-3">
                    <h4 className="text-xs font-bold text-[#f45f44] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f45f44]"></span>
                      Producto Estrella 1 (Requerido) *
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label htmlFor="input-p1-name" className="block text-[10px] font-bold text-gray-500 mb-1">Nombre del producto *</label>
                        <input 
                          id="input-p1-name"
                          type="text" 
                          value={prod1Name}
                          onChange={(e) => setProd1Name(e.target.value)}
                          placeholder="Ej. Taza 'Abrazo' rústica beige" 
                          className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#f45f44] bg-white"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="input-p1-price" className="block text-[10px] font-bold text-gray-500 mb-1">Precio aproximado ($ ARS) *</label>
                        <input 
                          id="input-p1-price"
                          type="number" 
                          value={prod1Price}
                          onChange={(e) => setProd1Price(e.target.value)}
                          placeholder="5500" 
                          className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#f45f44] bg-white"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="input-p1-desc" className="block text-[10px] font-bold text-gray-500 mb-1">Descripción corta o ingredientes</label>
                      <textarea 
                        id="input-p1-desc"
                        rows={2}
                        value={prod1Desc}
                        onChange={(e) => setProd1Desc(e.target.value)}
                        placeholder="Contanos los detalles artesanales, materiales, peso o medidas..." 
                        className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#f45f44] bg-white resize-none"
                      ></textarea>
                    </div>
                  </div>

                  {/* Product 2 (Optional) */}
                  <div id="product-2-box" className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 space-y-3">
                    <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                      Producto Estrella 2 (Opcional)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label htmlFor="input-p2-name" className="block text-[10px] font-bold text-gray-500 mb-1">Nombre del producto</label>
                        <input 
                          id="input-p2-name"
                          type="text" 
                          value={prod2Name}
                          onChange={(e) => setProd2Name(e.target.value)}
                          placeholder="Ej. Plato Playo Arena Rústico" 
                          className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="input-p2-price" className="block text-[10px] font-bold text-gray-500 mb-1">Precio aproximado ($ ARS)</label>
                        <input 
                          id="input-p2-price"
                          type="number" 
                          value={prod2Price}
                          onChange={(e) => setProd2Price(e.target.value)}
                          placeholder="6200" 
                          className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="input-p2-desc" className="block text-[10px] font-bold text-gray-500 mb-1">Descripción corta o materiales</label>
                      <textarea 
                        id="input-p2-desc"
                        rows={2}
                        value={prod2Desc}
                        onChange={(e) => setProd2Desc(e.target.value)}
                        placeholder="Detalles sobre este segundo producto..." 
                        className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-between pt-2">
                    <button
                      id="btn-prev-step"
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                    >
                      Volver atrás
                    </button>
                    <button
                      id="btn-save-profile"
                      type="button"
                      onClick={handleSubmit}
                      className="flex items-center gap-1.5 px-6 py-2.5 text-sm font-bold bg-[#f45f44] text-white hover:bg-[#ff6f55] rounded-lg shadow-md transition-all"
                    >
                      ¡Publicar Emprendimiento!
                      <Check className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
