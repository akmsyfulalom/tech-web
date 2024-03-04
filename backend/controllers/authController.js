const signUpSchema=require('../signUpSchema');
const jwt=require('jsonwebtoken');
const validator=require('validator');

const createToken=(_id)=>{
    return jwt.sign({_id},"abcdefggfedcba",{expiresIn:'3d'})
 }

const login = async (req,res)=>{
    const {userName,pass}=req.body;
    let emptyFields=[];
    if(validator.isEmpty(userName))
    {
        emptyFields.push("userName");
    }
    if(validator.isEmpty(pass))
    {
        emptyFields.push("pass");
    }
    if(emptyFields.length>0)
    {
        res.json({msg:"All fields must be filled",emptyFields});
    }
    else
    {
        const user = await signUpSchema.findOne({userName})
        if(user)
        {
            
            if(pass===user.pass)
            {
                //const id=user._id
                const token=createToken(user._id);
                res.json({userName,token});
            }
            else
            {
                emptyFields.push("pass");
                res.json({msg:"Incorrect Password",emptyFields});
            }
        }
        else
        {
            emptyFields.push("userName");
            emptyFields.push("pass");
            res.json({msg:"Account doesn't exist",emptyFields});
        }
    }

}

const signUp=async (req,res)=>{
    const {fName,lName,userName,email,pass,conPass,type}=req.body;
    let emptyFields=[];
    let invalidFields=[];
    if(!fName)
    {
        emptyFields.push("fName");
    }
    else
    {
        if(!validator.isAlpha(fName))
        {
            invalidFields.push("invalidFname");
        }
    }
    if(!lName)
    {
        emptyFields.push("lName");
    }
    else
    {
        if(!validator.isAlpha(lName))
        {
            invalidFields.push("invalidLname");
        }
    }
    if(validator.isEmpty(userName))
    {
        emptyFields.push("userName");
    }
    if(validator.isEmpty(email))
    {
        emptyFields.push("email");
    }
    else
    {
        if(!validator.isEmail(email))
        {
            invalidFields.push("invalidEmail");
        }
    }
    if(validator.isEmpty(pass)||validator.isEmpty(conPass))
    {
        emptyFields.push("pass","conPass");
    }
    else
    {
        if(!validator.isStrongPassword(pass))
        {
            invalidFields.push("invalidPass");
        }
    }
    if(!(pass===conPass))
    {
        emptyFields.push("pass","conPass");
        res.json({msg:"Passwords not matching",emptyFields});
    }
    else if(emptyFields.length>0||invalidFields.length>0)
    {
        if(invalidFields.includes("invalidFname"))
        {
            invalidFields.push("fName");
            res.json({msg:"Invalid name format",invalidFields});
        }
        else if(invalidFields.includes("invalidLname"))
        {
            invalidFields.push("lName");
            res.json({msg:"Invalid name format",invalidFields});
        }
        else if(invalidFields.includes("invalidEmail"))
        {
            invalidFields.push("email");
            res.json({msg:"Invalid email address",invalidFields});
        }
        else if(invalidFields.includes("invalidPass"))
        {
            invalidFields.push("pass");
            res.json({msg:"Password must be at least 8 characters and include one uppercase letter, one lowercase letter, one digit and a special character",invalidFields});
        } 
        else
        {
            res.json({msg:"All fields must be filled",emptyFields});
        }
    }
    else{
    const ifExist = await signUpSchema.findOne({userName});
    if(ifExist)
    {
        emptyFields.push("userName");
        res.json({msg:"Account already exists",emptyFields});
    }
    else
    {
    try{

        const response=await signUpSchema.create({fName,lName,userName,email,pass,type})
        const token=createToken(response._id);
        res.json({userName,token});
    }
    catch(err)
    {
        res.json(err);
    }
    }
}
}

const checkUser = async (req,res) => {
    const {authorization} = req.headers
    if(!authorization){
         res.json({msg:"Authorization failed"})
    }
    else{

        try{
            const token = authorization.split(' ')[1];
            const {_id}=jwt.verify(token,"abcdefggfedcba");
            const response = await signUpSchema.findOne({_id}).select('type')
            if(response)
            {
                res.json(response.type);
            }
            else
            {
                res.json({msg:"User doesn't exist"});
            }
        }
        catch(error)
        {
            res.json(error);
        }
}
}
module.exports={login,signUp,checkUser}