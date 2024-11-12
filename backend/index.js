const express = require('express')
require ('dotenv').config()

const PORT = process.env.PORT ?? 3000;
const app = express()

app.get('/',(req,res)=>{
    res.json({'sucess':true})
})

// listing to port
app.listen((PORT), () => {
    console.log(`App listening on port ${PORT}!`);
});