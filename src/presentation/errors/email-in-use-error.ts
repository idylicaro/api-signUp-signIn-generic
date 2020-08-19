export class EmailInUseError extends Error {
  constructor () {
    super('The received email in already in use')
    this.name = 'EmailInUseError'
  }
}
