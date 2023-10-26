import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import UserModel, { asks } from '../../models/TestModel';
import './styles.css'
import { PATHS } from '../../router';
import Footer from '../../components/Footer';

const Test:FC=()=>{
    const [umod,setUmod]=useState<UserModel>(new UserModel());
    const [count,setCount]=useState<number>(0);
    const [err,setErr]=useState<Boolean>(false);
    const [rezult,setRezult]=useState<Boolean>(false);

    function OnClickVariant(value:number,step:number){
        const copy  = Object.assign({}, umod);
        if(copy.answer[step]===-1){
            setCount(count+1);
        }
        setErr(false);
        if(copy.answer[step]!==-1){
            copy.score-=copy.answer[step];
        }
        
        copy.answer[step]=value;
        copy.score+=value;
        setUmod(copy);
        console.log(umod);
    }

    const showRezult=()=>{
        if(count!=20){
            setErr(true);
        }
        else{
            window.scrollTo(0,0);
            setRezult(true);
        }
    }


    return(
        <div className='wrapper'>
            <div className='content'>
                <NavBar/>
                <div className='TestPart' style={{display:rezult?'none':'block'}}>
                    <div className='container'>
                        <div className='TestTitle'>
                        <p>Шкала феномена самозванца Паулины Кланс</p>
                        </div>
                        <div className='test_info'>
                            <span>Инструкция. </span>
                            Пожалуйста, прочтите каждое утверждение и оцените, насколько оно подходит вам, выбрав нужный пункт. Лучше, если выбудете отвечать быстро, а не обдумывать тщательно каждый ответ. 
                        </div>
                       <div className='test_blocks'>
                        {
                        asks.map((text,index)=>( 
                            <div className='test_block'>
                                 <div className='test_ask'  key={text}>
                                   
                                    {text}
                        </div>
                        <div className='test_vars'>
                            <div className='test_row'>
                                <div className='test_var'>
                                    <div className={1===umod.answer[index]? "circle_choosed":"test_circle"} onClick={()=>OnClickVariant(1,index)}></div>
                                    <div className='test_text'>Никогда</div>
                                </div>
                                <div className='test_var'>
                                    <div className={2===umod.answer[index]? "circle_choosed":"test_circle"} onClick={()=>OnClickVariant(2,index)}></div>
                                    <div className='test_text'>Редко</div>
                                </div>
                                <div className='test_var'>
                                    <div className={3===umod.answer[index]? "circle_choosed":"test_circle"} onClick={()=>OnClickVariant(3,index)}></div>
                                    <div className='test_text'>Иногда</div>
                                </div>
                                <div className='test_var'>
                                    <div className={4===umod.answer[index]? "circle_choosed":"test_circle"} onClick={()=>OnClickVariant(4,index)}></div>
                                    <div className='test_text'>Часто</div>
                                </div>
                                <div className='test_var'>
                                    <div className={5===umod.answer[index]? "circle_choosed":"test_circle"} onClick={()=>OnClickVariant(5,index)}></div>
                                    <div className='test_text'>Очень часто</div>
                                </div>
                            </div>
                        </div>
                            </div>
                       
))}
                       </div>
                       <div className='error_msg' style={{display:err===true?'block':'none'}}>Вы ответили не на все вопросы</div>
                        <div className='test_btn' onClick={()=>showRezult()}>
                            <p>Готово</p>
                        </div>
                            
                        </div>
                    </div>
                    <div className='RezultPart' style={{display:!rezult?'none':'block'}}>
                        <div className="container">
                            <div className="rezult_info">
                                <span>Убедительная просьба. </span>
                                Если Вам необходима помощь и(-или) Вы не уверены в результате, запишитесь на консультацию с психологом.
                            </div>
                            <div className="rezult_body">
                                <div className="rezult_progress">
                                    <div className="rezult_bar" style={{width:`${umod.score}%`}}>
                                        <div className="rezult_score">
                                            <p>{umod.score}%</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="rezult_text">
                                <p style={{display:umod.score<=40? 'block':'none'}}>Вы не обладаете характеристиками самозванца</p>
                                <p style={{display:(umod.score>=41&&umod.score<=60)? 'block':'none'}}>У вас средняя степень выраженности феномена самозванца</p>
                                <p style={{display:(umod.score>=61&&umod.score<=80)? 'block':'none'}}>Вы обладаете выраженными характеристиками феномена самозванца</p>
                                <p style={{display:umod.score>=80? 'block':'none'}}>Вы обладаете ярко выраженными характеристиками феномена самозванца</p>
                                </div>
                            </div>
                            <div className="rezult_recommend">
                                <div className="recommend_text">Хочешь убедиться в достоверности результатов? Обращайся к нашему психологу.</div>
                                <div className="recommend_link">
                                    <p><Link to={PATHS.CATALOG}>Записаться</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <Footer/>
            </div>
    )
}

export default Test