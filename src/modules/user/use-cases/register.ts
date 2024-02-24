import { hash } from 'bcryptjs'
import { InMemoryUsersrepository } from '@/modules/user/repositories/in-memory/in-memory-users-repository'
import { User } from '@prisma/client'
import { UserAlreadyExistsError } from './errors/user-already-exists-errors'

interface CreateUseCaseRequest {
  name: string
  email: string
  password: string
}

interface CreateUseCaseResponse {
  user: User
}
export class RegisterUseCase {
  constructor(private usersrepository: InMemoryUsersrepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUseCaseRequest): Promise<CreateUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const emailAlreadyexists = await this.usersrepository.findByEmail(email)

    if (emailAlreadyexists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersrepository.create({
      name,
      password: password_hash,
      email,
      updated_at: '',
    })

    return { user }
  }
}
