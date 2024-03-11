import { Event } from '@prisma/client'
import { InMemoryEventRepository } from '../repositories/in-memory/in-memory-event-repository'
import { EventNotAFoundError } from './erros/event-not-a-found-error'

interface ListEventsUseCaseResponse {
  events: Event[]
}

export class ListEventsUseCase {
  constructor(private eventsRepository: InMemoryEventRepository) {}

  async execute(): Promise<ListEventsUseCaseResponse> {
    const events = await this.eventsRepository.list()

    if (events.length === 0) {
      throw new EventNotAFoundError()
    }

    return { events }
  }
}
