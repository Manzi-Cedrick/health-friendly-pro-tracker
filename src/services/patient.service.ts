import { ServiceAPIResponse } from '../../types/service-response'
import logger from '../common/logger'
import Patient from '../models/factory/patient'
import { IPatient } from '../models/types'

const getAll = async () : Promise<ServiceAPIResponse<Patient[]>> => {
    const patients = await Patient.findAll()
    if (!patients) {
        return {
            statusCode: 404,
            body: [],
            message: 'No patients found',
        }
    }
    return {
        statusCode: 200,
        body: patients,
        message: 'Patients found',
    }
}
const getById = async (id: string) : Promise<ServiceAPIResponse<Patient>> => {
    const patient = await Patient.findByPk(id)
    if (!patient) {
        return {
            statusCode: 404,
            body: {} as Patient,
            message: 'No patient found',
        } 
    }
    return {
        statusCode: 200,
        body: patient,
        message: 'Patient found',
    } 
}
const create = async (patient: IPatient) : Promise<ServiceAPIResponse<Patient>> => {
    try {
        const newPatient = await Patient.create({
            patient_name: patient.patient_name,
            national_id: patient.national_id,
            frequent_sickness: patient.frequent_sickness,
        })
        return {
            statusCode: 201,
            body: newPatient,
            message: 'Patient created',
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
            body: {} as Patient,
            message: 'Error creating patient: ' + error.message,
        }
    }
}
const update = async (id: string, patient: IPatient) : Promise<ServiceAPIResponse<Patient>> => {
    try {
        const updatedPatient = await Patient.update({
            patient_name: patient.patient_name,
            national_id: patient.national_id,
            frequent_sickness: patient.frequent_sickness,
        }, {
            where: {
                _id: id,
            },
            returning: true,
        })
        return {
            statusCode: 200,
            body: updatedPatient[1][0],
            message: 'Patient updated',
        }     
    } catch (error:any) {
        logger.error(error.message) 
        return {
            statusCode: 500,
            body: {} as Patient,
            message: 'Error updating patient: ' + error.message,
        }
    }
}
const remove = async (id: string) : Promise<ServiceAPIResponse<Patient>> => {
    try {
        // eslint-disable-next-line no-unused-vars
        const deletedPatient = await Patient.destroy({
            where: {
                _id: id,
            },
        })
        return {
            statusCode: 200,
            body: {} as Patient,
            message: 'Patient deleted',
        }   
    } catch (error:any) {
        logger.error(error.message)
        return {
            statusCode: 500,
            body: {} as Patient,
            message: 'Error deleting patient: ' + error.message,
        }
    }        
}
export {getAll, getById, create, update, remove}