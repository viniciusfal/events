import { InMemoryUsersrepository } from '@/modules/user/repositories/in-memory/in-memory-users-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { SetUserUseCase } from './set-user'

let usersRepository: InMemoryUsersrepository
let sut: SetUserUseCase

describe('set user Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersrepository()
    sut = new SetUserUseCase(usersRepository)
  })

  it('should be able to set user', async () => {
    const user = await usersRepository.create({
      name: 'john doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
      updated_at: '',
    })

    const { userUpdate } = await sut.execute({
      data: {
        id: 'clstspzos000008l54qw9fdly',
        name: 'luiz',
        email: user.password,
        password: await hash('003003', 6),
        created_at: user.created_at,
        updated_at: new Date(),
      },
    })

    expect(userUpdate.name).toEqual('luiz')
    expect(await compare('003003', userUpdate.password)).toBeTruthy()
  })
})
