/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SpecialOffer } from './types';

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'off-np-1',
    entrepreneurId: 'norely-perez',
    entrepreneurName: 'Norely Pérez',
    businessName: 'Norely Hair & Style',
    productName: 'Corte de Cabello Premium + Lavado Estimulante ⚡',
    image: 'https://i.ibb.co/1YD6fX7L/corte-1.jpg',
    description: 'Súper descuento por tiempo limitado para renovar tu estilo por completo. Incluye nuestro diseño de corte premium personalizado, lavado capilar estimulante, secado y peinado final de autor.',
    originalPrice: 30,
    discountPrice: 20,
    offerType: 'flash',
    stockLimit: 12,
    stockSold: 9,
    endsInHours: 4
  },
  {
    id: 'off-am-1',
    entrepreneurId: 'alejandra-mendez',
    entrepreneurName: 'Alejandra Méndez',
    businessName: 'Méndez Hair & Beauty',
    productName: 'Especial Cambio de Look Verano: Balayage & Plex 🌸',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600&h=400',
    description: 'Paquete completo de iluminación balayage premium, con aplicación de aditivo plex protector de fibra capilar, lavado terapéutico, máscara nutritiva, corte de puntas y ondas espectaculares de salón.',
    originalPrice: 190,
    discountPrice: 140,
    offerType: 'seasonal',
    seasonalEventName: 'Especial Cambio de Look 🌸',
    stockLimit: 10,
    stockSold: 7,
    couponCode: 'LOOKNUEVO'
  }
];
