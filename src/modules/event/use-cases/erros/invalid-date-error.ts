export class InvalidDateError extends Error {
  constructor() {
    super('the end event date is before of start event date')
  }
}
