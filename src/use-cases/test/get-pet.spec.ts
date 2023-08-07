import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetUseCase } from '../get-pet'
import { PetProfileError } from '../errors/pet-profile-error'

let petRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petRepository)
  })

  it('should be able to get Pet', async () => {
    const createPet = await petRepository.create({
      name: 'Sansão',
      age: 'Filhote',
      description: 'Cachorro dócil e amável',
      requirements: ['Local grande para o animal correr e brincar'],
      specie: 'dog',
      gender: 'MALE',
      size: 'BIG',
      energy_level: 'HIGH',
      independence_level: 'AVERAGE',
      orgId: '16138add-acb2-4301-900b-20e11d6fb0f0',
    })

    const { pet } = await sut.execute({ petId: createPet.id })

    expect(pet.name).toBeDefined()
  })

  it('should not able get user wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'not-existing-id',
      }),
    ).rejects.toBeInstanceOf(PetProfileError)
  })
})
