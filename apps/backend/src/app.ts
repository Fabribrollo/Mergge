import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Bindings } from './bindings'
import health from './routes/health'
import lead from './routes/lead'
import { turnstileMiddleware } from './middlewares/turnstile'
import { honeypotMiddleware } from './middlewares/honeypot'

const app = new Hono<{ Bindings: Bindings }>()

app.use(
  '/*',
  cors({
    origin: ['http://localhost:4321', 'https://mergge.com.ar'],
    allowMethods: ['POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
  })
)

app.route('/health', health)

app.use('/lead', honeypotMiddleware, turnstileMiddleware)
app.route('/lead', lead)

export default app
