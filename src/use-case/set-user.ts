import { InMemoryUsersrepository } from "@/repositories/in-memory/in-memory-users-repository"
import { User } from "@prisma/client"
import { compare, hash } from "bcryptjs"

interface SetUserUseCaseRequest {
  data: User
}

interface SetUserUseCaseResponse {
  userUpdate: User
}

export class SetUserUseCase {

  constructor(private usersRepository: InMemoryUsersrepository){}

  async execute({
    data
  }: SetUserUseCaseRequest):  Promise<SetUserUseCaseResponse>{

    const user = await this.usersRepository.findById(data.id)

    if(!user) {
      throw new Error('error')
    }

    const isComparePass = await compare(data.password, user.password)

    if(isComparePass === false) {
      const password_hash = await hash(data.password, 6)
      data.password = password_hash
    }
    
     const userUpdate =  await this.usersRepository.update(data)
      
      return {
        userUpdate,
      }
  }

   
}