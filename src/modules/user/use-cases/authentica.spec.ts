import { InMemoryUsersrepository } from '@/modules/user/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersrepository
let sut: AuthenticateUseCase

describe('Authenticate Use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersrepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able authernticate user', async () => {
    await usersRepository.create({
      name: 'john doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
      updated_at: '',
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await usersRepository.create({
      name: 'john doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
      updated_at: '',
    })

    await expect(() =>
      sut.execute({
        email: 'marydoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'john doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
      updated_at: '',
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '000000',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
