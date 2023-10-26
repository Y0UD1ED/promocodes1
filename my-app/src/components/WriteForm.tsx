import React, { FC, useState,useContext,useEffect, createContext } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import { IUser } from '../models/response/IUser';
import { Context } from '..';
import AuthService from '../services/AuthService';
import Result from './Result';
import { PsyContext } from './PsyCard';
import { observer } from 'mobx-react-lite';
registerLocale('ru', ru)

type ShowResult={
    showresult:boolean;
    setShowResult:(c:boolean)=>void;
}

export const ResultContext=createContext<ShowResult>({
    showresult:false,
    setShowResult:()=>{},
})



function WriteForm(){
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [contact,setContact]=useState<string>('');
    const {store}=useContext(Context);
    const [startTime,setStartTime]=useState<Date>(new Date());
    const [freeTimes,setFreeTimes]=useState<string[]>([]);
    const {email,name,freeDates}=useContext(PsyContext)

    const [showresult,setShowResult]=useState(false)

const isFreeDay=(date:Date)=>{
    //const currentDate = new Date();
    //return (currentDate.getMonth() < date.getMonth())||(currentDate.getDate()<date.getDate()&&currentDate.getMonth() <= date.getMonth());
    const d=date.toLocaleDateString();
     return Array.from(freeDates).indexOf(d)!=-1;

}


const isFreeTime=(date:Date)=>{
    //const currentDate = new Date();
    //const selectedDate = new Date(date);
    //return currentDate.getTime() < selectedDate.getTime();
    const t=date.toLocaleTimeString([],{
        hour: '2-digit',
        minute: '2-digit'});
    return Array.from(freeTimes).indexOf(t)!=-1;

}
    const changeDate=async(date:Date)=>{
        const response =await AuthService.getFreeTime(email,date.toLocaleDateString());
        setFreeTimes(response.data)
        setStartDate(date);
        console.log(freeTimes)

    }

    const changeTime=async(date:Date)=>{
        //const response =await AuthService.getFreeTime(store.user.email,date.toLocaleDateString());
        //setFreeTimes(response.data)
        setStartTime(date);

    }

    const tryWrite=async()=>{
        store.setError(false);

        const date=startDate.toLocaleDateString();
        const time=startTime.toLocaleTimeString([],{
          hour: '2-digit',
          minute: '2-digit'});
        
        const flag1=Array.from(freeDates).indexOf(date);
        const flag2=Array.from(freeTimes).indexOf(time);
        if(contact===""){
            store.setError(true);
            store.setErrorMessage("Введите контакты!")
            return;
        }
        if(flag1==-1||flag2==-1){
            store.setError(true);
            store.setErrorMessage("Выбранное время недоступно для выбора.")
            return;
        }
   
        await store.addWrite(email,name,date,time,contact)
        setShowResult(true)
        //const day=startDate.toLocaleDateString();
        //const time=startTime.toLocaleTimeString();
        //await store.addWrite(psy.psy.email,name,day,time,contact);
        
    }
    return(
        <ResultContext.Provider value={{showresult,setShowResult}}>
<div className="WriteForm" onClick={e=>e.stopPropagation()}>
        <div className="write_title">Запись</div>
        <div className="write_form">
            {/* <input 
                type="text" 
                className="write_input" 
                name="person_name"
                placeholder="ФИО"
                onChange={(e)=>setName(e.target.value)}></input> */}
            <input 
                type="text" 
                className="write_input" 
                name="person_contact" 
                placeholder="Данные, через которые можно с вами связаться"
                onChange={(e)=>setContact(e.target.value)}></input>
            <p>Выбрать день приема</p>
            <div className='customDatePickerWidth'> 
            <DatePicker 
                locale="ru" 
                selected={startDate} 
                onChange={(date) => date&&changeDate(date)}
                filterDate={isFreeDay} /></div>
          
            <p>Выбрать время приема</p>
 
            <DatePicker
                    locale="ru"
                    selected={startTime}
                    onChange={(date) =>date&& changeTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    filterTime={isFreeTime}
                    timeCaption="Время"
                    dateFormat="h:mm"
                    />
            <div className="form_btn" onClick={()=>tryWrite()}>Подтвердить</div>
            <div className="errors" style={{display:store.error?'block':'none'}}>{store.errorMessage}</div>
        </div>
        
        <Result/>
         
    </div>
        </ResultContext.Provider>
        
    )
}

export default observer(WriteForm)