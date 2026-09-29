import { Context } from 'hono'
import { Bindings } from '../bindings'
import createLead from '../services/leadService'
import { sendLeadNotification } from '../services/emailService'

export async function createLeadHandler(c: Context<{ Bindings: Bindings }>) {
  const body = await c.req.json().catch(() => null)

  const result = await createLead(body, c.env)

  if (!result.success) {
    return c.json({ error: result.error, detail: result.detail, success: false }, result.status)
  }

  c.executionCtx.waitUntil(sendLeadNotification(result.data, c.env))

  return c.json({ success: true })
}
