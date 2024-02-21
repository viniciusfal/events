import { InMemoryUsersrepository } from "@/repositories/in-memory/in-memory-users-repository";
import { User } from "@prisma/client";
import { UserIsNotAFoundError } from "./errors/user-is-not-a-found-error";

interface UserUpdateRequest{
  id: string
  name?: string
  password?: string
}

interface UserUpdateResponse {
  user: User
}

export class UserUpdateUseCase {
  constructor(private usersRepository: InMemoryUsersrepository){}

  async execute({id, name, password}:UserUpdateRequest): Promise<UserUpdateResponse>{
    const user = await this.usersRepository.findById(id)

    if(!user) {
      throw new UserIsNotAFoundError()
    }

     await this.usersRepository.update({
      name,
      password,
    })
    
    return {
      user,
    }
  }
}