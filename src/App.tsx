import './App.css';
import * as React from 'react';
import Login from "./pages/login/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashBoard from "./pages/dashboard/DashBoard";
import Home from "./pages/home/home";

const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/*' element={<Login/>}/>
                <Route path='/DashBoard/' element={<DashBoard/>}/>
                <Route path='/Home/' element={<Home/>} />
            </Routes>
        </BrowserRouter>
    )
}
export default App;
