import { createClient } from '@supabase/supabase-js'
import { leadSchema, type Lead } from 'shared'
import { Bindings } from '../bindings'

export type LeadData = Omit<Lead, 'token' | 'website'>

// Sin nada de Hono acá adentro: solo el body crudo y los bindings que necesita.
// Así se puede testear esta función llamándola directo, sin armar un Context falso.
type LeadServiceResult =
  | { success: true; data: LeadData }
  | { success: false; status: 400 | 500; error: string; detail?: unknown }

export default async function createLead(body: unknown, env: Bindings): Promise<LeadServiceResult> {
  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) {
    return {
      success: false,
      status: 400,
      error: 'Faltan datos o hay algo mal cargado',
      detail: parsed.error.issues,
    }
  }

  const { token: _token, website: _website, ...data } = parsed.data

  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SECRET)

  const { error } = await supabase.from('leads').insert({
    nombre: data.nombre,
    empresa: data.empresa,
    rubro: data.rubro,
    email: data.email,
    whatsapp: data.whatsapp,
    web_actual: data.webActual,
    links: data.links,
    problemas: data.problemas,
    objetivos: data.objetivos,
    tipo_proyecto: data.tipoProyecto,
    autogestion: data.autogestion,
    material: data.material,
    plazo: data.plazo,
    presupuesto: data.presupuesto,
    decisor: data.decisor,
    como_llego: data.comoLlego,
    valora: data.valora,
    comentario: data.comentario,
  })

  if (error) {
    console.error('Error insertando lead en Supabase:', error)
    return { success: false, status: 500, error: 'No pudimos guardar tu consulta' }
  }

  return { success: true, data }
}
