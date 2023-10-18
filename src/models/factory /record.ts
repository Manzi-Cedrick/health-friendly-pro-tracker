import { DataTypes, Model } from 'sequelize'
import logger from '../../common/logger'
import Patient from './patient'
const sequelize = require('../../config/db')

class Record extends Model {} 

Record.init({
    _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    patient_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Patient,
            key: '_id'
        }
    },
    body_temperature: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    heart_rate: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Record',
    tableName: 'records',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
}) 
sequelize.sync()
    .catch((error:any) => {
        logger.error('Error creating tables:', error)
})
export default Record 