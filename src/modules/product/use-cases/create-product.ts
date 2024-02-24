import { Product } from '@prisma/client'
import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository'

interface CreateProductUseCaseRequest {
  name: string
}

interface CreateProductUseCaseResponse {
  product: Product
}

export class CreateProductUseCase {
  constructor(private productsRepository: InMemoryProductsRepository) {}

  async execute({
    name,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const product = await this.productsRepository.create({
      name,
    })

    return {
      product,
    }
  }
}
