import React, { FC, useState, useEffect,useContext} from 'react';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import PsyCard from '../../components/PsyCard';
import './styles.css'
import { IUser } from '../../models/response/IUser';
import UserService from '../../services/UserService';
import { Context } from '../..';
import Loading from '../../components/Loading';

const Catalog:FC=()=>{
    const [psychologists,setPsychologists]=useState<IUser[]>([]);
    const getPsy=async()=>{
        try{
            const response=await UserService.fetchPsys();
            setPsychologists(response.data);
        }catch(e){
            console.log(e);
        }
    }
    useEffect(() => {
        let ignore = false;

        if (!ignore){ 
            getPsy()
            ignore=true;}
},[]);


if (psychologists.length===0){
        return <Loading/>;
}

    return(
        <div className='wrapper'>
            <div className='content'>
                <NavBar/>
     
                <div className='CatalogPart'>
                    <div className='container'>
                        <div className='CatalogTitle'>
                            <p onClick={()=>console.log(psychologists[2])}>Психологи</p>
                        </div>
                        <div className='CatalogPsy_blocks'>
                          {psychologists.map(psy=>
                            <PsyCard psy={psy} />
                            )}
                        </div>
                    </div>
                </div>
               


               
            </div>
            <Footer/>
        </div>
        
    )
}

export default Catalog;