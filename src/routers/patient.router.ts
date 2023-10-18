import express from 'express'

import * as patientController from '../controllers/patient.controller'
import { registerDefinition } from 'swaggiffy'

const router = express.Router() 

router.get('/', patientController.getAll) 
router.get('/:id', patientController.getById) 
router.post('/', patientController.create) 
router.put('/:id', patientController.update) 
router.delete('/:id', patientController.remove) 

registerDefinition(router, {
    tags: 'Patient',
    basePath: '/api/v1/patient',
    mappedSchema: 'Patient'
})
export { router as patientRouter }