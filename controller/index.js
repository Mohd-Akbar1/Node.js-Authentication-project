
const User=require('../model')
const passport=require('../config/passport-local')

 
async function handleHome(req,res){
    if (req.isAuthenticated()) {
       
        return res.render("home");
      }
      return res.redirect("/login");
}

async function signup(req,res){
    return res.render('signup')
}

async function Login(req,res){
    return res.render('login')
}

async  function Logout(req, res, next) {
    req.logout(function (error) {
      if (error) {
        return next(error);
      }
      req.flash('error','You have Logged Out Successfully')
     return res.redirect("login");
    });
  }

async function CreateUser(req,res){
    const {name,email,password,confirmPassword}=req.body;
    if(password!==confirmPassword){
       req.flash('error','Both password must be Same !')
        console.log('Password must be same ')
        return res.redirect('back')
    }
    const user=await User.findOne({email:email})
    if(user){
        req.flash("success", "user Already Exist !");
        return res.redirect('back')
    }
    await User.create({name,email,password})
    req.flash("success", "user signup successfully");
    return res.redirect('login')
}






module.exports={
    handleHome,signup,Login,Logout,CreateUser

}