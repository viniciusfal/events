export class UserAlreadyExistsError  extends Error{
  constructor(){
    super('This email already exists')
  }
}