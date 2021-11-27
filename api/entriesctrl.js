import ENTRIES from "../dao/entries.js"

export default class entriescontroller{
    static async getentries(req,res,next){
        const entriesperpage=req.query.entriesperpage?parseInt(req.query.entriesperpage, 10): 20
        const page =req.query.page ? parseInt(req.query.page,10):0

        let filters ={}
        if(req.query.name){
            filters.name=req.query.name
        } else if(req.query.age){
            filters.date=req.query.date
        }

        const { entriesList, totalNumentries}=await ENTRIES.getEntries({
            filters,page,entriesperpage,
        })

        let response={
            entries: entriesList,
            page: page,
            filters: filters,
            entriesperpage: entriesperpage,
            totalresults: totalNumentries,
        }
        res.json(response)
    }
    static async postentrie(req,res,next){
        try{
            const name = req.body.formdata.name
            const date = new Date(req.body.formdata.date)
            const entrieresponse=await ENTRIES.addEntrie(
                name,
                date
            )
            res.json({status: "Attendance Entry done"})
        } catch(e){
            res.status(500).json({error:e.message})
        }
    }
    static async findentrie(req,res,next){
        const mail=req.body.formdata.mail
        const password =req.body.formdata.password
        req.session.entrie=mail
        const {message,auth}=await ENTRIES.findEntrie(
            mail,
            password,
        )

        let response={
            message,auth,
        }
        res.json(response)
        //console.log(res);
    }
}