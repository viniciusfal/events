import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryEventRepository } from '../repositories/in-memory/in-memory-event-repository'
import { ListEventsUseCase } from './list-events'
import { EventNotAFoundError } from './erros/event-not-a-found-error'

let eventsRepository: InMemoryEventRepository
let sut: ListEventsUseCase

describe('list product Use Case', () => {
  beforeEach(() => {
    eventsRepository = new InMemoryEventRepository()
    sut = new ListEventsUseCase(eventsRepository)
  })

  it('should be able to list all events', async () => {
    await eventsRepository.create({
      event_name: 'event 1',
      init_event: new Date(2024, 2, 10),
      end_event: new Date(2024, 3, 9),
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

    const { events } = await sut.execute()

    expect(events.length).toBe(2)
  })
  it('should be able to talk when the list to be empty ', async () => {
    await expect(() => sut.execute()).rejects.toBeInstanceOf(
      EventNotAFoundError,
    )
  })
})
