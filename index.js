if(process.env.NODE_ENV !== 'production'){
 require('dotenv').config()
}

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = process.env.PORT;


app.get("/",(req,res)=>{
 res.send("Lets Start")
})


app.listen(PORT,()=>{
  console.log(`The application is running at port : ${PORT}`);
})