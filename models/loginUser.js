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
    constraint: true,
    foreignKey: 'idPerson'
})
AluguelBooks.hasMany(AluguelBooks,{
    foreignKey: 'idUser'
})

module.exports = LoginUser