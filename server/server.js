const express = require("express")
const app = express();
app.use(express.json())
require('dotenv').config();
const dbconfig = require('./config/dbconfig')
const userRouter = require("./routes/usersRoutes")
const projectsroutes = require("./routes/projectsroutes")

app.use("/api/users",userRouter);
app.use("/api/projects",projectsroutes)
const port = process.env.port || 5000;

app.listen(port,()=>{
    console.log(`listing on port ${port}`)
})