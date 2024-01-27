const Sequelize = require('sequelize')
const conexao = require('../db')
const loginUser = require('./loginUser')

const AluguelBooks = conexao.define('aluguelBooks',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    imagemUrl:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    valor:{
        type: Sequelize.DECIMAL,
        allowNull: false
    },

})


module.exports = AluguelBooks