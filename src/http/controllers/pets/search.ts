import { makeSearchPetUseCase } from '@/use-cases/factories/make-search-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsInParamsSchema = z.object({
    city: z.string(),
  })

  const searchPetsInQuerySchema = z.object({
    age: z.string().optional(),
    specie: z.string().optional(),
    gender: z.enum(['MALE', 'FEMALE']).optional(),
    size: z.enum(['MINI', 'SMALL', 'AVERAGE', 'BIG', 'GIANT']).optional(),
    energy_level: z.enum(['LOW', 'AVERAGE', 'HIGH']).optional(),
    independence_level: z.enum(['LOW', 'AVERAGE', 'HIGH']).optional(),
    page: z.coerce.number().min(1).default(1),
  })

  const { city } = searchPetsInParamsSchema.parse(request.params)
  const filters = searchPetsInQuerySchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetUseCase()

  const { pets } = await searchPetsUseCase.execute({
    city,
    ...filters,
  })

  return reply.status(200).send({ pets })
}
