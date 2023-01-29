const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ForgotRequest = sequelize.define('forgotpassword', {
    id:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    isActive: Sequelize.BOOLEAN
})

module.exports = ForgotRequest;