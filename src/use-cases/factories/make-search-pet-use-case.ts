import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsUseCase } from '../search-pets'

export function makeSearchPetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new SearchPetsUseCase(prismaPetsRepository)

  return useCase
}
