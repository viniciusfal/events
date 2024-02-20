import { InMemoryUsersrepository } from "@/repositories/in-memory/in-memory-users-repository";
import { User } from "@prisma/client";

interface CreateUseCaseRequest {
  name: string
  email: string
  password: string
}

interface CreateUseCaseResponse {
  user: User
}
export class RegisterUseCase {
  constructor(private usersrepository: InMemoryUsersrepository){}

  async execute({name, email, password}: CreateUseCaseRequest): Promise<CreateUseCaseResponse> {
    const user = await this.usersrepository.create({
      name,
      password,
      email,
      updated_at: ''
    })

    return {user}
  }
}