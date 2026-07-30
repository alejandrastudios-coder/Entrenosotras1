/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Fallback response database in case Gemini is not configured
const FALLBACK_RESPONSES: Record<string, { welcome: string; products: string; shipping: string; general: string[] }> = {
  'norely-perez': {
    welcome: "¡Hola! Qué gusto saludarte 💈 Soy Norely Pérez. Atiendo por cita los fines de semana en Lake Nona, Saint Cloud, Orlando y Deltona (y en Deltona de lunes a viernes después de las 6:00 PM). ¿Buscas un corte de cabello para ti o para los más pequeños?",
    products: "Ofrezco corte de cabello premium ($30) o corte infantil de especialidad ($25). ¿Cuál te gustaría agendar con al menos 3 días de anticipación?",
    shipping: "Cubro las zonas de Lake Nona, Saint Cloud, Orlando y Deltona. Recuerda reservar con 3 días de anticipación. Si estás en Deltona, ¡también puedo atenderte lunes a viernes desde las 6:00 PM!",
    general: [
      "Recuerda que coordinamos las citas con un mínimo de 3 días de anticipación para garantizar el mejor servicio y puntualidad.",
      "Si estás en Deltona, tengo disponibilidad especial de lunes a viernes a partir de las 6:00 PM, además de los fines de semana.",
      "Escríbeme por WhatsApp directamente para reservar el horario que mejor te convenga para este sábado o domingo."
    ]
  },
  'alejandra-mendez': {
    welcome: "¡Hola! Bienvenida a Méndez Hair & Beauty ✨ Soy Alejandra Méndez. ¿Qué servicio te gustaría realizarte hoy?",
    products: "Me especializo en Balayage y reflejos de autor ($150), tratamiento de reconstrucción profunda capilar ($65) y corte de cabello estilizado ($45). ¿Diseñamos tu nuevo look?",
    shipping: "Mi salón de atención exclusiva y personalizada se encuentra ubicado en Lake Nona, Florida. Escribime para darte la dirección exacta.",
    general: [
      "Trabajo únicamente con productos premium de alta gama profesional libres de formol.",
      "Podemos coordinar un turno de diagnóstico gratuito para evaluar la salud de tu melena.",
      "Te espero en Lake Nona para brindarte una experiencia relajante de salón de belleza."
    ]
  }
};

// Simple rule-based intelligent fallback generator
function getFallbackReply(entrepreneurId: string, message: string, historyLength: number): string {
  const dataset = FALLBACK_RESPONSES[entrepreneurId] || FALLBACK_RESPONSES['norely-perez'];
  const text = message.toLowerCase();

  if (text.includes("hola") || text.includes("buenos") || text.includes("buenas") || text.includes("salud")) {
    return dataset.welcome;
  }
  if (text.includes("producto") || text.includes("vende") || text.includes("precio") || text.includes("vale") || text.includes("cuanto") || text.includes("cuesta") || text.includes("corte") || text.includes("barba") || text.includes("color") || text.includes("balayage") || text.includes("alisado") || text.includes("servicio") || text.includes("tarifa")) {
    return dataset.products;
  }
  if (text.includes("donde") || text.includes("ubicacion") || text.includes("donde esta") || text.includes("direccion") || text.includes("lake nona") || text.includes("ciudad") || text.includes("estado")) {
    return dataset.shipping;
  }

  // Cyclically return general tips if nothing matches
  const idx = historyLength % dataset.general.length;
  return dataset.general[idx];
}

// API endpoint for Gemini-powered direct messaging
app.post("/api/chat", async (req, res) => {
  const { entrepreneurId, message, history, entrepreneurData } = req.body;

  if (!entrepreneurId || !message || !entrepreneurData) {
    return res.status(400).json({ error: "Parámetros insuficientes o incorrectos" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // Graceful fallback to rich static script if no actual API key
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    const historyLength = Array.isArray(history) ? history.length : 0;
    const reply = getFallbackReply(entrepreneurId, message, historyLength);
    return res.json({ text: reply, isFallback: true });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    // Formulate pristine system instructions customized to the entrepreneur context
    const systemPrompt = `Eres ${entrepreneurData.name}, fundadora de "${entrepreneurData.businessName}" (${entrepreneurData.category}), ubicada en de ${entrepreneurData.location}.
Tu presentación y bio de vida es: ${entrepreneurData.fullBio}

Tus productos disponibles y precios son:
${entrepreneurData.products.map((p: any) => `- ${p.name} ($${p.price}): ${p.description}`).join('\n')}

Preguntas frecuentes y tus políticas son:
${entrepreneurData.faqs.map((f: any) => `Pregunta: ${f.question} | Respuesta: ${f.answer}`).join('\n')}

INSTRUCCIONES DE COMPORTAMIENTO Y RESPUESTA:
1. Responde de forma sumamente cálida, atenta, cariñosa y cercana. Es un chat de una comunidad de apoyo de mujeres emprendedoras e interesadas llamada "Entre Nosotras".
2. Habla con naturalidad y modismos cordiales de Argentina o Hispanoamérica (puedes tutear con respeto: "hola!", "tenés", "podés", "re", "¿cómo estás?", "qué lindo que consultes") pero siempre con excelencia educativa y profesional.
3. El límite físico de tus respuestas es de 2 a 4 frases (CONCISAS). No hagas explicaciones largas, ya que esto ocurre en un chat móvil/escritorio rápido. Genera diálogos fluidos.
4. Jamás hables de temas ajenos a tu emprendimiento, tales como política, medicina externa, ciencias complejas o de otros emprendedores que no pertenezcan a la comunidad. Si te consultan por estas temáticas, responde risueñamente desviando el tema hacia tus alfajores, serums, cerámicas o camisas según corresponda.
5. Invita amablemente a la persona a comprar, coordinar un envío, personalizar su pedido o unirse a la red de emprendimiento de "Entre Nosotras".`;

    // Map conversation History to correct parts array for Gemini 3.5 API
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      });
    }

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Run generateContent with 3.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.8,
      }
    });

    const textToReturn = response.text || "¡Hola! Qué lindo tu mensaje. Decime, ¿te gustaría saber más detalles de mis propuestas?";
    return res.json({ text: textToReturn, isFallback: false });

  } catch (error: any) {
    console.error("Gemini Error, falling back to rule-based system:", error);
    const historyLength = Array.isArray(history) ? history.length : 0;
    const reply = getFallbackReply(entrepreneurId, message, historyLength);
    return res.json({ text: reply, isFallback: true, error: error.message });
  }
});

// Configure Vite or Serve static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Entre Nosotras App] Server online: http://0.0.0.0:${PORT}`);
  });
}

startServer();
