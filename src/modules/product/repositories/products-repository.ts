import { Prisma, Product } from '@prisma/client'

export interface ProductsRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>
  findById(id: string): Promise<Product | null>
  list(): Promise<Product[]>
  filterByName(name: string): Promise<Product[] | null>
  setProduct(product: Product): Promise<Product>
  remove(id: string): Promise<void>
}
