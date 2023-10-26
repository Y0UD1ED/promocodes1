
import { FC, createContext, useContext, useState } from "react";
import { ContactsContext } from "./Footer";
import { ResultContext } from "./WriteForm";
import { useNavigate } from "react-router-dom";


const Result:FC=()=>{
    const {showresult,setShowResult}=useContext(ResultContext);
return(
    <div className="Contacts" style={{display:showresult?'flex':'none'}} onClick={()=>setShowResult(false)}>
          <div className='notification' onClick={e=>e.stopPropagation()}>
                    <div className='notif_title'>Запись к психологу</div>
                        <div className='notif_text' style={{lineHeight:'2'}}>Успех! Вы записались. В вашем кабинете появится информация о записи</div>
                       
                        <div className='ForgetPass_btn'>
                            <button onClick={()=>window.location.reload()}>Закрыть</button>
                        </div>
                    </div>
    </div>

)
}

export default Result;