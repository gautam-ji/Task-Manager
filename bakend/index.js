import dotenv from "dotenv"
import express from "express" 
import cors from "cors"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Database is connected")
})
.catch((err) =>{
    console.log(err)
})

const app  = express()

//middleware to handle cors
app.use(
    cors({
        origin: process.env.FRONT_END_URL || "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)

// Middleware to handle JSON object in req body
app.use(express.json())
app.use(cookieParser())

app.listen(3000, () => {
    console.log("Server is runnign on port 3000!")
})

app.use("/api/auth", authRoutes)

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500

    const message = err.message || "Initial Server Error"

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

  