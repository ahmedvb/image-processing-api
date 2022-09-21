import { Router, Request, Response } from 'express'
import path from 'path'
import leads from '../../Utils/_DATA'
import { existsSync } from 'fs'
import sharp from 'sharp'

const leads_routes = Router()

leads_routes.get('/', (req: Request, res: Response) => {
  const name = req.query.name as string
  const width: string = req.query.width as string
  const height: string = req.query.height as string
  const imgLocation = path.resolve('./') + `/assets/original/${name}.jpg`
  let imgLocation_resized = ''
  const lead = leads.includes(name)
  // If the name query wasn't provided return and end function
  if (name === undefined) {
    return res
      .status(400)
      .send('Bad request, query parameter (name) is required!...')
  }
  // If the name doesn't exist in the array return and end function
  if (lead === false) {
    return res
      .status(404)
      .send('Resource not found, this image does not exist!')
  }
  if (width === undefined) {
    return res
      .status(400)
      .send('Bad request, query parameter (width) is required!')
  }
  if (isNaN(Number(width))) {
    return res
      .status(400)
      .send('Bad request, query parameter (width) is not a number!')
  }
  if (Number(width) <= 0) {
    return res
      .status(400)
      .send('Bad request, query parameter (width) is a wrong value')
  }
  if (height === undefined) {
    return res
      .status(400)
      .send('Bad request, query parameter (height) is required!')
  }
  if (isNaN(Number(height))) {
    return res
      .status(400)
      .send('Bad request, query parameter (height) is not a number!')
  }
  if (Number(height) <= 0) {
    return res
      .status(400)
      .send('Bad request, query parameter (height) is a wrong value')
  }
  // If the name exists in the array but the photo doesn't exist return and end function
  if (existsSync(imgLocation) === false) {
    return res
      .status(404)
      .send('Resource not found, this name does not have an image!')
  }
  imgLocation_resized =
    path.resolve('./') + `/assets/resized/${name}_${width}_${height}.jpg`
  if (existsSync(imgLocation_resized)) {
    //send the resized file
    res.sendFile(imgLocation_resized)
    return
  }
  // Otherwise return the resized image
  sharp(imgLocation)
    .resize({ width: Number(width), height: Number(height) })
    .toFile(imgLocation_resized)
    .then(() => {
      res.sendFile(imgLocation_resized)
    })
    .catch(() => {
      return res.status(500).send('server error')
    })
})

export default leads_routes
