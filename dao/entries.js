let entries

export default class ENTRIES{
    static async injectDB(conn){
        if(entries){
            return
        }
        try{
            entries = await conn.db(process.env.ATLAS_NS).collection("entries")
        } catch(e){
            console.error(
                `Unable to establish a collection handle in entriesDAO: ${e}`,
            )
        }
    }

    static async getEntries({filters=null,page=0,entriesperpage=10,}={}) {
        let query
        if(filters){
            if("name" in filters){
                query ={ "name": { $search :filters["name"]}}
            } else if("date" in filters){
                query={ "date": { $eq: filters["date"]}}
            }
        }

        let cursor

        try{
            cursor =await entries.find(query)
        } catch (e){
            console.error(`unable to issue find command, ${e}`)
            return{ entriesList: [], totalNumentries: 0}
        }

        const displayCursor = cursor.limit(entriesperpage).skip(entriesperpage*page)

        try{
            const entriesList=await displayCursor.toArray()
            const totalNumentries =await entries.countDocuments(query)

            return { entriesList, totalNumentries}
        }  catch (e){
            console.error(`unable to convert cursor to array or problem counting documents, ${e}`)
            return{ entriesList: [], totalNumentries: 0}
        }
    }
    static async addEntrie(name,date,){
        try{
            const entriesDoc={
            name:name,
            date:date,
            }
            return await entries.insertOne(entriesDoc)
        } catch(e){
            console.error(`Unable to Make the Entry: ${e}`)
            return { error: e }
        }
    }
    static async findEntrie(mail,password,){
        let query
        query ={"mail": { $eq :mail}}
        let cursor

        try{
            cursor =await entries.find(query)
        } catch (e){
            console.error(`unable to issue find command, ${e}`)
            return{message:"Find Command Not executed", auth:false}
        }

        const displayCursor = cursor

        try{
            const entriesList=await displayCursor.toArray()
            const totalNumentries =await entries.countDocuments(query)
            if(totalNumentries===0){
                return {message:"Entrie Not Found", auth:false}
            }
            else{
                const match=await bcrypt.compare(password,entriesList[0].password)
                if(match){
                    return {message:"Login Successful", auth:true}
                }
                else{
                    return {message:"Password doesn't match the Email", auth:false}
                }
            }
        }  catch (e){
            console.error(`unable to convert cursor to array or problem counting documents, ${e}`)
            return{message:"Cursor Problem",auth:false}
        }
    }
}