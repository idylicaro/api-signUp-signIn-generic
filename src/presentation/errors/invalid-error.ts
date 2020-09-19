export class InvalidError extends Error {
  constructor () {
    super('Invalid')
    this.name = 'InvalidError'
  }
}
