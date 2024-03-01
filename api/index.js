import expres from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js";

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
const app = expres();

//apis
app.use("/api/user", userRouter);


//connection status on console
app.listen(3000, ()=> {
    console.log("server is running on port 3000!");
})