import httpCommon from "./utils/http-common";

const getOrders = () => {
    return httpCommon.get('/getAllOrders')
}

export default {getOrders}
