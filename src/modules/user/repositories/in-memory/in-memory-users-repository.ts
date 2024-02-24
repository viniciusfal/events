import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users_repository";


export class InMemoryUsersrepository implements UsersRepository {
  public items:User[] = []
  
  async update(user: User) {
    const userIndex = this.items.findIndex((item) => item.id === user.id )

    this.items[userIndex] = user

    return user
  }

  async findById(id: string){
    const user = this.items.find((item) => item.id === id)

    if(!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string){
    const user = this.items.find((item) => item.email === email)

    if(!user) {
      return null
    }

    return user
  }

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