import { PetsRepository } from '@/repositories/pets-repository'
import { PetProfileError } from './errors/pet-profile-error'

interface GetUseCaseRequest {
  petId: string
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ petId }: GetUseCaseRequest) {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new PetProfileError()
    }

    return { pet }
  }
}
