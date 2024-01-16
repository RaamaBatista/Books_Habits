const Sequelize = require('sequelize');
const conexao = require('../db');
const LoginUser = require('./loginUser');

const AluguelBooks = conexao.define('aluguelBooks', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    valor: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    idUser: {
        type: Sequelize.INTEGER,
        references: {
            model: 'login_users', // Nome da tabela referenciada
            key: 'id' // Nome da coluna referenciada
        }
    }
});

module.exports = AluguelBooks;
