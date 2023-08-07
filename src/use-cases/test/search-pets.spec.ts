import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from '../search-pets'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search for Pets', async () => {
    await petsRepository.create({
      name: 'Sansão',
      age: 'Filhote',
      description: 'Cachorro dócil e amável',
      requirements: ['Local grande para o animal correr e brincar'],
      specie: 'dog',
      gender: 'MALE',
      size: 'BIG',
      energy_level: 'HIGH',
      independence_level: 'AVERAGE',
      orgId: 'orgId-1',
    })

    const { pets } = await sut.execute({
      city: 'Sobradinho',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Sansão' })])
  })

  it('should be able to search for Pets by characteristics', async () => {
    await petsRepository.create({
      name: 'Sansão',
      age: 'Filhote',
      description: 'Cachorro dócil e amável',
      requirements: ['Local grande para o animal correr e brincar'],
      specie: 'dog',
      gender: 'MALE',
      size: 'BIG',
      energy_level: 'HIGH',
      independence_level: 'AVERAGE',
      orgId: 'orgId-1',
    })

    await petsRepository.create({
      name: 'Lola',
      age: 'Adulta',
      description: 'Gata adorável',
      requirements: [],
      specie: 'cat',
      gender: 'MALE',
      size: 'BIG',
      energy_level: 'HIGH',
      independence_level: 'AVERAGE',
      orgId: 'orgId-1',
    })

    const { pets } = await sut.execute({
      city: 'Sobradinho',
      specie: 'cat',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Lola' })])
  })

  it('should be able to fetch paginated Pet search', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        name: `Animal ${i}`,
        age: 'Adulta',
        description: null,
        specie: 'cat',
        orgId: 'orgId-1',
      })
    }

    const { pets } = await sut.execute({
      city: 'Sobradinho',
      specie: 'cat',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Animal 21' }),
      expect.objectContaining({ name: 'Animal 22' }),
    ])
  })
})
