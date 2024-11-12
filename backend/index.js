const express = require('express')
require ('dotenv').config()
const userRouter = require('./routes/userRoute');
const mongoose = require('mongoose');

// connnecting with mongodb
mongoose.connect(process.env.MONGODB_URL).then(()=>console.log('connection successs')).catch((err)=>console.log("Error while connectiing to mongdb"))

const PORT = process.env.PORT ?? 3000;
const app = express()

app.use('/', userRouter)

// listing to port
app.listen((PORT), () => {
    console.log(`App listening on port ${PORT}!`);
});