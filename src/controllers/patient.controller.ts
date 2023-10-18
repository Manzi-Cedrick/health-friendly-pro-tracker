import logger from '../common/logger' 
import * as patientService from '../services/patient.service' 
import { Request, Response } from 'express' 

const getAll = async (req:Request, res:Response) => {
    try {
        const data = await patientService.getAll() 
        res.status(data.statusCode).send(data) 
        console.log(data.body[2].dataValues['_id'])
    }
    catch (e:any) {
        logger.error(e.message) 
        res.status(500).send(e.message) 
    }
}
const getById = async (req:Request, res:Response) => {
    const data = await patientService.getById(req.params.id) 
    res.status(data.statusCode).json(data) 
}
const create = async (req:Request, res:Response) => {
    const data = await patientService.create(req.body) 
    res.status(data.statusCode).json(data) 
}
const update = async (req:Request, res:Response) => {
    const data = await patientService.update(req.params.id, req.body) 
    res.status(data.statusCode).json(data) 
}
const remove = async (req:Request, res:Response) => {
    const data = await patientService.remove(req.params.id) 
    res.status(data.statusCode).json(data) 
}
export {getAll, getById, create, update, remove}