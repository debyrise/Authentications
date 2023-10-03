import multer from "multer"
import  express , {Request} from "express"
import path from "path"

type  callbackDestination = (err: Error | null, destination:string) => void
type  filenameCallback = (err: Error | null, filename:string) => void

const storage = multer.diskStorage({
   destination: function(   req:Request, file :any, cb:callbackDestination ) {
            cb(null, path.join(__dirname, "../uploads"))
   },



   filename: function ( req:Request, file:any, cb:filenameCallback ) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random()* 1e9);
    cb( null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname) )

   }

})

const  uploads = multer ({storage:storage}).single("ProfileImage") 
export default uploads