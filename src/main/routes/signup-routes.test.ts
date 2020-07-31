import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .then(resolve => {
        expect(resolve.status).toBe(200)
      })
  }, 10000)
})
