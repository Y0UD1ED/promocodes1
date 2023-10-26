
import { FC, createContext, useContext, useState } from "react";
import { ContactsContext } from "./Footer";


const Contacts:FC=()=>{
    const {showcontacts,setShowcontacts}=useContext(ContactsContext);
return(
    <div className="Contacts" style={{display:showcontacts?'flex':'none'}} onClick={()=>setShowcontacts(false)}>
          <div className='notification' onClick={e=>e.stopPropagation()}>
                    <div className='notif_title'>Связаться с нами</div>
                        <div className='notif_text' style={{lineHeight:'2'}}>Вы можете обратиться к нам с помощью или предложением по почте: <br/>crewimposter@gmail.com</div>
                       
                        <div className='ForgetPass_btn'>
                            <button onClick={()=>setShowcontacts(false)}>Закрыть</button>
                        </div>
                    </div>
    </div>

)
}

export default Contacts;