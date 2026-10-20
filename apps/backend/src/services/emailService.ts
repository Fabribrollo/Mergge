import { Resend } from 'resend'
import { Bindings } from '../bindings'
import {
  leadNotificationHtml,
  leadNotificationSubject,
  leadNotificationText,
} from '../emails/leadTemplateEmail'
import type { LeadData } from './leadService'

// Se llama desde el controller con c.executionCtx.waitUntil(...), así que
// nadie espera esta promesa para responderle al usuario — por eso nunca
// puede rechazar: si Resend falla, el lead ya se guardó en la base, y
// romper la respuesta por un mail que no salió sería peor que no mandarlo.
export async function sendLeadNotification(lead: LeadData, env: Bindings) {
  try {
    const resend = new Resend(env.RESEND_SECRET)
    const { error } = await resend.emails.send({
      from: 'Mergge <contacto@mergge.com.ar>',
      to: [env.LEAD_NOTIFICATION_EMAIL],
      // Al tocar "Responder" en el mail de aviso, le contestás directo al lead.
      replyTo: lead.email,
      subject: leadNotificationSubject(lead),
      html: leadNotificationHtml(lead),
      text: leadNotificationText(lead),
    })
    // El SDK de Resend no tira excepción si la API rechaza el envío: devuelve `error`.
    if (error) console.error('Resend rechazó el mail de aviso:', error)
  } catch (error) {
    console.error('Error mandando el mail de aviso con Resend:', error)
  }
}
