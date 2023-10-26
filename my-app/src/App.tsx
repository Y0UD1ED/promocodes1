import React, { FC, createContext, useEffect, useState } from 'react';
import { Context } from '.';

import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { PATHS, router } from './router';
import './App.css'
import Loading from './components/Loading';
import Account from './pages/Account';
import { PrivateRoute } from './router/PrivateRouter';
import  Module  from './components/Module';
import ForgetPassword from './components/ForgetPassword';

type ShowModule={
    showmodule: Boolean;
    setShowmodule:(c: boolean) => void;
}

export const ModuleContext=createContext<ShowModule>({
showmodule:true,
setShowmodule:()=>{},
});


type ShowForget={
showforg: Boolean;
setShowforg:(c: boolean) => void;
}

export const ForgContext=createContext<ShowForget>({
showforg:false,
setShowforg:()=>{},
});




const App: FC = () => {
    const [showmodule,setShowmodule]=useState(false);
    const [showforg,setShowforg]=useState(false);
    const { store } = useContext(Context);
    const [udpate,setUpdate]=useState(false);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [middleName, setMiddleName]=useState<string>('');
    const [aboutMe, setAboutMe]=useState<string>('');
    const [exp,setExp]=useState<string>('');
    const [contact,setContact]=useState<string>('');
    const [achive,setAchive]=useState<string>('');
    

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    if (store.isLoading) {
        return <Loading/>;
    }


        return (
            <ModuleContext.Provider value={{showmodule,setShowmodule}}>
                <ForgContext.Provider value={{showforg,setShowforg}}>
                
            <div>
                <BrowserRouter>
                {router()}
                <Module/>
                <ForgetPassword/>
                </BrowserRouter>
            </div>
                </ForgContext.Provider>
             </ModuleContext.Provider>
        );
    

    

/*return (
        <div className="App">
            <h1>{`Пользователь авторизован ${store.user.email}`}</h1>
            <h1>{`Имя: ${store.user.firstName}`}</h1> {/Отображение имени пользователя }
            <h1>{`Фамилия: ${store.user.lastName}`}</h1> { Отображение фамилии пользователя }
            <h1>{`Отчество: ${store.user.middleName}`}</h1> { Отображение отчества пользователя }
            <h1>{`Роль:${store.user.role}`}</h1>
            <h1 style={{display:store.user.role==="user"?'block':'none'}}>{`Обо мне: ${store.user.aboutMe}`}</h1> {Отображение o пользователe }

            <div style={{display:store.user.role==="user"?'none':'block'}}>
                <h1>{`Опыт работы: ${store.user.experience}`}</h1>
                <h1>{`Контактный номер: ${store.user.contactInfo}`}</h1>
                <h1>{`Достижения:${store.user.achievements}`}</h1>
            </div>

            <button onClick={() => store.logout()}>Выйти</button>

            <div style={{display:store.user.role==="user"?'block':'none'}}>
                <div>
                    <button onClick={() => store.creatCode()}>Create</button>
                    <div>{`${store.code}`}</div>
                </div>
                <div>
                    <input placeholder='promocode' onChange={(e) => store.setCheck(e.target.value)}></input>
                <button onClick={() => store.checkCode()}>Check</button>
                <div>{`${store.check}`}</div>
                <div>{`${store.message}`}</div>
                </div>
                
                
            </div>


            <div className="changeUser" style={{display:store.user.role==="user"?'block':'none'}}>
                <button onClick={()=>setUpdate(true)}>Изменить данные</button>
                <button onClick={()=>setUpdate(false)}>Закрыть окно изменения данных</button>
                <div style={{display:udpate? 'block':'none'}}>
                <input placeholder={store.user.firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                <input placeholder={store.user.lastName} onChange={(e) => setLastName(e.target.value)}></input>
                <input placeholder={store.user.middleName} onChange={(e) => setMiddleName(e.target.value)}></input>
                <input placeholder={store.user.aboutMe} onChange={(e) => setAboutMe(e.target.value)}></input>
               <a href='/'>
               <button onClick={()=>store.updateUserInfo(firstName, lastName, middleName, aboutMe)}>Подтвердить</button>
               </a>
                </div>
            </div>

            <div className="changeUser" style={{display:store.user.role==="user"?'none':'block'}}>
                <button onClick={()=>setUpdate(true)}>Изменить данные</button>
                <button onClick={()=>setUpdate(false)}>Закрыть окно изменения данных</button>
                <div style={{display:udpate? 'block':'none'}}>
                <input placeholder={store.user.firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                <input placeholder={store.user.lastName} onChange={(e) => setLastName(e.target.value)}></input>
                <input placeholder={store.user.middleName} onChange={(e) => setMiddleName(e.target.value)}></input>
                <input placeholder={store.user.experience} onChange={(e)=>setExp(e.target.value)}></input>
                <input placeholder={store.user.contactInfo} onChange={(e)=>setContact(e.target.value)}></input>
                <input placeholder={store.user.achievements} onChange={(e) => setAchive(e.target.value)}></input>
               <a href='/'>
               <button onClick={()=>store.updatePsychologistInfo(firstName, lastName, middleName, exp, contact, achive)}>Подтвердить</button>
               </a>
                </div>
            </div>

        </div>
    );*/
};

export default observer(App);
