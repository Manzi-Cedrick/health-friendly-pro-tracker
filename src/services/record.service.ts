import { ServiceAPIResponse } from '../../types/service-response'
import logger from '../common/logger'
import Record from '../models/factory/record'
import { IRecord } from '../models/types'

const getAll = async () : Promise<ServiceAPIResponse<Record[]>> => {
    const records = await Record.findAll()
    if (!records) {
        return {
            statusCode: 404,
            body: [],
            message: 'No records found',
        }
    }
    return {
        statusCode: 200,
        body: records,
        message: 'Records found',
    }
}
const getById = async (id: string) : Promise<ServiceAPIResponse<Record>> => {
    const record = await Record.findByPk(id)
    if (!record) {
        return {
            statusCode: 404,
            body: {} as Record,
            message: 'No record found',
        } 
    }
    return {
        statusCode: 200,
        body: record,
        message: 'Record found',
    } 
}
const create = async (patient: IRecord) : Promise<ServiceAPIResponse<Record>> => {
    try {
        const newRecord = await Record.create({
            patient_id: patient.patient_id,
            body_temperature: patient.body_temperature,
            heart_rate: patient.heart_rate,
        })
        return {
            statusCode: 201,
            body: newRecord,
            message: 'Record created',
        }
    } catch (error: any) {
        logger.error(error.message)
        let statusCode = 404
        if (error.name === 'SequelizeValidationError') {
            statusCode = 422
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            statusCode = 409
        } else {
            statusCode = 500
        }
        return {
            statusCode: statusCode,
            body: {} as Record,
            message: 'Error creating record: ' + error.message,
        }
    }
}
const update = async (id: string, patient: IRecord) : Promise<ServiceAPIResponse<Record>> => {
    try {
        const updatedRecord = await Record.update({
            patient_id: patient.patient_id,
            body_temperature: patient.body_temperature,
            heart_rate: patient.heart_rate,
        }, {
            where: {
                _id: id,
            },
            returning: true,
        })
        return {
            statusCode: 200,
            body: updatedRecord[1][0],
            message: 'Record updated',
        }     
    } catch (error:any) {
        logger.error(error.message) 
        return {
            statusCode: 500,
            body: {} as Record,
            message: 'Error updating record: ' + error.message,
        }
    }
}
const remove = async (id: string) : Promise<ServiceAPIResponse<Record>> => {
    try {
        // eslint-disable-next-line no-unused-vars
        const deletedPatient = await Record.destroy({
            where: {
                _id: id,
            },
        })
        return {
            statusCode: 200,
            body: {} as Record,
            message: 'Patient deleted',
        }   
    } catch (error:any) {
        logger.error(error.message)
        return {
            statusCode: 500,
            body: {} as Record,
            message: 'Error deleting patient: ' + error.message,
        }
    }        
}
export {getAll, getById, create, update, remove}