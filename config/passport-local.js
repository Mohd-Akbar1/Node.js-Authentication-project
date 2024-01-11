const passport=require('passport')
const bcrypt=require('bcrypt')
const User = require('../model')


//passport local strategy
const LocalStrategy=require('passport-local').Strategy

passport.use(new LocalStrategy({usernameField:'email'},async function(email,password,done){
    try {       
        //finding user email in db
                let user=await User.findOne({email:email});
                
            
            if(!user){
                return done(null,false)
            }
            if( await bcrypt.compare(password,user.password)){
                return done(null,user)
            }else{
                return done(null,false)
            }
           
    } catch (error) {
        console.log('Error occured',error)
        return done(error)
    }

}))

//serializing 
passport.serializeUser(function(user,done){
    return done(null,user.id)
})

//deserializing 
passport.deserializeUser(async function(id,done){
try {
    const user=await User.findById(id)
    if(!user){
        return done(null,false)
    }
    return done(null,user)
} catch (error) {
    console.log("Error during deserializing")
    return done(error)
}
})


//checking Authentication
passport.checkauthenticate=function(req,res,next){
    
     if(req.isAuthenticated()){
        console.log('User is Authenticated')
        return next()
     }
     res.redirect('/')

}

// set user for views  
passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
       
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;