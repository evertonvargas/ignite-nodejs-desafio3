import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgAlreadyExistError } from './errors/org-already-exist-error'
import { hash } from 'bcryptjs'

interface RegisterOrgUseCaseRequest {
  name: string
  email: string
  password: string
  address: string
  cep: number
  phone: string
  city: string
  state: string
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ email, password, ...props }: RegisterOrgUseCaseRequest) {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistError()
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      email,
      password_hash,
      ...props,
    })

    return {
      org,
    }
  }
}
