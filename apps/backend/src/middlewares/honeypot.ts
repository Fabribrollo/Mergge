import type { MiddlewareHandler } from 'hono'


export const honeypotMiddleware: MiddlewareHandler = async (c, next) => {
  const body = await c.req.json().catch(() => null)
  if (body?.website) {
    return c.json({ success: true })
  }

  await next()
}
