import supertest from 'supertest'
import app from '../../index'

const request = supertest(app)
describe('Testing the resize image endpoint', () => {
  it('Using the endpoint without providing the name parameter returns 400', async () => {
    await request.get('/resize').expect(400)
  })

  it('Using the endpoint with a non-existent image returns 404', async () => {
    await request.get('/resize?name=Ahmad').expect(404)
  })

  it('Using the endpoint with no width for the image returns 400', async () => {
    await request.get('/resize?name=Amr').expect(400)
  })

  it('Using the endpoint with no width for the image returns 400', async () => {
    await request.get('/resize?name=Amr&height=100').expect(400)
  })

  it('Using the endpoint with no height for the image returns 400', async () => {
    await request.get('/resize?name=Amr').expect(400)
  })

  it('Using the endpoint with no height for the image returns 400', async () => {
    await request.get('/resize?name=Amr&width=100').expect(400)
  })

  it('Using the endpoint with not number width value for the image returns 400', async () => {
    await request.get('/resize?name=Amr&width=abc&height=100').expect(400)
  })

  it('Using the endpoint with not number height value for the image returns 400', async () => {
    await request.get('/resize?name=Amr&width=100&height=abc').expect(400)
  })

  it('Using the endpoint with wrong number width value for the image returns 400', async () => {
    await request.get('/resize?name=Amr&width=-2&height=100').expect(400)
  })

  it('Using the endpoint with wrong number height value for the image returns 400', async () => {
    await request.get('/resize?name=Amr&width=100&height=-2').expect(400)
  })

  it('Using the endpoint with a valid image name but does not have a file returns 404', async () => {
    await request.get('/resize?name=Magdy&width=100&height=100').expect(404)
  })

  it('Using the endpoint with a valid image returns 200', async () => {
    await request.get('/resize?name=Amr&width=100&height=100').expect(200)
  })
})
