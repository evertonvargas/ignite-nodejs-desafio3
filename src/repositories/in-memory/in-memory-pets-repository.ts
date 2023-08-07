import { Org, Pet, Prisma } from '@prisma/client'
import { PetsRepository, searchManyParams } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  private org: Org[] = [
    {
      id: 'orgId-1',
      name: 'Find a friend',
      email: 'org@gmail.com',
      password_hash: 'teste1234',
      address: 'Rua Pokémon',
      cep: 90000000,
      phone: '1111111111',
      city: 'Sobradinho',
      state: 'RS',
      created_at: new Date(),
    },
    {
      id: 'orgId-2',
      name: 'Pet 2',
      email: 'org@gmail.com',
      password_hash: 'teste1234',
      address: 'Rua Pokémon',
      cep: 90000000,
      phone: '1111111111',
      city: 'Segredo',
      state: 'RS',
      created_at: new Date(),
    },
  ]

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      description: data.description ?? null,
      requirements: data.requirements as string[],
      specie: data.specie,
      gender: data.gender ?? 'MALE',
      size: data.size ?? 'AVERAGE',
      energy_level: data.energy_level ?? 'AVERAGE',
      independence_level: data.independence_level ?? 'AVERAGE',
      created_at: new Date(),
      orgId: data.orgId,
    }

    this.items.push(pet)

    return pet
  }

  async findById(petId: string) {
    const pet = this.items.find((item) => item.id === petId)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchMany({
    city,
    age,
    specie,
    gender,
    size,
    energy_level,
    independence_level,
    page,
  }: searchManyParams) {
    const orgs = this.org.filter((item) => item.city === city)

    if (orgs.length === 0) return null

    const orgIds = orgs.map((org) => org.id)

    const pets = this.items
      .filter(
        (pet) =>
          (!age || pet.age === age) &&
          (!size || pet.size === size) &&
          (!energy_level || pet.energy_level === energy_level) &&
          (!gender || pet.gender === gender) &&
          (!specie || pet.specie === specie) &&
          (!independence_level ||
            pet.independence_level === independence_level) &&
          orgIds.includes(pet.orgId),
      )
      .slice((page - 1) * 20, page * 20)

    return pets
  }
}
