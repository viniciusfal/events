import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository'
import { ListProductUseCase } from './list-product'
import { ProductNotAFoundError } from './errors/product-not-a-found-error'

let productsRepository: InMemoryProductsRepository
let sut: ListProductUseCase

describe('list product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new ListProductUseCase(productsRepository)
  })

  it('should be able to list all products', async () => {
    await productsRepository.create({
      name: 'refrigerante lata',
    })

    await productsRepository.create({
      name: 'Antartica lata',
    })

    const { products } = await sut.execute()

    expect(products.length).toBe(2)
  })

  it('should be able to talk when the list to be empty ', async () => {
    await expect(() => sut.execute()).rejects.toBeInstanceOf(
      ProductNotAFoundError,
    )
  })
})
