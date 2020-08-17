import { LogErrorRepository } from '../../../data/protocols/db/log/log-error-respository'
import knex from '../knex'

export class LogPostgreRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    await knex('errors').insert({
      stack,
      date: new Date()
    })
  }
}
