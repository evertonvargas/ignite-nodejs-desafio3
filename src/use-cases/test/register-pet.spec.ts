import { RegisterPetUseCase } from '../register-pet'
import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let petRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petRepository)
  })

  it('should to create Pet', async () => {
    const { pet } = await sut.execute({
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

    expect(pet.id).toEqual(expect.any(String))
  })
})
