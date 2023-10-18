import request from 'supertest'
import app, { server } from '../src/index'
import logger from '../src/common/logger'
const sequalize = require('../src/config/db')

describe('Describe Endpoints', () => {
  beforeAll(async () => {
    await server
  })
  it('Should return 200', async () => {
    const res = await request(app).get('/records')
    expect(res.statusCode).toEqual(200)
  })
  it('Should return 201', async () => {
    const patient = await request(app).get('/patients')
    const patientData = patient.body
    let _id = patientData.body[0]._id
    const res = await request(app).post('/records').send({
      patient_id: _id,
      body_temperature: 32.4,
      heart_rate: 42,
    })
    expect(res.statusCode).toEqual(201)
  })
  it('Should return 200', async () => {
    const records = await request(app).get('/records')
    const recordData = records.body
    if (records != null) {
      let _id = recordData.body[0]._id
      const res = await request(app).get(`/records/${_id}`)
      expect(res.statusCode).toEqual(200)
    } else {
      logger.error('No ID found')
    }
  })
  it('Should return 200', async () => {
    const records = await request(app).get('/records')
    const recordData = records.body
    let _id = recordData.body[0]._id
    const res = await request(app).put(`/records/${_id}`).send({
        body_temperature: 52.4,
        heart_rate: 22,
    })
    expect(res.statusCode).toEqual(200)
  })
  it('Should return 200', async () => {
    const records = await request(app).get('/records')
    const recordData = records.body
    let _id = recordData.body[2]._id
    const res = await request(app).delete(`/records/${_id}`)
    expect(res.statusCode).toEqual(200)
  })
  afterAll(() => {
    server.close()
    sequalize.close()
  })
})
