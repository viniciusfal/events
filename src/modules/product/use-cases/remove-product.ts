import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository'
import { ProductNotAFoundError } from './errors/product-not-a-found-error'

interface RemoveproductUsecaserequest {
  id: string
}

export class RemoveproductUsecase {
  constructor(private productsRepository: InMemoryProductsRepository) {}
  async execute({ id }: RemoveproductUsecaserequest): Promise<void> {
    const product = await this.productsRepository.findById(id)

    if (!product) {
      throw new ProductNotAFoundError()
    }

    await this.productsRepository.remove(id)
  }
}
