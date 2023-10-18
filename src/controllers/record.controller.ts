import logger from '../common/logger' 
import * as recordService from '../services/record.service' 
import { Request, Response } from 'express' 

const getAll = async (req:Request, res:Response) => {
    try {
        const data = await recordService.getAll() 
        res.status(data.statusCode).send(data) 
    }
    catch (e:any) {
        logger.error(e.message) 
        res.status(500).send(e.message) 
    }
}
const getById = async (req:Request, res:Response) => {
    const data = await recordService.getById(req.params.id) 
    res.status(data.statusCode).json(data) 
}
const create = async (req:Request, res:Response) => {
    const data = await recordService.create(req.body) 
    res.status(data.statusCode).json(data) 
}
const update = async (req:Request, res:Response) => {
    const data = await recordService.update(req.params.id, req.body) 
    res.status(data.statusCode).json(data) 
}
const remove = async (req:Request, res:Response) => {
    const data = await recordService.remove(req.params.id) 
    res.status(data.statusCode).json(data) 
}
export {getAll, getById, create, update, remove}