const mongoose=require("mongoose")
const UserSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    role:{type:String,enum:["user","moderator"]},
    password:{type:String,default:"user"},
});


const User=mongoose.model("user",UserSchema)
module.exports={
    User
}