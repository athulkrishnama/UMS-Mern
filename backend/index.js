const express = require('express')
require ('dotenv').config()
const userRouter = require('./routes/userRoute');

const PORT = process.env.PORT ?? 3000;
const app = express()

app.use('/', userRouter)

// listing to port
app.listen((PORT), () => {
    console.log(`App listening on port ${PORT}!`);
});