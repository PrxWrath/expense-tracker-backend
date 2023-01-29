const sequelize = require('../util/database');
const logger = require('../services/logger');

exports.getShowLeaders = async(req,res,next) => {
    try{
        const data = await sequelize.query(`SELECT userId, name, total FROM users 
                    LEFT JOIN 
                    (SELECT userId, SUM(amount) as total FROM expenses GROUP BY userId) as totalexpense 
                    ON users.id=totalExpense.userId ORDER BY total DESC `); 
                    //join users and grouped expenses table to get total amounts of every user 
        
        res.status(201).json({leaders:data[0]})
    }catch(err){
        logger.write(err.stack);
    }
}