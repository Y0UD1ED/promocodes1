import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useState } from "react";
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { PATHS } from '../router';
import { LogContext } from './Module';
import { ForgContext, ModuleContext } from '../App';



function LoginForm(){
    const navigate = useNavigate();
    const { store } = useContext(Context);
    const {log,setLog}=useContext(LogContext)
    const {showforg,setShowforg}=useContext(ForgContext);
    const {showmodule,setShowmodule}=useContext(ModuleContext)
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');



    const tryLogIn = async () =>{
        if(email===""||password===""){
            store.setError(true);
            store.setErrorMessage("Заполнены не все поля!")
        }
        else{
            store.setError(false);
            await store.login(email,password);
        }
        if(store.error===false){
            setShowmodule(false);
            setEmail('');
            setPassword('');
            navigate('/user');
        }
    } 
  
    const ShowForg=()=>{
        store.setError(false);
        setShowforg(true);
        setShowmodule(false);

    }

    function changeWindow() {
        store.setError(false);
        setLog(1);
    }

    return(
            <div className="LoginForm" onClick={e=>e.stopPropagation()}>
            <div className="login_title">
                <div className="login_row">
                    <p onClick={()=>changeWindow()}>Регистрация</p>
                    <div className="login_border"></div>
                    <p style={{fontWeight: '400', borderBottom: '2px black solid'}}>Авторизация</p>
                </div>
            
            </div>
            <div className="login_inputs">
                <input 
                type="text" 
                placeholder="Почта" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}>
                </input>
                <input 
                type="password" 
                placeholder="Пароль"
                onChange={(e) => setPassword(e.target.value)}
                value={password}>
                </input>
            </div>

        
            
            <button onClick={() => tryLogIn()}>Войти</button>

            <div className='errors' style={{display:store.error===false?'none':'block'}}>{store.errorMessage}</div>

            <p className='forget_pass' onClick={()=>ShowForg()}>Забыли пароль?</p>

           
            </div>

        
   
);
}

export default observer(LoginForm)