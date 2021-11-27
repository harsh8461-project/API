import express from "express"
import cors from "cors"
import routes from "./api/routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/", routes) //basic routes

export default app
