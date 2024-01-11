const bcrypt=require('bcrypt')
const User=require('../model')
const passport=require('../config/passport-local')

 

//rendering home page
async function handleHome(req,res){
    if (req.isAuthenticated()) {
       
        return res.render("home");
      }
      return res.redirect("/login");
}
//rendering sign up page
async function signup(req,res){
    return res.render('signup')
}

//rendering login page
async function Login(req,res){
    return res.render('login')
}

//logging out user
async  function Logout(req, res, next) {
    req.logout(function (error) {
      if (error) {
        return next(error);
      }
      req.flash('error','You have Logged Out Successfully')
     return res.redirect("login");
    });
  }


  //creating user in db
async function CreateUser(req,res){
    const {name,email,password,confirmPassword}=req.body;

    //if both password are different
    if(password!==confirmPassword){
       req.flash('error','Both password must be Same !')
        console.log('Password must be same ')
        return res.redirect('back')
    }
    //if user already exists
    const user=await User.findOne({email:email})
    if(user){
        req.flash("success", "user Already Exist !");
        return res.redirect('back')
    }
    //bcrypting password
    const hashedPassword=await bcrypt.hash(password,10)
    
    //create user in db with hashed password
    await User.create({name,email,password:hashedPassword})
    req.flash("success", "user signup successfully");
    return res.redirect('login')
}






module.exports={
    handleHome,signup,Login,Logout,CreateUser

}