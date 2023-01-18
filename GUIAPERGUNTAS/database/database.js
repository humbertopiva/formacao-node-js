const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', 'suasenhaaqui', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;