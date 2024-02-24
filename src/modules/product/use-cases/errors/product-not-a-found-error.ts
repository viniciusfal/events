export class ProductNotAFoundError extends Error {
  constructor() {
    super('Product(s) not a found')
  }
}
