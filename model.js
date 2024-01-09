const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{type:String,required:1},
    email:{type:String,required:1},
    password:{type:String,required:1},
},{timestamps:true})

const User=new mongoose.model('User',UserSchema)

module.exports=User;