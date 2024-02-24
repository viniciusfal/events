import { InMemoryUsersrepository } from '@/modules/user/repositories/in-memory/in-memory-users-repository'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

interface SetUserUseCaseRequest {
  data: User
}

interface SetUserUseCaseResponse {
  userUpdate: User
}

export class SetUserUseCase {
  constructor(private usersRepository: InMemoryUsersrepository) {}

  async execute({
    data,
  }: SetUserUseCaseRequest): Promise<SetUserUseCaseResponse> {
    const user = await this.usersRepository.findById(data.id)

    if (!user) {
      throw new Error('error')
    }

    await compare(data.password, user.password)

    const userUpdate = await this.usersRepository.update(data)

    return {
      userUpdate,
    }
  }
}
