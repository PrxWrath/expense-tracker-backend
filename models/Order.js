const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Order = sequelize.define('orders', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    paymentID : Sequelize.STRING,
    orderID: Sequelize.STRING,
    status: Sequelize.STRING
})

module.exports = Order;