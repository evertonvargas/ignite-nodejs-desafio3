import { FastifyInstance } from 'fastify'
import { register } from '../controllers/orgs/register'
import { refreshToken } from '../controllers/orgs/refreshToken'
import { authenticate } from '../controllers/orgs/authenticate'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refreshToken)
}
