import { Product } from '@prisma/client'
import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository'
import { ProductNotAFoundError } from './errors/product-not-a-found-error'

interface SetProductUseCaseRequest {
  data: Product
}

interface SetProductUseCaseResponse {
  productUpdate: string
}

export class SetProductUseCase {
  constructor(private productsRepository: InMemoryProductsRepository) {}
  async execute({
    data,
  }: SetProductUseCaseRequest): Promise<SetProductUseCaseResponse> {
    const product = await this.productsRepository.findById(data.id)

    if (!product) {
      throw new ProductNotAFoundError()
    }

    const productUpdate = await this.productsRepository.setProduct(data)

    return { productUpdate }
  }
}
