import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users_repository";


export class InMemoryUsersrepository implements UsersRepository {
  public items:User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'clstspzos000008l54qw9fdly',
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.items.push(user)
    
    return user
  }

}