require('dotenv').config()
const express=require('express');
const app=express()
const router=require('./routes')
const mongoose=require('mongoose')
const passport=require('passport')
const session = require('express-session');
const flash=require('connect-flash')
const customMiddleware=require('./config/flash')


//connecting Database
mongoose.connect('mongodb+srv://abbashasmi:UgTzfR30yyl1R0aI@cluster0.beunwzd.mongodb.net/?retryWrites=true&w=majority')


//setting view engine
app.set('view engine','ejs')


app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(express.static('public'))

// sessions 
app.use(session({
    name: "nodejs- auth",
    secret: 'somethingSecret',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    }
   
}));

// initializing passport and session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//using custom middle ware
app.use(customMiddleware.setflash);


app.use('/',router)

app.listen(process.env.PORT||8000,function(){
    console.log('Server is running')
})