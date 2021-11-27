import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import * as path from 'path'
import express from "express"
import entriesDAO from "./dao/entries.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 5000;

MongoClient.connect(
    process.env.ATLAS_URI,
    {
        wtimeoutMS: 2500
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    console.log(`Connected to database`)
    await entriesDAO.injectDB(client)
})

// Heroku editted snippet
if(process.env.NODE_ENV=="production"){
    app.use(express.static("frontend/build"));
    const __dirname = path.resolve();
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
    })
}

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
