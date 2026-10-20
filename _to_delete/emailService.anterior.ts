import { Resend } from 'resend'
import { Bindings } from '../bindings'
import { leadNotificationHtml } from '../emails/leadTemplateEmail'
import type { LeadData } from './leadService'

// Se llama desde el controller con c.executionCtx.waitUntil(...), así que
// nadie espera esta promesa para responderle al usuario — por eso nunca
// puede rechazar: si Resend falla, el lead ya se guardó en Supabase, y
// romper la respuesta por un mail que no salió sería peor que no mandarlo.
export async function sendLeadNotification(lead: LeadData, env: Bindings) {
  try {
    const resend = new Resend(env.RESEND_SECRET)
    await resend.emails.send({
      from: 'Mergge <contacto@mergge.com.ar>',
      to: [env.LEAD_NOTIFICATION_EMAIL],
      subject: `Nuevo lead: ${lead.empresa}`,
      html: leadNotificationHtml(lead),
    })
  } catch (error) {
    console.error('Error mandando el mail de aviso con Resend:', error)
  }
}
