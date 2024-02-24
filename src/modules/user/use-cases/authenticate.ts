import { UsersRepository } from "@/modules/user/repositories/users_repository";
import { User } from "@prisma/client";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository:UsersRepository) {}

  async execute({email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {

    const user = await this.usersRepository.findByEmail(email)

    if(!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatchhes = await compare(password, user.password)

    if(!doesPasswordMatchhes) {
      throw new InvalidCredentialsError()
    }

    return {user}
  }
}