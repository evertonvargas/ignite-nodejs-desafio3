import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetUseCase } from '../get-pet'

export function makeGetPetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new GetPetUseCase(prismaPetsRepository)

  return useCase
}
