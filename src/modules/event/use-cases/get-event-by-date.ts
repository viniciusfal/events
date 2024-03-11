import { Event } from '@prisma/client'
import { InMemoryEventRepository } from '../repositories/in-memory/in-memory-event-repository'
import { EventNotAFoundError } from './erros/event-not-a-found-error'

interface GetEventByDateUseCaseRequest {
  mounth: number
}

interface GetEventByDateUseCaseResponse {
  events: Event[]
}

export class GetEventByDateUseCase {
  constructor(private eventsRepository: InMemoryEventRepository) {}

  async execute({
    mounth,
  }: GetEventByDateUseCaseRequest): Promise<GetEventByDateUseCaseResponse> {
    const events = await this.eventsRepository.findByDate(mounth)

    if (!events) {
      throw new EventNotAFoundError()
    }

    return { events }
  }
}
