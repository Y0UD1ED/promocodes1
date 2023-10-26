import React, { FC, useState } from 'react';
import { Context } from '..';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PATHS } from '../router';
import { observer } from 'mobx-react-lite';
import { LogContext } from './Module';
import { ModuleContext } from '../App';



function RegForm(){
    const navigate = useNavigate();
    const {log,setLog}=useContext(LogContext);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [role,setRole]=useState<string>("user");
    const { store } = useContext(Context);
    const {showmodule,setShowmodule}=useContext(ModuleContext)

    const handleRegistration = async () => {
        if(email===""||password===""||firstName===""||lastName===""){
            store.setError(true);
            store.setErrorMessage("Заполнены не все поля!")
        }
        else{

        store.setError(false)
        await store.registration(email, password, firstName, lastName,role);
        setFirstName('');
        setLastName('');
        }
        if(store.error===false){
            setShowmodule(false)
            store.login(email, password);
            navigate('/user');

        }
        
    };

     function changeWindow() {
        store.setError(false);
        setLog(0);
    }

    return(
        <div className="RegForm" onClick={e=>e.stopPropagation()}>
                <div className="login_title">
                    <div className="login_row">
                        <p style={{fontWeight:'400', borderBottom: '2px black solid'}}>Регистрация</p>
                        <div className="login_border"></div>
                        <p onClick={()=>changeWindow()}>Авторизация</p>
                    </div>
                   
                </div>
                <div className="reg_inputs">
                    <input type="text" 
                    placeholder="Имя пользователя"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}></input>
                    <input type="text" 
                    placeholder="Фамилия пользователя"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}></input>
                    <input 
                    type="text" 
                    placeholder="Почта"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}></input>
                    <input 
                    type="password" 
                    placeholder="Пароль"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}></input>
                </div>
                <div className='RegBox'>
                <input type="radio" value="psychologist" name="role" checked={role!=="user"} onClick={()=>setRole("psychologist")}/>
                <label htmlFor="psychologist">Психолог</label>
                <input type="radio" value="user" name="role" checked={role==="user"} onClick={()=>setRole("user")}/>
                <label htmlFor="user">Пользователь</label>
                </div>
               
                
             
                <button onClick={handleRegistration}>Создать аккаунт</button>
                <div className='errors' style={{display:store.error===false?'none':'block'}}>{store.errorMessage}</div>
            </div>
       
    );
}

export default observer(RegForm)