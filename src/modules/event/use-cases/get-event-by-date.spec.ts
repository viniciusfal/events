import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryEventRepository } from '../repositories/in-memory/in-memory-event-repository'
import { GetEventByDateUseCase } from './get-event-by-date'

let eventsRepository: InMemoryEventRepository
let sut: GetEventByDateUseCase

describe('list event Use Case', () => {
  beforeEach(() => {
    eventsRepository = new InMemoryEventRepository()
    sut = new GetEventByDateUseCase(eventsRepository)
  })

  it('should be able to list event by Date', async () => {
    await eventsRepository.create({
      event_name: 'event 1',
      init_event: new Date(2024, 3, 10),
      end_event: new Date(2024, 4, 9),
      status: '',
      created_at: new Date(),
    })

    await eventsRepository.create({
      event_name: 'event 2',
      init_event: new Date(2024, 2, 10),
      end_event: new Date(2024, 3, 9),
      status: '',
      created_at: new Date(),
    })

    const { events } = await sut.execute({
      mounth: 2,
    })

    console.log(events)
    expect(events.length).toBe(1)
  })
  it('should not be ')
})
