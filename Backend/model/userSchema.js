const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

//UserSchema is defined to create a structure of the document that you want to set in the database
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    messages:[
     {
      name:{
        type:String,
        required:true
      },
      date:{
        type:Date,
        default:Date.now()
      },
      message:{
        type:String,
        required:true
      }  
     }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]

})

//We are generating JWT token here(The below is an instance function and as UserExist is an instance of UserSchema So the below method can be called using UserExist.generateAuthToken
userSchema.methods.generateAuthToken=async function(){
    try{
        //It takes two arguments payload and signature
        let tokentoadd=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        //Now add the token in the database for that particular user
        this.tokens=this.tokens.concat({token:tokentoadd});
        //this here refers to the current user
        await this.save();
        return tokentoadd;
    }
    catch(err){
        console.error(err);
    }
}

//A function which will add the message to that particular user's details 
userSchema.methods.addMessenger=async function(name,message){
try{
    this.messages=this.messages.concat({name,message});
    await this.save();
    return this.messages;
}catch(e){
    console.log(e);
}
}



// Now attach this structure defined with the project with models

const User=mongoose.model('USER',userSchema);
//Here User is a class model 
//Inside mongoose.model the first param is name of collection(which will be stored as plural and all lower case in the database.)
module.exports=User;