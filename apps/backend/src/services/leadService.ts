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

  // D1 no acepta `undefined` en bind (los opcionales que no vinieron) → null.
  // Los arrays se guardan como JSON en texto.
  try {
    await env.DB.prepare(
      `INSERT INTO leads (
        nombre, empresa, rubro, email, whatsapp, web_actual, links,
        problemas, objetivos, tipo_proyecto, autogestion, material,
        plazo, presupuesto, decisor, como_llego, valora, comentario
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        data.nombre,
        data.empresa,
        data.rubro ?? null,
        data.email,
        data.whatsapp ?? null,
        data.webActual ?? null,
        data.links ?? null,
        JSON.stringify(data.problemas),
        JSON.stringify(data.objetivos),
        data.tipoProyecto ?? null,
        data.autogestion ?? null,
        data.material ?? null,
        data.plazo ?? null,
        data.presupuesto ?? null,
        data.decisor ?? null,
        data.comoLlego ?? null,
        JSON.stringify(data.valora),
        data.comentario ?? null
      )
      .run()
  } catch (error) {
    console.error('Error insertando lead en D1:', error)
    return { success: false, status: 500, error: 'No pudimos guardar tu consulta' }
  }

  return { success: true, data }
}
