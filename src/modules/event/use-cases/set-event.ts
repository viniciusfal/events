import { Event } from '@prisma/client'
import { InMemoryEventRepository } from '../repositories/in-memory/in-memory-event-repository'
import { EventNotAFoundError } from './erros/event-not-a-found-error'

interface SetEventUseCaseRequest {
  data: Event
}

interface SetEventUseCaseResponse {
  eventUpdate: Event
}
export class SetEventUseCase {
  constructor(private eventsRepository: InMemoryEventRepository) {}

  async execute({
    data,
  }: SetEventUseCaseRequest): Promise<SetEventUseCaseResponse> {
    const event = await this.eventsRepository.findById(data.id)

    if (!event) {
      throw new EventNotAFoundError()
    }

    const eventUpdate = await this.eventsRepository.set(data)

    return { eventUpdate }
  }
}
