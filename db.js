const {Sequelize} = require('sequelize')
const dotenv = require('dotenv').config()

<<<<<<< HEAD
=======


>>>>>>> 2435520b8b82f2b22053827e4451ca826641ee40
const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST

<<<<<<< HEAD
const conexao = new Sequelize(dbName,dbUser,dbPassword,{
    dialect: 'mysql',
    host: dbHost,
    
 });
 

module.exports = conexao ;
=======
const conexao = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: 'mysql', 
    host: dbHost,
})

module.exports = conexao
>>>>>>> 2435520b8b82f2b22053827e4451ca826641ee40
