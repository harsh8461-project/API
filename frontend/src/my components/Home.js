import React,{useState,useRef,useEffect} from 'react';
import DataService from "../services/apicalls.js";

export const Home = () => {
    const [entries, setEntries]=useState([{_id:"",name:"",date:""}]);
    useEffect(() => {
        retrieveEntries();
        window.scrollTo(0, 0)
      }, [])
    const retrieveEntries=()=>{
        DataService.getentries()
        .then(response=>{
                console.log(response.data);
                setEntries(response.data.entries);
            }
        )
        .catch(e =>{
            console.log(e);
        });
    };
    const [formdata, setFormdata] = useState(
        {name: ""}
        );
    const handlechange = (event) =>{
        event.preventDefault();
        setFormdata({
            ...formdata,
            [event.target.name]:event.target.value
        })
    }
    const submitForm = async (e) => {
        e.preventDefault();
        if(formdata.name!=="")
        {
            var data=formdata.name;
            DataService.getpentries(data)
            .then(response=>{
                console.log(response.data);
                setEntries(response.data.entries);
            });
        }
    };
    return (
        <div>
            <h1>The Attendance List with Timings</h1>
            <h4>*This list shows the 12 latest entries</h4>
            <ul>
            {entries.map((entry) => (
                <li>{entry.name}&ensp;{entry.date}</li>
                ))}
            </ul>
            <form className="form" onSubmit={submitForm}>
                <input type="text" value={formdata.name} name="name" onChange={handlechange} placeholder='First Name'required/><br/>
                <input className="submitbutton" type="submit" value="Submit" />
            </form>
        </div>
    )
}
