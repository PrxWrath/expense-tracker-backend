const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const userRoute = require('./routes/users');
const expenseRoute = require('./routes/expenses');
const purchaseRoute = require('./routes/purchase');
const premiumRoute = require('./routes/premium');
const User = require('./models/user');
const Expense = require('./models/Expense');
const Order = require('./models/Order');
const ForgotRequest = require('./models/Forgot');
const File = require('./models/File');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const logStream = fs.createWriteStream(path.join(__dirname, 'server.log'), {flags:'a'});

app.use(helmet());
app.use(cors());
app.use(morgan('combined', {stream: logStream}));

app.use(bodyParser.json({extended:false}));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/users', userRoute);
app.use('/expenses', expenseRoute);
app.use('/purchase', purchaseRoute);
app.use('/premium', premiumRoute);
app.use((req,res,next)=>{
    res.send('<h1>Backend Running :)</h1>');
})

Expense.belongsTo(User);
User.hasMany(Expense);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(ForgotRequest);
ForgotRequest.belongsTo(User);
User.hasMany(File);
File.belongsTo(User);

sequelize.sync().then(res=>{
    app.listen(process.env.PORT || 4000);
})
.catch(err=>{
    console.log(err);
})
