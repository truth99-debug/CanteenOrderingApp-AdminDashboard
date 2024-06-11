import httpCommon from "./utils/http-common";

const getMealItems = () => {
    return httpCommon.get('/getMeals')
}

const getMealOfTheDay = () => {
    return httpCommon.get('/getMealOfTheDay')
}

const updateMealItem = (data : any) => {
    return httpCommon.post('/updateMealItem' , data)
}

export default {getMealItems , getMealOfTheDay , updateMealItem}
