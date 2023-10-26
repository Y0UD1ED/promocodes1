import React, { FC, useContext } from 'react';
import { PATHS } from '../router';
import { useState } from "react";
import { Link } from 'react-router-dom';
import Module from './Module';
import NavBurger from './NavBurger';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { createContext } from 'react';
import Waiting from './Waiting';
import { ForgContext, ModuleContext } from '../App';



const NavBar:FC=()=>{
    const { store } = useContext(Context);
    const {showmodule,setShowmodule}=useContext(ModuleContext);
    const [burger,setBurger]=useState<Boolean>(false);
    const {showforg,setShowforg}=useContext(ForgContext);
    return(
             <div className='NavBar'>
            <nav className="menu">
                <div className="container">
                    <div className="menu_logo"><Link to={PATHS.MAIN}><img src="../log.svg" alt=""></img></Link></div>
                    <div className="menu_min_logo"><Link to={PATHS.MAIN}><img src="minlog.png" alt=""></img></Link></div>
                    <ul className="menu_top">
                        <li onClick={()=>setShowmodule(true)} style={{display:store.isAuth?'none':'inline'}}>Войти</li>
                        <li style={{display:store.isAuth?'block':'none'}}><Link to={PATHS.USER}>{store.user.firstName}</Link></li>
                        <li onClick={()=>setShowmodule(true)} style={{display:store.isAuth?'none':'inline'}}>Пройти тест</li>
                        <li style={{display:store.isAuth?'block':'none'}}><Link to={PATHS.TEST}>Пройти тест</Link></li>
                        <li><Link to={PATHS.INFO}>Информация</Link></li>
                        <li><Link to={PATHS.CATALOG}>Психологи</Link></li>
                       
                        
                           

                       
                        
                    </ul>
                    <div className="nav_btn" onClick={()=>setBurger(true)}>
                        <span/>
                    </div>
                </div>
               
                
            </nav>
            <NavBurger burger={burger} setBurger={setBurger}/>
           
            <Waiting/>
        </div>
       
    )
}

export default observer(NavBar)