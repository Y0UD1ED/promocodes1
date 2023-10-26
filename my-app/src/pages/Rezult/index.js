import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import './styles.css'

const Rezult=()=>{
    const params=useParams();
    const scores=(params.id)-200
    window.scrollTo(0,0);
    return(
        <div className='wrapper'>
            <div className='content'>
                <NavBar/>
                <div className='RezultPart'>
                    <div className='container'>
                        <div className='rezult_title'>
                            <p>Результат</p>
                        </div>
                        <div className='rezult_body'>
                            <div className='rezult_score'>Ваши баллы: {scores}</div>
                            <div className='rezult_text'>
                                <p style={{display:scores<=40? 'block':'none'}}>Вы не обладаете характеристиками самозванца</p>
                                <p style={{display:(scores>=41&&scores<=60)? 'block':'none'}}>У вас средняя степень выраженности феномена самозванца</p>
                                <p style={{display:(scores>=61&&scores<=80)? 'block':'none'}}>Вы обладаете выраженными характеристиками феномена самозванца</p>
                                <p style={{display:scores>=80? 'block':'none'}}>Вы обладаете ярко выраженными характеристиками феномена самозванца</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rezult