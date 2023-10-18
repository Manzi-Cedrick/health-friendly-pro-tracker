import express from 'express'

import * as recordController from '../controllers/record.controller'
import { registerDefinition } from 'swaggiffy'

const router = express.Router() 

router.get('/', recordController.getAll) 
router.get('/:id', recordController.getById) 
router.post('/', recordController.create) 
router.put('/:id', recordController.update) 
router.delete('/:id', recordController.remove) 

registerDefinition(router, {
    tags: 'Record',
    basePath: '/api/v1/record',
    mappedSchema: 'Record'
})
export { router as recordRouter }