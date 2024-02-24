export class UserIsNotAFoundError extends Error {
  constructor() {
    super('User is not a found')
  }
}
