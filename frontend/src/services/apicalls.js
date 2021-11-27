import http from "../api-http-common";

class DataService{
    //for apicalls
    postentrie(data){
        return http.post("/api/postentrie", data);
    }
    getentries(page=0,entriesperpage=12){
        return http.get(`/api/getentries?page=${page}&entriesperpage=${entriesperpage}`);
    }
    getpentries(date="",page=0,entriesperpage=12){
        return http.get(`/api/getpentries?date=${date}page=${page}&entriesperpage=${entriesperpage}`);
    }
}

export default new DataService();