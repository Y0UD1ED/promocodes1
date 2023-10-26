
import { FC, createContext, useContext, useState } from "react";
import { ContactsContext } from "./Footer";
import { Context } from "..";


const MoreContact=({showcontacts,setShowcontacts,writeInfo})=>{
    const {store}=useContext(Context)
return(
    <div className="Contacts" style={{display:showcontacts?'flex':'none'}} onClick={()=>setShowcontacts(false)}>
          <div className='notification' onClick={e=>e.stopPropagation()}>
                    <div className='notif_title'>Запись</div>
                        <div className='notif_text' style={{lineHeight:'2'}}>Время: {writeInfo.time} </div>
                        <div className='notif_text' style={{lineHeight:'2',display:store.user.role==="psychologist"?'block':'none'}}>Контакты: {writeInfo.contact} </div>
                        <div className='ForgetPass_btn'>
                            <button onClick={()=>setShowcontacts(false)}>Закрыть</button>
                        </div>
                    </div>
    </div>

)
}

export default MoreContact;

//div className='notif_text' style={{lineHeight:'2'}}>Контакты: +79195237808<br/>Время: 20:00</div>