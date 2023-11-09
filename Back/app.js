require("dotenv").config()
const express=require('express')
const app=express()


const port=process.env.PORT || 7778
app.listen(port,console.log(`listening on port ${port}`))