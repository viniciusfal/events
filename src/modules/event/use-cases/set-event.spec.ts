import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryEventRepository } from '../repositories/in-memory/in-memory-event-repository'
import { SetEventUseCase } from './set-event'

let eventsRepository: InMemoryEventRepository
let sut: SetEventUseCase

describe('create product Use Case', () => {
  beforeEach(() => {
    eventsRepository = new InMemoryEventRepository()
    sut = new SetEventUseCase(eventsRepository)
  })

  it('should be able to set event', async () => {
    const event = await eventsRepository.create({
      event_name: 'event-01',
      init_event: new Date('2024, 5, 1'),
      end_event: new Date('2024, 5, 6'),
      status: '',
      created_at: new Date(),
    })

    const { eventUpdate } = await sut.execute({
      data: {
        ...event,
        id: 'cltdr2qba000108l875clglfp',
        event_name: 'event-007',
        end_event: new Date('2024, 5, 10'),
      },
    })
    console.log(eventUpdate)
    expect(eventUpdate.event_name).toEqual('event-007')
    expect(eventUpdate.end_event).toEqual(new Date('2024, 5, 10'))
  })
})
