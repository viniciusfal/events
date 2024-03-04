import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository'
import { SetProductUseCase } from './set-product'
import { ProductNotAFoundError } from './errors/product-not-a-found-error'

let productsRepository: InMemoryProductsRepository
let sut: SetProductUseCase

describe('create product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new SetProductUseCase(productsRepository)
  })

  it('should be able to set product', async () => {
    await productsRepository.create({
      name: 'coca cola',
    })

    const { productUpdate } = await sut.execute({
      data: {
        id: 'clszl2hqv000109l9b9764rrz',
        name: 'guarana antartica',
      },
    })

    expect(productUpdate).toEqual('guarana antartica')
  })

  it('should not be able to set product case id is not a found', async () => {
    await expect(() =>
      sut.execute({
        data: {
          id: '',
          name: 'coca cola',
        },
      }),
    ).rejects.toBeInstanceOf(ProductNotAFoundError)
  })
})
