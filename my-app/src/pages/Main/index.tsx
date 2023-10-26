import React, { FC, useEffect, useState } from 'react';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { PATHS } from '../../router';
import './styles.css'
import '../../App.css'
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { Context } from '../..';
import { ForgContext, ModuleContext } from '../../App';



const Main:FC=()=>{
    window.scrollTo(0,0);
    const {store}=useContext(Context)
    const {showmodule,setShowmodule}=useContext(ModuleContext);
    const {showforg,setShowforg}=useContext(ForgContext);
    return(
        <div className='wrapper'>
            <div className='content'>
                <NavBar/>
            <div className="Main">
            <div className="testPart">
                    <div className="container">
                        <div className="test_row">
                            <div className="test_body">
                                <p>Вам кажется, что в достигнутом нет Вашей заслуги?</p>
                                <div className="test_title">
                                    <p>Синдром самозванца - это чувство неуверенности,</p>
                                    <p>связанное с рабочими достижениями.</p>
                                </div>
                                <div className="test_subtitle">
                                    <p>Считаете это удачным стечением обстоятельств или</p>
                                    <p>сторонней помощью?</p>
                                    <Link to={PATHS.TEST} className="test_button" style={{display:store.isAuth===true?'block':'none'}}>Пройти тест</Link>
                                    <p className='test_button' style={{display:store.isAuth===false?'block':'none',cursor:'pointer'}} onClick={()=>setShowmodule(true)}>Пройти тест</p>
                                    
                                </div>
                                    
                            </div>
                            <div className="test_image">
                                    <img src="pic2.png" alt=''></img>
                            </div>
                
                    </div>
                    </div>
                </div>
                
                <div className="infoPart">
                    <div className="info_block">
                        <div className="info_points" style={{display:'none'}}>
                            <img src="points.png" alt=''></img>
                        </div>
                    </div>
                    <div className="container">
                    
                        <div className="info_row">
                            <div className="info_body">
                                <div className="info_title">
                                    <p>Подробнее о синдроме</p>
                                </div>
                                <div className="info_text">
                                    <p>Синдром самозванца(феномен самозванца) был впервые описан в книге доктора Паулины Клэнс и доктора Сюзанны Аймс “The Impostor Phenomenon in High-Achieving Women: Dynamics and Therapeutic Intervention”. 
                                    </p>
                                    <p>При подготовке этой книги, опубликованной<br></br>
                                        в 1978 году, были опрошены 150 женщин, получивших признание за высокие достижения в карьере. Тем не менее, многие из них думали, что своим успехом они обязаны удаче или их достижения переоцененны. . . . 
                                    </p>
                                </div>
                            </div>
                                <div className="info_circle">
                                    <img src="cicle2.png" alt=''></img>
                                </div>
                        </div>
                        
                    </div>
                        
                </div>
                <div className="specPart">
                    <div className="container">
                        <div className="spec_body">
                            <div className="spec_title">
                                <p>Помощь специалистов</p>
                            </div>
                            <div className="spec_line"></div>
                            <div className="spec_text">
                                <p>Справиться с синдромом самозванца сложно. Если вы чувствуете себя самозванцем, поделиться с кем-то этим очень трудно. Какими не были ваши <br></br>чувства и ситуация, в которой вы оказались, знайте, вы не одиноки, 62% <br></br> работников по всему миру испытывают синдром самозванца. 
                                    </p>
                                <p>
                                    Разумеется, справимся с этим в одиночку очень трудно, именно поэтому наш сервис предоставляет вам возможность записаться <br></br> к специалисту.
                                </p>
                            </div>
                        </div>
                        <div className="spec_row">
                            <div className="spec_p1">
                                <div className="spec_p">
                                    <div className="spec_info">
                                        <div className="spec_t">
                                            <p>Василий Муркович</p>
                                            <p>Достижения: 1 раз был на лекции в 8 утра</p>
                                            <p>Опыт работы: все 9 жизней</p>
                                            <p>Контактная информация: 8-800-555-35-35</p>
                                            <p>Оплату принимаю вискасом</p>
                                        </div>
                                    </div>
                                    <div className="spec_photo">
                                        <img src="spec.jpg" alt=''></img>
                                    </div>
                                </div>
                            </div>
                            <div className="spec_p2">
                                <div className="spec_p">
                                    <div className="spec_info">
                                        <div className="spec_t">
                                            <p>Василий Муркович</p>
                                            <p>Достижения: 1 раз был на лекции в 8 утра</p>
                                            <p>Опыт работы: все 9 жизней</p>
                                            <p>Контактная информация: 8-800-555-35-35</p>
                                            <p>Оплату принимаю вискасом</p>
                                        </div>
                                    </div>
                                    <div className="spec_photo">
                                        <img src="spec.jpg" alt=''></img>
                                    </div>
                                </div>
                            </div>
                            <div className="spec_p3">
                                <div className="spec_p">
                                    <div className="spec_info">
                                        <div className="spec_t">
                                            <p>Василий Муркович</p>
                                            <p>Достижения: 1 раз был на лекции в 8 утра</p>
                                            <p>Опыт работы: все 9 жизней</p>
                                            <p>Контактная информация: 8-800-555-35-35</p>
                                            <p>Оплату принимаю вискасом</p>
                                        </div>
                                    </div>
                                    <div className="spec_photo">
                                        <img src="spec.jpg" alt=''></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        </div>

            </div>
            <Footer/>
        </div>
    )
}

export default observer(Main)