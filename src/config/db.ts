const { Sequelize } = require('sequelize') 
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env 
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'sqlite',
    storage: './src/db/database.sqlite',
    logging: true,
}) 

module.exports = sequelize 