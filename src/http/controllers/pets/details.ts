import { PetProfileError } from '@/use-cases/errors/pet-profile-error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const detailsPetParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = detailsPetParamsSchema.parse(request.params)

  try {
    const getPetUseCase = makeGetPetUseCase()

    const { pet } = await getPetUseCase.execute({
      petId,
    })

    return reply.status(201).send({ pet })
  } catch (err) {
    if (err instanceof PetProfileError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
