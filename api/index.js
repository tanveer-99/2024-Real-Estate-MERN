import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js";
import authRouter from './routes/auth.route.js';

//environment variable config
dotenv.config();

//database connection
mongoose.connect(process.env.MONGO)
.then(() => { 
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

//creating a new express app
const app = express();

app.use(express.json());

//apis
app.use("/api/user", userRouter);
app.use('/api/auth', authRouter);

//error middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})


//connection status on console
app.listen(3000, ()=> {
    console.log("server is running on port 3000!");
})