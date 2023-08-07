import { Pet, Prisma } from '@prisma/client'

export type Gender = 'MALE' | 'FEMALE'

export type Size = 'MINI' | 'SMALL' | 'AVERAGE' | 'BIG' | 'GIANT'

export type Level = 'LOW' | 'AVERAGE' | 'HIGH'

export interface searchManyParams {
  city: string
  age?: string
  specie?: string
  gender?: Gender
  size?: Size
  energy_level?: Level
  independence_level?: Level
  page: number
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(petId: string): Promise<Pet | null>
  searchMany(data: searchManyParams): Promise<Pet[] | null>
}
