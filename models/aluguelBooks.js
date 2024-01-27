<<<<<<< HEAD
const Sequelize = require('sequelize')
const conexao = require('../db')
const loginUser = require('./loginUser')

const AluguelBooks = conexao.define('aluguelBooks',{
    id:{
=======
const Sequelize = require('sequelize');
const conexao = require('../db');
const LoginUser = require('./loginUser');

const AluguelBooks = conexao.define('aluguelBooks', {
    id: {
>>>>>>> 2435520b8b82f2b22053827e4451ca826641ee40
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
<<<<<<< HEAD
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
=======
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
>>>>>>> 2435520b8b82f2b22053827e4451ca826641ee40
