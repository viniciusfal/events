import { InMemoryUsersrepository } from '@/repositories/in-memory/in-memory-users-repository'
import {expect, it, describe, beforeEach} from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-errors'


let usersRepository: InMemoryUsersrepository
let sut: RegisterUseCase

describe('register Use Case', () => {
  beforeEach(()=> {
    usersRepository = new InMemoryUsersrepository()
    sut = new RegisterUseCase(usersRepository)
  })
 

  it('should be able to register', async ()=> {
    const {user} = await sut.execute({
      name: 'Luiz Henrique',
      email: 'luizinho@gmail.com',
      password: '123456',
    })
  
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user upon registration', async () => {
    const {user} = await sut.execute({
      name: 'Luiz Henrique',
      email: 'luizinho@gmail.com',
      password: '123456',
    })

    const isPasswordCorretlyHashed = await compare('123456', user.password)
    expect(isPasswordCorretlyHashed).toBe(true)
  })

  it('should not be to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'john doe',
      email,
      password: '123456'
    })

    await expect(() => sut.execute({
      name: 'john doe',
      email,
      password: '123456'
    })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
