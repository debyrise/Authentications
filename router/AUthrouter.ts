import express from "express"
import { login, RegisterUser ,  GetAllUser, logOut } from "../controller/usercontoller"
import jwt from "jsonwebtoken"
import uploads from "../Middleware/multer"



 const  verifyToken = async (req :any, res :any, next :any) => {
   const getsession = req.header["cookie"]
     
   if (!getsession)
   {
    return res.status(404).json({
        message: "please login to get token"
    })
   }
      const tokencokkie = getsession.split("=")[1]
      if(tokencokkie)
      {
        const token = await tokencokkie
        jwt.verify(token, "4r3e7u9wjdi", (err:any,payload:any) => {
            if (err)
            {
                return res.status(404).json({
                    message:"token expire"
                })
            } 
            req.user = payload   
        })
      }else
      {
        return res.status(404).json({
            message:"please provide a valid  token"
        })
      }


 }

const router = express.Router()
router.route("/create-user").post(  uploads,  RegisterUser)
router.route("/login-user").post(login)
router.route("/logout-user").post(logOut )
router.route("/All-user").get( verifyToken, GetAllUser)

export default router