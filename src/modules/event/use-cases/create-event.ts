import { Event } from '@prisma/client'
import { InMemoryEventRepository } from '../repositories/in-memory/in-memory-event-repository'
import dayjs from 'dayjs'
import { InvalidDateError } from './erros/invalid-date-error'

interface CreateEventUseCaseRequest {
  event_name: string
  init_event: Date
  end_event: Date
}

interface CreateEventUseCaseResponse {
  event: Event
}
export class CreateEventUseCase {
  constructor(private eventsRepository: InMemoryEventRepository) {}

  async execute({
    event_name,
    init_event,
    end_event,
  }: CreateEventUseCaseRequest): Promise<CreateEventUseCaseResponse> {
    let statusCondicion: string

    if (
      dayjs(init_event).isBefore(dayjs()) &&
      dayjs(end_event).isAfter(dayjs())
    ) {
      statusCondicion = 'em andamento'
    } else if (dayjs(init_event).isAfter(dayjs())) {
      statusCondicion = 'em breve'
    } else {
      throw new InvalidDateError()
    }

    const event = await this.eventsRepository.create({
      event_name,
      init_event: dayjs(init_event).format('DD/MM/YYYY'),
      end_event: dayjs(end_event).format('DD/MM/YYYY'),
      status: statusCondicion,
      created_at: new Date(),
    })

    return { event }
  }
}
