import {
  Gender,
  Level,
  Size,
  PetsRepository,
} from '@/repositories/pets-repository'

interface RegisterPetUseCaseRequest {
  name: string
  age: string
  description: string
  requirements?: string[]
  specie: string
  gender?: Gender
  size?: Size
  energy_level?: Level
  independence_level?: Level
  orgId: string
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(data: RegisterPetUseCaseRequest) {
    const pet = await this.petsRepository.create({
      ...data,
    })

    return {
      pet,
    }
  }
}
