import React, { FC, ReactElement, useState } from 'react';
import Books from '../../components/Books';
import Footer from '../../components/Footer';
import InfoIntro from '../../components/InfoIntro';
import InfoPeople from '../../components/InfoPeople';
import InfoTrigger from '../../components/InfoTrigger';
import InfoTypes from '../../components/InfoTypes';
import NavBar from '../../components/NavBar';
import './styles.css'

const Info:FC=()=>{
    const [info,setInfo]=useState(0);

    function showInfo(i:number):ReactElement{
      if(i===0){
        return <InfoIntro/>
      }
      else if(i===1){
        return <InfoTrigger/>
      }
      else if(i===2){
  
        return <InfoTypes/>
      }
      return <InfoPeople/>
    }
    
    return (
      <div className="wrapper">
        <div className="content">
        <NavBar />
          <div className="InfoPart">
          <div className="container">
              <div className="types_sidebar">
                  <div className="side_row">
                      <p style={{fontWeight:info===0? '900':'300',borderBottom: info===0?'4px #448B92 solid':'none'}} onClick={()=>setInfo(0)}>Вступление</p>
                      <p style={{fontWeight:info===1? '900':'300',borderBottom: info===1?'4px #448B92 solid':'none'}} onClick={()=>setInfo(1)}>Причины и триггеры</p>
                      <p style={{fontWeight:info===2? '900':'300',borderBottom: info===2?'4px #448B92 solid':'none'}} onClick={()=>setInfo(2)}>Типы самозванцев</p>
                      <p style={{fontWeight:info===3? '900':'300',borderBottom: info===3?'4px #448B92 solid':'none'}} onClick={()=>setInfo(3)}>Люди в зоне риска</p>
                  </div>
                  <div className="side_border"></div>
                </div>
                  {showInfo(info)};
                </div>
          </div>
          <Books/>

        </div>
        <Footer/>
      </div>
      
    );
}

export default Info