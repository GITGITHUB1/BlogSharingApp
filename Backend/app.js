const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

//Configure Dotenv file by writing its path(You Don't have to write it again and again just config it in App.js and use it anywhere)
dotenv.config({ path: './config.env' });

//Attach the connection file 
require('./db/conn');

//Import UserModel
//const User=require('./model/userSchema');

//Import Port from config.env
const PORT = process.env.PORT;

//The below middleware will convert the user json data to object So that the backend can understand it.
app.use(express.json());
//We have linked the router files
app.use(require('./router/auth'));

//Middlewares->

//MiddleWare are the functions that have three params req, res and next function in the app's req-res cycle
//using next function

// const middleware=(req,res,next)=>{
//     console.log('Hello my middleware');
//     //It will run the next method only when it will pass the conditions
//     next();
// }


// app.get('/',middleware,(req,res)=>{
// res.send(`Hello World from server`);
// })

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})