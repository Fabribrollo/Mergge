import { Hono } from 'hono'
import { Bindings } from '../bindings'
import { createLeadHandler } from '../controllers/leadController'

const lead = new Hono<{ Bindings: Bindings }>()

lead.post('/', createLeadHandler)

export default lead
