import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./Database/connectDB.js";


dotenv.config({
    path:"./env"
})


connectDB()
.then( ()=> {
   app.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
      
   })
})
.then( () => {
   app.listen(process.env.PORT || 8000, () => {
      console.log(` Server is running on PORT: ${process.env.PORT}`)
   })

}) 
.catch( (err) => {
   console.log("MongoDB Connection Failed !!", err)
})

app.get("/", (req, res) => {
   res.send(" Hello world, conneted to DB SucessFully")
})
