
import React, { FC,useContext } from 'react';
import { PATHS } from '../router';
import { useState } from "react";
import { Link } from 'react-router-dom';
import Module from './Module';
import { ForgContext, ModuleContext } from '../App';
import { Context } from '..';

interface Props{
    burger  :Boolean;
    setBurger: any;
}


function NavBurger({burger,setBurger}:Props){
    const {showmodule, setShowmodule}=useContext(ModuleContext);
    const {store}=useContext(Context)
    return(
        <div>
            <div className="windows" style={{display: burger? 'flex':'none'}} onClick={()=>setBurger(false)}>
            <div className="nav_menu" onClick={e=>e.stopPropagation()}>
                    <div className="nav_content">
                        <ul>
                            <li onClick={()=>setShowmodule(true)} style={{display:store.isAuth?'none':'flex'}}>Войти</li>
                            <li style={{display:store.isAuth?'block':'none'}}><Link to={PATHS.USER}>{store.user.firstName}</Link></li>
                            <li><Link to={PATHS.INFO}>Информация</Link></li>
                            <li><Link to={PATHS.TEST} >Пройти тест</Link></li>
                            <li><Link to={PATHS.CATALOG}>Психологи</Link></li>
                        </ul>
                    </div>
            </div>
           
            </div>
            <Module/>
        </div>
        
    );
}

export default NavBurger;