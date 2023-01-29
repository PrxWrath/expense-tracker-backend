const razorpay = require('razorpay');
const Order = require('../models/Order');
const logger = require('../services/logger');

exports.getPurchasePremium = (req,res,next) => {
    try{
        const rzp = new razorpay({
            key_id: process.env.RZP_KEY_ID,
            key_secret: process.env.RZP_KEY_SECRET
        }) 

        const amount = 2500;
        rzp.orders.create({amount, currency: 'INR'}, async(err, order)=>{
            if(err){
                throw new Error(JSON.stringify(err))
            }
            await req.user.createOrder({
                orderID: order.id,
                status: 'PENDING'
            })
            res.status(201).json({order, key_id: rzp.key_id})
        })
    }catch(err){
        logger.write(err.stack)
    }   
}

exports.postUpdateStatus = async(req,res,next) => {
    try{
        await Order.update({status:'FAILED'}, {where:{status:'PENDING', userId:req.user.id}}); //fail all the prior pending payments of user
        const order = await Order.findOne({where: {orderID: req.body.order_Id}});
        if(order){
           if(req.body.payment_Id!==null){
                order.paymentID = req.body.payment_Id,
                order.status = 'SUCCESSFUL'
                req.user.isPremium = true;
                await req.user.save();
            }else{
                order.status = 'FAILED'
            }
        }
        await order.save();
    }catch(err){
        logger.write(err.stack)
    }
}