import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useState } from "react";
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { PATHS } from '../router';
import { ForgContext, ModuleContext } from '../App';

const ForgetPassword: FC=()=>{
    const {showforg,setShowforg}=useContext(ForgContext);
    const input_text=['Введите почту для подтверждения смены пароля','Введите код подтверждения','Введите новый пароль'];
    const forget_title=['Забыли пароль?','Забыли пароль?','Восстановление пароля','Восстановление пароля'];
    const btn_text=['Подтвердить','Подтвердить','Подтвердить','Закрыть'];
    const [index,setIndex]=useState<number>(0);
    const [code,setCode]=useState<string>('');
    const [mail,setMail]=useState<string>('');
    const [newpass,setNewpass]=useState<string>('');
    const {store}=useContext(Context);

    const onchangeBtn=async()=>{
        store.setError(false);
        if(index===3){
            setIndex(0);
            setShowforg(false);
        }
        else{
            if(index===0){
                await store.forgotPassword(mail);
                if(store.error===false){
                    setIndex(index+1)
                }
            }
            else if(index===1){
                if(store.helpCode===code){
                    setIndex(index+1)
                }
                else{
                    store.setError(true);
                    store.setErrorMessage('Неверный код!')
                }
            }
            else{
                await store.resetPassword(mail,newpass);
                setIndex(index+1)
            }
           
            
        }
    }

    const onClickWindow=()=>{
        store.setError(false);
        setIndex(0);
        setShowforg(false);
    }
    const onChangeInput=(value:string)=>{
        if(index===0){
            setMail(value);
        }
        else if(index===1){
            setCode(value);
        }
        else{
            setNewpass(value);
        }
    }
    return(
            <div className='ForgetPassword'  style={{display: showforg===false? 'none': 'flex'}} onClick={()=>onClickWindow()}>
                <div className='notification' onClick={e=>e.stopPropagation()}>
                    <div className='notif_title'>{forget_title[index]}</div>
                    <div className='ForgetPass_input'>
                        <input style={{display:index===0?'block':'none'}} placeholder={input_text[index]} 
                                type='text' onChange={(e)=>setMail(e.target.value)}>
                        </input>
                        <input style={{display:index===1?'block':'none'}} placeholder={input_text[index]} 
                                type='text' onChange={(e)=>setCode(e.target.value)}>
                        </input>
                        <input style={{display:index===2?'block':'none'}} placeholder={input_text[index]} 
                                type='text' onChange={(e)=>setNewpass(e.target.value)}>
                        </input>
                        <div className='notif_text' style={{display:index!==3?'none':'block'}}>Пароль успешно изменен!</div>
                       
                        <div className='ForgetPass_btn'>
                            <button onClick={()=>onchangeBtn()}>{btn_text[index]}</button>
                        </div>
                        <div className='errors' style={{display:store.error?'block':'none'}}>{store.errorMessage}</div>

                    </div>
                </div>

        </div>
        
    )
}

export default observer(ForgetPassword);