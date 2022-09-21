import { Router, Request, Response } from 'express'
import leads_routes from './api/leads'

const routes = Router()

routes.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to the image processing API')
})

routes.use('/resize', leads_routes)

export default routes
