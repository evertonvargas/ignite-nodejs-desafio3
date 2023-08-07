import { FastifyInstance } from 'fastify'
import { search } from '../controllers/pets/search'
import { create } from '../controllers/pets/create'
import { verifyJwt } from '../middlewares/verify-jwt'
import { details } from '../controllers/pets/details'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', details)
  app.get('/pets/search/:city', search)
  app.post('/pets', { onRequest: [verifyJwt] }, create)
}
