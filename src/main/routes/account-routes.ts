import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAccountConfirmationController } from '../factories/controllers/account-confirmation/account-confirmation-controller-factory'

export default (router: Router): void => {
  router.put('/account/confirm', adaptRoute(makeAccountConfirmationController()))
}
