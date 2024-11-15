const express = require('express')
require ('dotenv').config()
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRoute');
const mongoose = require('mongoose');
const cors = require('cors')

// connnecting with mongodb
mongoose.connect(process.env.MONGODB_URL).then(()=>console.log('connection successs')).catch((err)=>console.log("Error while connectiing to mongdb"))

const PORT = process.env.PORT ?? 3000;
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', userRouter)
app.use('/admin', adminRouter)

// listing to port
app.listen((PORT), () => {
    console.log(`App listening on port ${PORT}!`);
});