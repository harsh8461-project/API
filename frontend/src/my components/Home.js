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
                //console.log(response.data);
                setEntries(response.data.entries);
            }
        )
        .catch(e =>{
            console.log(e);
        });
    };
    return (
        <div>
            <ul>
            {entries.map((entry) => (
                <li>{entry.name}&ensp;{entry.date}</li>
                ))}
            </ul>
        </div>
    )
}
