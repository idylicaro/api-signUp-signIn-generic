import { Controller } from '../../../presentation/protocols'
import { LogPostgreRepository } from '../../../infra/db-postgresql/log/log-repository'
import { LogControllerDecorator } from '../../decorators/log'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logPostgreRepository = new LogPostgreRepository()
  return new LogControllerDecorator(controller, logPostgreRepository)
}
