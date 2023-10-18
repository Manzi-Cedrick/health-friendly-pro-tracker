import request from 'supertest'
import app, { server } from '../src/index'
import logger from '../src/common/logger'
const sequalize = require('../src/config/db')

describe('Get Endpoints', () => {
  beforeAll(async () => {
    await server
  })
  it('Should return 200', async () => {
    const res = await request(app).get('/patients')
    expect(res.statusCode).toEqual(200)
  })
  it('Should return 201', async () => {
    const res = await request(app).post('/patients').send({
      patient_name: 'John Doe',
      national_id: '1200580041805023',
      frequent_sickness: 'flu',
    })
    expect(res.statusCode).toEqual(201)
  })
  it('Should return 200', async () => {
    const patients = await request(app).get('/patients')
    const patientData = patients.body
    if (patients != null) {
      let _id = patientData.body[0]._id
      const res = await request(app).get(`/patients/${_id}`)
      expect(res.statusCode).toEqual(200)
    } else {
      logger.error('No ID found')
    }
  })
  it('Should return 200', async () => {
    const patients = await request(app).get('/patients')
    const patientData = patients.body
    let _id = patientData.body[0]._id
    const res = await request(app).put(`/patients/${_id}`).send({
      patient_name: 'John Doe',
      frequent_sickness: 'flu',
    })
    expect(res.statusCode).toEqual(200)
  })
  it('Should return 200', async () => {
    const patients = await request(app).get('/patients')
    const patientData = patients.body
    let _id = patientData.body[2]._id
    const res = await request(app).delete(`/patients/${_id}`)
    expect(res.statusCode).toEqual(200)
  })
  afterAll(() => {
    server.close()
    sequalize.close()
  })
})
