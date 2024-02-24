import { Product } from '@prisma/client'
import { ProductsRepository } from '../repositories/products-repository'
import { ProductNotAFoundError } from './errors/product-not-a-found-error'

interface ListProductUseCaseresponse {
  products: Product[]
}

export class ListProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(): Promise<ListProductUseCaseresponse> {
    const products = await this.productsRepository.list()

    if (products.length === 0) {
      throw new ProductNotAFoundError()
    }

    return { products }
  }
}
