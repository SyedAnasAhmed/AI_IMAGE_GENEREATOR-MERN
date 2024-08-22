import express, { response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from './MongoDB/connect.js'
import PostRoutes from './Routes/PostRoutes.js'
import DalleRoutes from './Routes/DalleRoutes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use('/api/v1/posts' , PostRoutes)
app.use('/api/v1/dalle' , DalleRoutes)

app.get("/" , async (request , response)=>{
    response.send("Hello from dall-e")
})

const startserver = async () =>{
    try{
        connectDB(process.env.MONGO_URL)
        app.listen( 8080, ()=> console.log("Server is running on port 8080"))
        console.log("MongoDB connected")
    }
    catch(error){
        console.log(error)
    }
}

startserver()