const Sequelize = require('sequelize')
const conexao = require('../db')

const CadastroBooks = conexao.define('CadastroBooks',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    LivroNome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    DataAluguel:{
        type: Sequelize.DATE,
        allowNull: false
    },
    QtdDia:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = CadastroBooks