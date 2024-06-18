const bycrypt=require('bcryptjs');

//Export const means whenever this function will be used it has to be used by the same name
const hashPassword=async(password)=>{
    try{

        const saltRounds=10;
        const hashedPassword=await bycrypt.hash(password,saltRounds);
        return hashedPassword;

    }catch(error){
        console.log(error);
    }
} 

const comparePassword=async(password,hashedPassword)=>{
return await bycrypt.compare(password,hashedPassword);
}

module.exports={
    hashPassword:hashPassword,
    comparePassword:comparePassword
}