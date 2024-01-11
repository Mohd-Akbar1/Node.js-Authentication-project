const {sendMail}=require('../config/Nodemailer.js')
const User=require('../model')
const jwt =require('jsonwebtoken');
const bcrypt=require('bcrypt')


const JWT_SECRET='secret'


//controller for forgot password route
async function forgotpassword(req,res){
    res.render('forgot-password')
}



//controller for sending email link to reset password

async function forgotpasswordHandle(req,res){
   try {
    const email=req.body.email;

    //if user doesnt exists

    const user=await User.findOne({email})
    if(!user){
        req.flash("error", "user Does not exist");
        return res.redirect('forgot-password')
    }
    
    //if user finds and create a one time link valid for 10 min
    const secret=JWT_SECRET+user.password;
    const payload={
        email:user.email,
        id:user._id
    }
    const token=jwt.sign(payload,secret,{expiresIn:'10m'})
    const link=`http://localhost:8000/reset-password/${user._id}/${token}`;

    //sending email to provided email for registered user
    
    sendMail(link,email)
    console.log('email:',email)
   
    // res.send('Passwrd link has sent to email...')
    req.flash("error", `Passwrd link has been sent to email:${email}`);
    return res.redirect('back')

   } catch (error) {
        console.log(error)
   }
}

//verifying token 
async function Resetpassword(req,res){
    try {
    const id=req.params.id; 
    const token=req.params.token
    const user=await User.findById(id)
    // console.log(user.id)
    // console.log(id)
    //check id  exists in database
    if(id!==user.id){
       return res.send('invalid id')
    }
    //if exists
    const secret=JWT_SECRET+user.password;
   
        const payload=jwt.verify(token,secret)
       return res.render('reset-password')
        
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}

//updating password in database 
async function resetPasswordHandle(req,res){
    const {id,token}=req.params;
   
    const {password,password2}=req.body

    const user=await User.findById(id)

    
    if(id!==user.id){
        return res.send('invalid id')
     }

    const secret=JWT_SECRET+user.password;

    try {
        const payload=jwt.verify(token,secret)

       //validate password and password2
      if(password!==password2){

        req.flash('error','Both password must be Same')

        return res.redirect('back')
       }else{
        //hasing password
        const hashedPassword=await bcrypt.hash(password,10)
        await User.findByIdAndUpdate(id,{$set:{password:hashedPassword}})
        req.flash('success','Password Updated Sucessfully')
       return  res.redirect('/')
       }
      
     
        
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }

}
module.exports={
    forgotpassword,
    forgotpasswordHandle,
    Resetpassword,
    resetPasswordHandle

}