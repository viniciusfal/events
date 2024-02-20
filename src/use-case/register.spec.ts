import { InMemoryUsersrepository } from '@/repositories/in-memory/in-memory-users-repository'
import {expect, it, describe} from 'vitest'
import { RegisterUseCase } from './register'


describe('register Use Case', () => {
  const usersRepository = new InMemoryUsersrepository()
  const sut = new RegisterUseCase(usersRepository)

  it('should be able to register', async ()=> {
    const {user} = await sut.execute({
      name: 'Luiz Henrique',
      email: 'luizinho@gmail.com',
      password: '123456',
    })
  
    expect(user.id).toEqual(expect.any(String))
  })
})
