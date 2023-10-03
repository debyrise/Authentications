import jwt from "jsonwebtoken"

export const tokenGenerator = (data:any) => {
    return jwt.sign(data, " 4r3e7u9wjdi",   {expiresIn: "10m"} )
}