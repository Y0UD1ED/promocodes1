import React, { FC,useContext,useState } from 'react';
import MoreContact from './MoreContact';
import { Context } from '..';
import AuthService from '../services/AuthService';



function WriteCard({write}){
    const [hideWrite,setHideWrite]=useState(false)
    const [showMore,setShowMore]=useState(false)
    const {store}=useContext(Context)
    const role=store.user.role==="psychologist"?"Сотрудник":"Психолог";
    const [color,setColor]=useState(0)
    const tryDelete=async()=>{
        await AuthService.deleteWrite(write.from,write.to,write.date,write.time)
        window.location.reload()
    }
    return(
        <div className="WriteCard" style={{display:!hideWrite?'block':'none'}}>
            <div className="card_row">
                <div className="card_text">
                    <div className="card_name">{store.user.role==="psychologist"?write.nameUser:write.namePsy}</div>
                    <div className="card_role">{role}</div>
                </div>
                <div className="card_check">
                    <div className="card_btn" onClick={()=>setColor((color+1)%3)} style={{display:color===0?'block':'none'}}></div>
                    <div className="card_btnBlue" onClick={()=>setColor((color+1)%3)} style={{display:color===1?'block':'none'}}></div>
                    <div className="card_btnGreen" onClick={()=>setColor((color+1)%3)} style={{display:color===2?'block':'none'}}></div>
                    <div className="card_time">{write.date}</div>
                </div>
                <div className="card_btns">
                <div className="card_cancel">
                    <p onClick={()=>tryDelete()}>Отменить</p>
                </div>
                <div className="card_contact" /*style={{display:user? 'block':'none'}}*/ onClick={()=>setShowMore(true)}>
                    <p>Больше</p>
                </div>
                </div>
                <MoreContact showcontacts={showMore} setShowcontacts={setShowMore} writeInfo={write}/>
            </div>
        </div>
    )
}

export default WriteCard