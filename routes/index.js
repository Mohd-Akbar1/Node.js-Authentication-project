const express=require('express')
const router=express.Router();

//importing controllers
const {handleHome,signup,Login,Logout,CreateUser}=require('../controller/index.js')
const {forgotpassword,forgotpasswordHandle,Resetpassword,resetPasswordHandle}=require('../controller/HandlePassword.js')


const Passport=require('../config/passport-google-Oauth')

const User=require('../model')
const passport=require('../config/passport-local')


//rendering home page
router.get('/',handleHome)

//rendering Singup page
router.get('/signup',signup)

//rendering loginPage
router.get('/login',Login)

//logout user
router.get('/logout', Logout)


//-------------------reset password----------------------------

router.get('/forgot-password',forgotpassword)

router.post('/forgot-password',forgotpasswordHandle)

router.get('/reset-password/:id/:token',Resetpassword)
router.post('/reset-password/:id/:token',resetPasswordHandle)

//-------------------------------------------------------------


//create user while sign up
router.post('/signup',CreateUser)


//-google authenticate


router.get('/auth/google',Passport.authenticate('google',{scope:['profile','email']}));


router.get('/auth/google/callback', 
Passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    req.flash('success','Logged In successfully')
   return res.redirect('/');
  });


  //---------local passport 


router.post('/signin', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Invalid Username or Password'
}), function(req, res) {
  if (req.flash('error').length === 0) {
      // Set failureFlash message only if there's no error flash already set
      req.flash('failureFlash', 'Invalid Details or Credentials');
  }
  req.flash('success', 'Logged In successfully');
  return res.redirect('/');
});
module.exports=router