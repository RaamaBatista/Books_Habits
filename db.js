const {Sequelize} = require('sequelize')
const dotenv = require('dotenv').config()



const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST

const conexao = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: 'mysql', 
    host: dbHost,
})

module.exports = conexao