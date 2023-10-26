import React, { FC, ReactElement, useEffect, useRef, useState} from 'react';


import { Context } from '../..';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { useContext } from 'react';
import PsyAccount from '../../components/PsyAccount';
import UserAccount from '../../components/UserAccount';
import './styles.css'
import { observer } from 'mobx-react-lite';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { PATHS } from '../../router';



    

const Account:FC=()=>{
    const navigate=useNavigate()
    window.scrollTo(0,0);
    const { store } = useContext(Context);
    const user=store.user.role;
    function showUser(user:string):ReactElement{
        if(user==="psychologist"){
            return <PsyAccount/>
        }
        else{
            return <UserAccount/>
        }
    }


return(
        <div className='wrapper'>
            <div className='content'>
                <NavBar/>
                    <div className='UserPart'>
                        <div className='container'>
                            {showUser(user)}
                            
                        </div>
                    </div>

            </div>
            <Footer/>
        </div>
    )
}


export default observer(Account)