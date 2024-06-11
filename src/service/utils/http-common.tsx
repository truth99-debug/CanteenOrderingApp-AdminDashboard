import axios from "axios";

export default axios.create({
    baseURL: '/api/v1/admin/',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '/api/applications/',
    }
});
