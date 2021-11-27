import express from "express"
import entriesctrl from "./entriesctrl.js"
const router = express.Router()

//Users APIs
router.route("/api/getentries").get(entriesctrl.getentries)
router.route("/api/postentrie").post(entriesctrl.postentrie)

export default router