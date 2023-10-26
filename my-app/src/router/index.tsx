import { Route,Routes } from "react-router-dom";
import Catalog from "../pages/Catalog";
import Info from "../pages/Info";
import Main from "../pages/Main";
import Rezult from "../pages/Rezult";
import Test from "../pages/Test";
import Account from "../pages/Account";
import { PrivateRoute } from "./PrivateRouter";
import Politic from "../pages/Privacy";
import Conditions from "../pages/Conditions";

export const PATHS={
    MAIN:'/',
    INFO: '/info',
    TEST: '/test',
    CATALOG: '/catalog',
    REZULT: '/rezult/:id',
    USER: '/user',
    PRIVACY: '/privacy',
    CONDITIONS: '/conditions',
}

export const router=()=>(
    <Routes>
        <Route path={PATHS.MAIN} element={<Main/>}/>
        <Route path={PATHS.INFO} element={<Info/>}/>
        <Route path={PATHS.TEST} element={<Test/>}/>
        <Route path={PATHS.CATALOG} element={<Catalog/>}/>
        <Route path={PATHS.REZULT} element={<Rezult/>}/>
        <Route path={PATHS.USER} element={<PrivateRoute/>}/>
        <Route path={PATHS.PRIVACY} element={<Politic/>}/>
        <Route path={PATHS.CONDITIONS} element={<Conditions/>}/>
       
    </Routes>
)