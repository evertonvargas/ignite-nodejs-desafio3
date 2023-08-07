import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { OrgAlreadyExistError } from '@/use-cases/errors/org-already-exist-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    cep: z.number(),
    phone: z.string(),
    city: z.string(),
    state: z.string(),
  })

  const { name, email, password, address, cep, city, state, phone } =
    requestBodySchema.parse(request.body)

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase()

    await registerOrgUseCase.execute({
      name,
      email,
      password,
      address,
      cep,
      city,
      state,
      phone,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistError) {
      return reply.status(409).send({ message: err.message })
    }
  }

  return reply.status(201).send()
}
