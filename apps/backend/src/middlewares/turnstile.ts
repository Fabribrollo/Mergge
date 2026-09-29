import type { MiddlewareHandler } from 'hono'
import { Bindings } from '../bindings'

// Antes esto era un mini Hono aparte (new Hono().use(...)), pero así no se
// podía reusar dentro de otra ruta: un Hono entero no se puede meter como
// paso en la cadena de otro router, solo funciones (c, next) => ... sí.
// Por eso ahora exportamos directamente la función middleware.
export const turnstileMiddleware: MiddlewareHandler<{ Bindings: Bindings }> = async (
  c,
  next
) => {
  const body = await c.req.json().catch(() => null)
  const token = body?.token

  if (typeof token !== 'string' || token.length === 0) {
    return c.json({ success: false, error: 'Falta el token de Turnstile' }, 400)
  }

  const verify = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: c.env.TURNSTILE_SECRET,
        response: token,
        remoteip: c.req.header('CF-Connecting-IP') ?? '',
      }),
    }
  ).then((r) => r.json<{ success: boolean; 'error-codes'?: string[] }>())

  if (!verify.success) {
    return c.json(
      {
        success: false,
        error: 'No pudimos verificar que seas una persona',
        detail: verify['error-codes'],
      },
      400
    )
  }

  await next()
}
