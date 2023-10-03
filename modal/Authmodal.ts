import mongoose from "mongoose";

interface userAuth{
    fullName: string,
    email: string,
    password: string,
    isActive: boolean,
    ProfileImage: string

}

interface iuserAuth extends userAuth, mongoose.Document{}

const userSchema = new mongoose.Schema(
{
   fullName :{
        type: String,
        lowercase: true
    },
    email:{
        type: String,
        lowercase: true,
        unique: true

    },
    password:{
        type: String
    },
    isActive:{
        type:Boolean
    },
    ProfileImage: {
        type: String
    }
   
},
  {timestamps:true}
)

export default mongoose.model<iuserAuth>("userAuth",userSchema)