import { InMemoryUsersrepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { UserUpdateUseCase } from "./user-update";
import { hash } from "bcryptjs";

let userRepository: InMemoryUsersrepository
let sut: UserUpdateUseCase

describe('User Update Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersrepository()
    sut =  new UserUpdateUseCase(userRepository)
  })

  it('should be able to update user', async () =>  {
    await userRepository.create({
      name: 'john doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
      created_at: new Date(),
      updated_at: ''
    })
    const { user } = await sut.execute({
      name: 'Luiz Henrique',
      password: '123456',
      id: 'clstspzos000008l54qw9fdly'
    })

    console.log(user)
    expect(user).toBeDefined()
    expect(user.name).toBe('Luiz Henrique');
  })
})