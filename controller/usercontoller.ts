import AuthModel from "../modal/Authmodal"
import express, {Request,Response} from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


    export const RegisterUser = async(req:any, res:Response): Promise<Response> =>{
        try{

             const { fullname,email, password} = req.body
             if (!fullname || !email || !password)
             {
                return res.status (401).json ({
                    success :0,
                    message: "all field required"
                })
             }
             
             const checkEmail = await AuthModel.findOne( {email:email} )
             console.log(checkEmail)
             if(checkEmail)
             {
                return res.status(401).json({
                    success:0,
                    message: "email already exist"
                })
             }
              const salt = await bcrypt.genSalt(10)
              const hashed = await bcrypt.hash(password,salt)
              const createdata = await AuthModel.create({
                 fullname,
                 email,
                 password:hashed,
                 ProfileImage:req.file.filename
              })

                 return res.status (201).json({
                    message: "created successfully",
                    result: createdata
                 })


        }catch(error:any)
        {  
            return res.status(400).json({
                message:"failed to register user",
                error: error.message
            })

        }
     }



export const login = async(req:Request, res:Response):Promise<Response> =>{
    try{
        const {email, password} = req.body
        if(!email || !password)
        {
          return res.status(401).json({
            message: "all filed required"
          })
        }
        const checkEmail: any = await AuthModel.findOne({email:email})
        console.log(checkEmail)
        if (checkEmail)

        {
            const checkPassword = await bcrypt.compare(password,checkEmail.password)
            if (checkPassword)
            {
               const Token= jwt.sign({_id:checkEmail._id, fullName:checkEmail.fullName,email: checkEmail.email,},
                     "4r3e7u9wjdi",
                     {expiresIn: "10m"}
                )
                

                const {password, isActive, ... info} = checkEmail._doc
                const Option:any = {expiresIn: "15m"}
                res.cookie("sessionId", Token, Option)
                //  console.log( req.header["cookie"])

                return res.status(200).json({
                   message: "log in successfully",
                   result :{info, Token}
                })
            }else{
                return res.status(401).json({
                    message: "incorrect password"
                })
            } 

        }else
        {
            return res.status(201).json({
                message: "user not found"
            })
        }
    }catch(error:any)
    {
        return res.status(201).json({
            message: error.message
        })
    }
}

export const  GetAllUser = async (req:Request,res:Response):Promise<Response> => {
    try
    {
        const getUser = await AuthModel.find()
        return res.status(200).json({
            message: "All user",
            result:getUser

        })
    }catch(error:any)
    {
           return res.status(404).json({
            message: error.message
           })
    }



}
export const logOut = async(req:Request, res:Response):Promise<Response>=>{
    try
    { 
       res.clearCookie("Sessionid")
       return res.status(404).json({
        message:"log out successfully"
       })
    }catch(error:any)
    {
      return res.status(404).json({
        message: error.message
      })
    }
}