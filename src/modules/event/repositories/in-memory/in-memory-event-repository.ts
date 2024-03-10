import { Prisma, Event } from '@prisma/client'
import { eventsRepository } from '../events-repository'

export class InMemoryEventRepository implements eventsRepository {
  public items: Event[] = []

  async create(data: Prisma.EventCreateInput) {
    const event = {
      id: 'cltdr2qba000108l875clglfp',
      event_name: data.event_name,
      init_event: new Date(data.init_event),
      end_event: new Date(data.end_event),
      status: data.status,
      created_at: new Date(data.created_at),
    }

    this.items.push(event)
    return event
  }

  async list() {
    const events = this.items.map((item) => item)

    return events
  }

  async findById(id: string) {
    const event = this.items.find((item) => item.id === id)

    if (!event) {
      return null
    }

    return event
  }

  async findByDate(mounth: number) {
    const events = this.items.filter(
      (item) => item.init_event.getMonth() === mounth,
    )

    if (!events) {
      return null
    }

    return events
  }

  async set(data: Event) {
    const eventIndex = this.items.findIndex((item) => item.id === data.id)

    this.items[eventIndex] = data

    const events = this.items[eventIndex]

    return events
  }
}
