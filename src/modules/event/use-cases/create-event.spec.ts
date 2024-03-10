import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryEventRepository } from '../repositories/in-memory/in-memory-event-repository'
import { CreateEventUseCase } from './create-event'

let eventsRepository: InMemoryEventRepository
let sut: CreateEventUseCase

describe('Create Event Use Case', () => {
  beforeEach(() => {
    eventsRepository = new InMemoryEventRepository()
    sut = new CreateEventUseCase(eventsRepository)

    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to create event', async () => {
    const { event } = await sut.execute({
      event_name: 'fan fest',
      init_event: new Date(2025, 2, 10),
      end_event: new Date(2025, 2, 11),
    })
    expect(event.id).toEqual(expect.any(String))
  })

  it('should be able status dinamically', async () => {
    vi.setSystemTime(new Date(2024, 1, 4))

    const event1 = await sut.execute({
      event_name: 'fan fest',
      init_event: new Date(2024, 1, 6),
      end_event: new Date(2024, 1, 10),
    })
    expect(event1.event.status).toEqual('em breve')

    vi.setSystemTime(new Date(2024, 1, 8))

    const event2 = await sut.execute({
      event_name: 'fan fest',
      init_event: new Date(2024, 1, 6),
      end_event: new Date(2024, 1, 10),
    })

    expect(event2.event.status).toEqual('em andamento')

    vi.setSystemTime(new Date(2024, 1, 11))

    const event3 = await sut.execute({
      event_name: 'fan fest',
      init_event: new Date(2024, 1, 6),
      end_event: new Date(2024, 1, 10),
    })

    expect(event3.event.status).toEqual('encerrado')
  })
})
