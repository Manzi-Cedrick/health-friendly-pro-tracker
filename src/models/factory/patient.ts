import { DataTypes, Model } from 'sequelize' 
import logger from '../../common/logger'
const sequelize = require('../../config/db')

class Patient extends Model {} 

Patient.init({
    _id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    patient_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    national_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[0-9]{16}$/,
            isExactly16Numbers(value: string) {
                if (value.length !== 16) {
                    throw new Error('ID must be exactly 16 numbers')
                }
            }
        },
        get() {
            const rawValue = this.getDataValue('national_id')
            if (rawValue && rawValue.length === 16) {
                return `${rawValue.charAt(0)} ${rawValue.slice(1, 5)} ${rawValue.slice(5, 9)} ${rawValue.slice(9, 13)} ${rawValue.slice(13)}`
            }
            return rawValue
        },
        defaultValue: '0000000000000000',
    },
    frequent_sickness: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Patient',
    tableName: 'patients',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    }
) 
sequelize.sync()
    .catch((error:any) => {
        logger.error('Error creating tables:', error)
})
export default Patient 