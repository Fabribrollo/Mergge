import { z } from 'zod'

// Bastante permisivo a propósito: solo dígitos, espacios, +, -, paréntesis.
// No intentamos validar que el número "exista" (para eso está Turnstile +
// que después lo contactamos nosotros mismos) — solo filtrar que no sea
// texto random tipeado en el campo equivocado.
const telefonoRegex = /^[0-9+\s()-]{6,20}$/

// Las 17 preguntas del formulario de Mergge, una sola vez. La usan tanto
// apps/frontend (para avisarle rápido al usuario) como apps/backend
// (la que realmente cuenta, porque el frontend se puede saltear).
export const leadSchema = z.object({
  nombre: z.string().min(1, 'Poné tu nombre'),
  empresa: z.string().min(1, 'Poné el nombre de tu proyecto'),
  rubro: z.string().optional(),
  email: z.string().email('Revisá el email'),
  whatsapp: z
    .string()
    .optional()
    .refine((valor) => !valor || telefonoRegex.test(valor), 'Revisá el WhatsApp'),
  webActual: z.string().optional(),
  links: z.string().optional(),
  problemas: z.array(z.string()).default([]),
  objetivos: z.array(z.string()).default([]),
  tipoProyecto: z.string().optional(),
  autogestion: z.string().optional(),
  material: z.string().optional(),
  plazo: z.string().optional(),
  presupuesto: z.string().optional(),
  decisor: z.string().optional(),
  comoLlego: z.string().optional(),
  valora: z.array(z.string()).max(2).default([]),
  comentario: z.string().max(2000).optional(),

  // No son respuestas del formulario: viajan con el envío.
  token: z.string().min(1), // token de Turnstile
  website: z.string().max(0), // honeypot: si viene con algo, es un bot
})

export type Lead = z.infer<typeof leadSchema>
