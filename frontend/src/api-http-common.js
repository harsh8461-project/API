import axios from "axios";

export default axios.create({
    baseURL: "https://iotteamfour.herokuapp.com/",
    headers: {
        "Content-type": "application/json"
    }
})