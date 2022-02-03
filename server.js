//load envvariables
require("dotenv").config({ path: "./config/config.env" })

//load dependecies
const express = require("express")
const errorHandler = require("./middlewares/error")
const app = express()
const connectDB = require("./db/db")
const PORT = process.env.PORT || 4000;

//load routers
const authRouter = require("./routers/auth")

//body parser
app.use(express.json())

//mount routers
app.use("/api/v1/auth", authRouter)

//middleware for error handling
app.use(errorHandler)

//starting server & database
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`The server is running now on port ${PORT}`)
    })
}).catch((e) => {
    console.log(`Cannot Start Server: \n ${e}`)
})


