/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price?: number;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  tag?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
  isGoogleVerified?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Entrepreneur {
  id: string;
  name: string;
  businessName: string;
  category: string;
  description: string;
  fullBio: string;
  avatar: string;
  avatarPos?: string;
  coverImage: string;
  location: string;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  faqs: FAQ[];
  phone: string;
  instagram: string;
  email: string;
  products: Product[];
  status: 'online' | 'offline';
  isPremium?: boolean;
}

export interface Message {
  id: string;
  sender: 'user' | 'entrepreneur';
  text: string;
  timestamp: string;
}

export interface ChatSession {
  entrepreneurId: string;
  messages: Message[];
  isTyping?: boolean;
}

export interface SpecialOffer {
  id: string;
  entrepreneurId: string;
  entrepreneurName: string;
  businessName: string;
  productName: string;
  image: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  offerType: 'flash' | 'seasonal';
  seasonalEventName?: string; // e.g., "Especial Día de la Madre 🌸", "San Valentín 💝"
  stockLimit: number;
  stockSold: number;
  endsInHours?: number; // For countdown simulator
  couponCode?: string;
}

export const CATEGORIES = [
  'Todos',
  'Barbería',
  'Estilista & Estética'
] as const;
