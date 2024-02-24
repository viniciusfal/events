import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository'
import { FilterProductUseCase } from './filter-product'

let productsRepository: InMemoryProductsRepository
let sut: FilterProductUseCase

describe('filter product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new FilterProductUseCase(productsRepository)
  })

  it('should be able to filter products', async () => {
    await productsRepository.create({
      name: 'guarana antartica',
    })

    await productsRepository.create({
      name: 'GUarana jesus',
    })

    const { products } = await sut.execute({
      name: 'gua',
    })

    expect(products?.length).toBe(2)
  })
})
