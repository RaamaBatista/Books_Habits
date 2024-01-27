const Sequelize = require('sequelize')
const conexao = require('../db')
const Person = require('./person')
const AluguelBooks = require('./aluguelBooks')

const LoginUser = conexao.define('login_user',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

LoginUser.belongsTo(Person,{
<<<<<<< HEAD
    constraint: true,
    foreignKey: 'idPerson'
})
AluguelBooks.hasMany(AluguelBooks,{
=======
    constraints: true,
    foreignKey: 'idPerson'
})
AluguelBooks.hasMany(LoginUser,{
>>>>>>> 2435520b8b82f2b22053827e4451ca826641ee40
    foreignKey: 'idUser'
})

module.exports = LoginUser