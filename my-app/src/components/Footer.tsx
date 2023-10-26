import React, { FC, createContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '../router';
import Contacts from './Contacts';

type ShowContacts={
    showcontacts:boolean;
    setShowcontacts:(c:boolean)=>void;
}

export const ContactsContext=createContext<ShowContacts>({
    showcontacts:false,
    setShowcontacts:()=>{},
})


const Footer:FC=()=>{
    const [showcontacts,setShowcontacts]=useState(false)
    return(
        <ContactsContext.Provider value={{showcontacts,setShowcontacts}}>
            <div className="Footer">
            <div className="container">
                <div className="footer_row">
                <p><Link to={PATHS.PRIVACY}>Политика конфиденциальности</Link></p>
                <p onClick={()=>setShowcontacts(true)}>Связаться</p>
                <p><Link to={PATHS.CONDITIONS}>Условия и положения</Link></p>
            </div>
            <div className="footer_style">
                <img src="палочка.png" alt=""></img>
            </div>
            </div>
            <Contacts/>
        </div>
        </ContactsContext.Provider>
        
    )
}

export default Footer