import { beforeEach, describe, expect, it } from 'vitest'

import { AuthenticateUseCase } from '../authenticate'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository copy'
import { OrgInvalidCredentialsError } from '../errors/org-invalid-credential-error'

let orgRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgRepository)
  })

  it('should be able to authenticate', async () => {
    orgRepository.create({
      name: 'Find a friend',
      email: 'org@gmail.com',
      password_hash: await hash('teste1234', 6),
      address: 'Rua Pokémon',
      cep: 90000000,
      phone: '1111111111',
      city: 'Sobradinho',
      state: 'RS',
    })

    const authenticationResult = await sut.execute({
      email: 'org@gmail.com',
      password: 'teste1234',
    })

    expect(authenticationResult).toBeDefined()
  })

  it('should not authenticate with wrong password credentials', async () => {
    orgRepository.create({
      name: 'Find a friend',
      email: 'org@gmail.com',
      password_hash: await hash('teste1234', 6),
      address: 'Rua Pokémon',
      cep: 90000000,
      phone: '1111111111',
      city: 'Sobradinho',
      state: 'RS',
    })

    await expect(() =>
      sut.execute({
        email: 'org@gmail.com',
        password: 'teste123',
      }),
    ).rejects.toBeInstanceOf(OrgInvalidCredentialsError)
  })

  it('should not authenticate with wrong email credentials', async () => {
    orgRepository.create({
      name: 'Find a friend',
      email: 'org@gmail.com',
      password_hash: await hash('teste1234', 6),
      address: 'Rua Pokémon',
      cep: 90000000,
      phone: '1111111111',
      city: 'Sobradinho',
      state: 'RS',
    })

    await expect(() =>
      sut.execute({
        email: 'everton@gmail.com',
        password: 'teste123',
      }),
    ).rejects.toBeInstanceOf(OrgInvalidCredentialsError)
  })
})
