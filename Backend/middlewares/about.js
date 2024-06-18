const jwt=require('jsonwebtoken');
const User = require('../model/userSchema');

const about=async(req,res,next)=>{
try{
const token=req.cookies.tokenize;
const verified=jwt.verify(token,process.env.SECRET_KEY);
//the above verified will contain the ID of some user in the database, But to fetch the exact user hit the database.
console.log(verified);
const rootUser=await User.findOne({_id:verified._id,"tokens.token":token});
console.log(rootUser);
if(!rootUser){
    throw new Error('User not found');
}
req.token=token;
req.rootUser=rootUser;
req.userId=rootUser._id;
next();
}
catch(err){
res.status(401).send('Unauthorised User');
}
}

module.exports=about;