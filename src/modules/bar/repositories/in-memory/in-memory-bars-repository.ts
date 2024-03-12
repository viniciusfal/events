import { Bar, Prisma } from '@prisma/client'
import { BarsRepository } from '../bars-repository'

export class InMemoryBarsRepository implements BarsRepository {
  public items: Bar[] = []

  async create(data: Prisma.BarCreateInput) {
    const coding = () => {
      const result = ''
      for (let i = 0; i < 4; i++) {
        Math.floor(Math.random() * 10)
      }
      return result
    }

    const bar = {
      id: 'cltnspr0u000108l8c7eq78yz',
      name: data.name,
      code: coding(),
      event_id: 'cltdr2qba000108l875clglfp',
    }

    this.items.push(bar)
    return bar
  }

  async list() {
    const bars = this.items.map((item) => item)

    return bars
  }

  async set(data: Bar) {
    const barIndex = this.items.findIndex((item) => item.id === data.id)

    this.items[barIndex].name = data.name

    const barName = this.items[barIndex].name

    return barName
  }

  async remove(id: string): Promise<void> {
    const barIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(barIndex, 1)
  }
}
