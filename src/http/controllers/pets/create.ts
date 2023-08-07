import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetInBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.string(),
    specie: z.string(),
    requirements: z.array(z.string()).optional(),
    gender: z.enum(['MALE', 'FEMALE']).optional(),
    size: z.enum(['MINI', 'SMALL', 'AVERAGE', 'BIG', 'GIANT']).optional(),
    energy_level: z.enum(['LOW', 'AVERAGE', 'HIGH']).optional(),
    independence_level: z.enum(['LOW', 'AVERAGE', 'HIGH']).optional(),
    orgId: z.string(),
  })

  const {
    name,
    age,
    description,
    gender,
    energy_level,
    independence_level,
    requirements,
    size,
    specie,
    orgId,
  } = createPetInBodySchema.parse(request.body)

  const registerPetUseCase = makeRegisterPetUseCase()

  await registerPetUseCase.execute({
    name,
    description,
    age,
    gender,
    energy_level,
    independence_level,
    requirements,
    size,
    specie,
    orgId,
  })

  return reply.status(201).send()
}
