import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository'
import { RemoveproductUsecase } from './remove-product'
import { ProductNotAFoundError } from './errors/product-not-a-found-error'

let productsRepository: InMemoryProductsRepository
let sut: RemoveproductUsecase

describe('remove product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new RemoveproductUsecase(productsRepository)
  })

  it('should be able to remove product', async () => {
    const product = await productsRepository.create({
      name: 'guarana antartica',
    })

    await sut.execute({
      id: product.id,
    })

    const products = await productsRepository.list()

    expect(products.length).toBe(0)
  })
  it('should not be able to remove prouct case product is nota found', async () => {
    await expect(() =>
      sut.execute({
        id: '',
      }),
    ).rejects.toBeInstanceOf(ProductNotAFoundError)
  })
})
