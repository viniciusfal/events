export class InvalidCredentialsError extends Error {
  constructor() {
    super('invalid email or password')
  }
}
