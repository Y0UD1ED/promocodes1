import React, { FC, useState,createContext, useContext } from 'react';
import WriteForm from './WriteForm';
import { IUser } from '../models/response/IUser';
import AuthService from '../services/AuthService';
import { ModuleContext } from '../App';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

interface PsyI{
    psy:IUser;
}

type PsyC={
    email:string;
    name:string;
    freeDates:string[];
}

export const PsyContext=createContext<PsyC>({
    email: "",
    name: "",
    freeDates:[],
})


function PsyCard(psy:PsyI){
    const {showmodule,setShowmodule}=useContext(ModuleContext);
    const {store}=useContext(Context)
    const email=psy.psy.email
    const name=psy.psy.lastName+' '+ psy.psy.firstName;
    const[write,setWrite]=useState(false);
    const [freeDates,setFreeDates]=useState<string[]>([]);
    const avatar=psy.psy.avatar!==''?`http://www.crewimposter.ru:8000/${psy.psy.avatar}`:'spec.jpg';
    const getFreeDates=async()=>{
        try{
            store.setWaiting(true);
            const response=await AuthService.getFreeDate(email);
            setFreeDates(response.data);
        }catch(e){
            console.log(e);
        }finally{
            store.setWaiting(false);
        }
        setWrite(true)
    }
    return(
        <div className='CatalogPsy_block'>
        <div className='block_row'>
            <div className='Psy'>
                <div className='psy_row'>
                    <div className='PsyImage'>
                        <img src={avatar} alt='#'></img>
                    </div>
                    <div className='PsyInfo'>
                        <p>{psy.psy.lastName+' '+psy.psy.firstName+' '+ psy.psy.middleName}</p>
                        <p>{"Опыт работы: "+ (psy.psy.experience||"Не указано")}</p>
                        <p>{"Достижения: "+(psy.psy.achievements||"Не указано")}</p>
                    </div>
                </div>
                
            </div>
            <div className='Btn' style={{display:store.isAuth?'block':'none'}} onClick={()=>getFreeDates()}>
                    <div className='CatalogPsy_btn'>
                        <p>Записаться</p>
                    </div> 
            </div>
            <div className='Btn' style={{display:store.isAuth?'none':'block'}} onClick={()=>setShowmodule(true)}>
                    <div className='CatalogPsy_btn'>
                        <p>Записаться</p>
                    </div> 
            </div>
        </div>
        <PsyContext.Provider value={{email,name,freeDates}}>
        <div className='windows' style={{display: !write? 'none': 'flex'}} onClick={()=>setWrite(false)}>
                <WriteForm/>
            </div>
        </PsyContext.Provider>
            

    </div>
       
    );
}

export default observer(PsyCard)
