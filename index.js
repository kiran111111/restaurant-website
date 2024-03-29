if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
   }
   
   
   const express = require("express");
   const app = express();
   const path = require("path");
   const bodyParser = require("body-parser");
   const connectDB = require("./congif/db");
   const session = require("express-session");
   const cookieParser = require("cookie-parser");
   const flash = require("connect-flash");
   const pug = require("pug");
   const expressValidator = require("express-validator");
   const router = require("./routes/routes")
   const passport = require("passport");
   const helpers = require("./helpers")
   const errorHandlers  = require("./errorHandlers")
   
   // setting up the port
   const PORT = process.env.PORT || 4000;
   
   // Connect to the database with the function made--
   connectDB();
   
   
   // Serve up static files from the public folder. Anything -
   // in these files will be served as such
   app.use(express.static("public"))
   
   // Takes raw request and converts them into usable data
   app.use(bodyParser.urlencoded({extended:false}));
   app.use(bodyParser.json())
   
   
   // Middleware for rendering the Template Engines/PUG
   // view engine setup
   app.set("view engine","pug");
   // this is the folder where we keep our pug files
   // We use template engine to render html
   app.set("views","./views");
   
   
   // Exposes bunch of methods for validating user data
   // app.use(expressValidator());
   
   // cookie parser middleware
   app.use(cookieParser());
   
   // Middleware for the Express Session--------------
   // @Session created by EXPRESS SESSION;
   // session allows us to store data on visitors from request to request
   // This keeps data user logged in
   app.set('trust proxy', 1)
   app.use(session({
    secret:process.env.SESSION_SECRET,
    key:process.env.KEY,
    resave:true,
    saveUninitialized:true
   }))
   
   //PassportJS is used to handle user logins
   app.use(passport.initialize());
   app.use(passport.session()
   )
   
   
   // @connect flash for flash Messages
   // Helps us to send flash messages--
   app.use(flash());
   
   
   app.use(function (req, res, next) {
     res.locals.messages = require('express-messages')(req, res);
     next();
   });
   
   
   // Pass variables to our templates + all requests
   app.use(function (req, res, next){
     res.locals.h = helpers;
     res.locals.flashes = req.flash();
     res.locals.user = req.user || null;
     res.locals.currentPath = req.path;
     res.locals.API_KEY = process.env.MAP_APIKEY;
     next();
   });
   
   
   // Route to expres router
   app.use('/',router);

   app.use((err, req, res, next) => {
    res.status(500).render('error', { message: err.message });
  });
   
   // validaiton errors
   app.use(errorHandlers.flashValidationErrors)
   
   // production errors
   app.use(errorHandlers.productionErrors)
   // '192.168.0.20'
   
   // Start listening
   app.listen(PORT,()=>{
     console.log(`The application is running at port : ${PORT}`);
   })