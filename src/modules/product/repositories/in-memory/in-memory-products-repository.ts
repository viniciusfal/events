import { Prisma, Product } from '@prisma/client'
import { ProductsRepository } from '../products-repository'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async create(data: Prisma.ProductCreateInput) {
    const product = {
      id: 'clszl2hqv000109l9b9764rrz',
      name: data.name,
    }

    this.items.push(product)

    return product
  }

  async findById(id: string) {
    const product = this.items.find((item) => item.id === id)

    if (!product) {
      return null
    }

    return product
  }

  async list() {
    const products = this.items.map((item) => {
      return item
    })

    return products
  }

  async filterByName(name: string) {
    const product = this.items.filter((item) => {
      return item.name.toLocaleLowerCase().includes(name.toLowerCase())
    })

    if (!product) {
      return null
    }

    return product
  }

  async setProduct(product: Product) {
    const productIndex = this.items.findIndex((item) => item.id)

    this.items[productIndex] = product

    return product
  }

  async remove(id: string) {
    const productIndex = this.items.findIndex((item) => item.id)

    this.items.splice(productIndex, 1)
  }
}
