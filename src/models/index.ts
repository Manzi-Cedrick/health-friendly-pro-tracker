import { registerSchema } from 'swaggiffy'
import Record from './factory/record'
import Patient from './factory/patient'

registerSchema('Record', Record, { orm: 'sequelize' })
registerSchema('Patient', Patient, { orm: 'sequelize' })