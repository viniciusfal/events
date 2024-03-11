export class EventNotAFoundError extends Error {
  constructor() {
    super('Events is not a found')
  }
}
