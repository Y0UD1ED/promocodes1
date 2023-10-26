import React, { FC,ReactElement,useContext } from 'react';
import ReactDOM from 'react-dom';
import { useState } from "react";
import LoginForm from './LoginForm';
import RegForm from './RegForm';
import { createContext } from 'react';
import { ForgContext, ModuleContext } from '../App';
import { observer } from 'mobx-react-lite';


type Show={
    log: number;
    setLog:(c: number) => void;
  }

export const LogContext=createContext<Show>({
    log:0,
    setLog:()=>{},
});


function Module(){
    const {showmodule,setShowmodule}=useContext(ModuleContext);
    const [log,setLog]=useState(0);

    function showTab(i:number):ReactElement{
        if(i===0){
          return <LoginForm/>
        }
        else{
          return <RegForm/>
        }
    }

    const changeTab=()=>{
        setShowmodule(false)
    }

    return(
        <LogContext.Provider value={{log,setLog}}>
            <div className="windows" style={{display: !showmodule? 'none': 'flex'}} onClick={()=>changeTab()}>
                {showTab(log)}
            </div>
        </LogContext.Provider>
        
       
    );
}

export default observer(Module)