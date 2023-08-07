import {
  PetsRepository,
  searchManyParams,
} from '@/repositories/pets-repository'

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city, page, ...props }: searchManyParams) {
    const pets = await this.petsRepository.searchMany({
      city,
      page,
      ...props,
    })

    return {
      pets,
    }
  }
}
