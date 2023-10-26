import React, { FC,useContext} from 'react';
import { IDate } from '../models/response/IDate';
import { Context } from '..';
import { observer } from 'mobx-react-lite';




function PsyDate({DateI}){
    const {store}=useContext(Context)

    const deleteDate=async()=>{
        await store.deleteDate(DateI.date,DateI.time).then( window.location.reload())
       
    }
    return(
        <div className="DateCard">
            <div className="date_row">
            <div className="date_check">
                <div className="date_btn"></div>
                <div className='date_date'>{'Дата: '+DateI.date} </div>
            </div>
            
                <div className="date_time">{'Время: '+DateI.time}</div>

                <div className="date_btns">
                <div className="date_cancel">
                    <p onClick={()=>deleteDate()}>Удалить</p>
                </div>
                </div>
                
                
            </div>
        </div>
    )
}

export default observer(PsyDate)