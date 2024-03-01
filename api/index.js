import expres from "express";

const app = expres();

app.listen(3000, ()=> {
    console.log("server is running on port 3000!");
})