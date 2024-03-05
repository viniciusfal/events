import { Event, Prisma } from '@prisma/client'

export interface eventsRepository {
  create(data: Prisma.EventCreateInput): Promise<Event>
  list(): Promise<Event[]>
  findById(id: string): Promise<Event | null>
  findByDate(mounth: number): Promise<Event[] | null>
  set(data: Event): Promise<Event>
}
