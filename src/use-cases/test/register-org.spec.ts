import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository copy'
import { RegisterOrgUseCase } from '../register-org'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistError } from '../errors/org-already-exist-error'

let orgRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgRepository)
  })

  it('should to create Org', async () => {
    const { org } = await sut.execute({
      name: 'Find a friend',
      email: 'org@gmail.com',
      password: '123456',
      address: 'Rua Pokémon',
      cep: 90000000,
      phone: '1111111111',
      city: 'Sobradinho',
      state: 'RS',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash user upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Find a friend',
      email: 'org@gmail.com',
      password: 'teste1234',
      address: 'Rua Pokémon',
      cep: 90000000,
      phone: '1111111111',
      city: 'Sobradinho',
      state: 'RS',
    })

    const isPasswordEncripted = await compare('teste1234', org.password_hash)

    expect(isPasswordEncripted).toBe(true)
  })

  it('should be possible to register only once with the email', async () => {
    await sut.execute({
      name: 'Find a friend',
      email: 'org@gmail.com',
      password: 'teste1234',
      address: 'Rua Pokémon',
      cep: 90000000,
      phone: '1111111111',
      city: 'Sobradinho',
      state: 'RS',
    })

    await expect(() =>
      sut.execute({
        name: 'Find a friend',
        email: 'org@gmail.com',
        password: 'teste1234',
        address: 'Rua Pokémon',
        cep: 90000000,
        phone: '1111111111',
        city: 'Sobradinho',
        state: 'RS',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistError)
  })
})
