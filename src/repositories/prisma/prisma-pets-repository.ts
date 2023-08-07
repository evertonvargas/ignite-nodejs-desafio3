import { prisma } from 'prisma/lib/prisma'
import { PetsRepository, searchManyParams } from '../pets-repository'
import { Prisma } from '@prisma/client'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async searchMany({
    city,
    page,
    age,
    energy_level,
    gender,
    independence_level,
    size,
    specie,
  }: searchManyParams) {
    const pets = await prisma.pet.findMany({
      where: {
        age,
        specie,
        size,
        energy_level,
        gender,
        independence_level,
        org: {
          city,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }
}
