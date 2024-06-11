import httpCommon from "./utils/http-common";

const performLogin = (username : String , password : String) => {
    return httpCommon.post('/performLogin' , {
        "username" : username,
        "password" : password
    })
}

export default {performLogin}
