const sequelize = require('../util/database');
const logger = require('../services/logger');
const Expense = require('../models/Expense');
const User = require('../models/user');

exports.getShowLeaders = async(req,res,next) => {
    try{
        const leaders = await User.findAll({
                attributes:[['id', 'userId'], 'name', [sequelize.fn('sum', sequelize.col('expenses.amount')), 'total']],
                include:[
                    {
                        model: Expense,
                        attributes: []
                    }
                ],
                group: ['users.id'],
                order: [['total', 'DESC']]
            });
        //join users and grouped expenses table to get total amounts of every user 
        
        res.status(201).json({leaders})
    }catch(err){
        logger.write(err.stack);
    }
}