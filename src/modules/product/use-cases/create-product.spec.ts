import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository'
import { CreateProductUseCase } from './create-product'

let productsRepository: InMemoryProductsRepository
let sut: CreateProductUseCase

describe('create product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(productsRepository)
  })

  it('should be able to create product', async () => {
    const { product } = await sut.execute({
      name: 'guarana antartica',
    })

    expect(product.id).toEqual(expect.any(String))
  })
})
