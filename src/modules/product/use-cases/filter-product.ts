import { Product } from '@prisma/client'
import { ProductsRepository } from '../repositories/products-repository'
import { ProductNotAFoundError } from './errors/product-not-a-found-error'

interface FilterProductUseCaseRequest {
  name: string
}

interface FilterProductUseCaseResponse {
  products: Product[] | null
}

export class FilterProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
  }: FilterProductUseCaseRequest): Promise<FilterProductUseCaseResponse> {
    const products = await this.productsRepository.filterByName(name)

    if (!products) {
      throw new ProductNotAFoundError()
    }

    return { products }
  }
}
