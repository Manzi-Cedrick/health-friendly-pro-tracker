const { Sequelize } = require('sequelize') 
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/db/database.sqlite',
    logging: true,
}) 

module.exports = sequelize 