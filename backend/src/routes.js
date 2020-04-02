import { Router } from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import PersonController from './app/controllers/PersonController'
import DeliveryController from './app/controllers/DeliveryController'
import PermissionController from './app/controllers/PermissionController'
// import CheckinController from './app/controllers/CheckinController'
// import HelpOrderController from './app/controllers/HelpOrderController'
import AuthMiddleware from './app/middlewares/auth'
import PermissionMiddleware from './app/middlewares/permission'

const routes = new Router()

routes.post('/sessions', SessionController.store)

routes.use(AuthMiddleware)
routes.use(PermissionMiddleware)
routes.post('/users', UserController.store)

routes.get('/permissions', PermissionController.index)
// routes.put('/users', UserController.update)

routes.post('/person', PersonController.store)
routes.get('/people', PersonController.index)

routes.post('/delivery', DeliveryController.store)
routes.get('/deliveries', DeliveryController.index)
// routes.get('/programs', ProgramController.index)
// routes.put('/programs/:id', ProgramController.update)
// routes.delete('/programs/:id', ProgramController.delete)


export default routes
