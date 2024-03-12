import { Bar, Prisma } from '@prisma/client'

export interface BarsRepository {
  create(data: Prisma.BarCreateInput): Promise<Bar>
  list(): Promise<Bar[]>
  set(data: Bar): Promise<string>
  remove(id: string): Promise<void>
}
