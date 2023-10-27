import React, { FC, useState,useContext, useRef,useEffect } from 'react';
import { FcAddImage } from "react-icons/fc";
import { Box, Modal, Slider, Button } from "@mui/material";
import AvatarEditor from "react-avatar-editor";
import { AiFillGithub } from "react-icons/ai";
import { Context } from '..';
import WriteCard from './WriteCard';
import { PATHS } from '../router';
import { Link } from 'react-router-dom';
import FileSaver from "file-saver";
import axios from 'axios'
import $api from "../http";
import PsyDate from './PsyDate';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import UserService from '../services/UserService';
import { observer } from 'mobx-react-lite';
import AuthService from '../services/AuthService';
registerLocale('ru', ru)



const boxStyle = {
    width: "300px",
    height: "300px",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center"
  };
  const modalStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  const CropperModal = ({ src, modalOpen, setModalOpen, setPreview}) => {
    const { store } = useContext(Context);
    const [slideValue, setSlideValue] = useState(10);
    const cropRef = useRef(null);
    const [file,setFile]=useState('');
  
    //handle save
    const handleSave = async () => {
      if (cropRef) {
        const dataUrl = cropRef.current.getImage().toDataURL();
        const result = await fetch(dataUrl);
        const blob = await result.blob();
        const file0 = new File([blob], 'file.jpg')
        setFile(file0)
      const formData = new FormData();
      formData.append('file', file0);
      
      await store.updateAvatar(formData);
        setPreview(URL.createObjectURL(blob));
        setModalOpen(false);
      }
      window.location.reload()
    };

    return (
        <Modal sx={modalStyle} open={modalOpen}>
          <Box sx={boxStyle}>
            <AvatarEditor
              ref={cropRef}
              image={src}
              style={{ width: "100%", height: "100%" }}
              border={90}
              borderRadius={60}
              width={275}
              height={350}
              color={[0, 0, 0, 0.72]}
              scale={slideValue / 10}
              rotate={0}
            />
    
            {/* MUI Slider */}
            <Slider
              min={10}
              max={50}
              sx={{
                margin: "0 auto",
                width: "80%",
                color: "cyan"
              }}
              size="medium"
              defaultValue={slideValue}
              value={slideValue}
              onChange={(e) => setSlideValue(e.target.value)}
            />
            <Box
              sx={{
                display: "flex",
                padding: "10px",
                border: "3px solid white",
                background: "black"
              }}
            >
              <Button
                size="small"
                sx={{ marginRight: "10px", color: "white", borderColor: "white" }}
                variant="outlined"
                onClick={(e) => setModalOpen(false)}
              >
                cancel
              </Button>
              <Button
                sx={{ background: "#5596e6" }}
                size="small"
                variant="contained"
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Modal>
      );
    };




const PsyAccount=()=>{
    const [tab,setTab]=useState(false)
    const { store } = useContext(Context);
    const [update,setUpdate]=useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName]=useState('');
    const avatar=store.user.avatar!==''?`http://www.crewimposter.ru:8000/${store.user.avatar}`:'spec.jpg'; 
    const [exp,setExp]=useState('');
    const [contact,setContact]=useState('');
    const [achive,setAchive]=useState('');

    const [startDate, setStartDate] = useState(new Date());
    const [startTime,setStartTime]=useState(new Date());

    const [psyDates,setPsyDates]=useState([]);

    const [src, setSrc] = useState(null);

    // preview
    const [preview, setPreview] = useState(null);
  
    // modal state
    const [modalOpen, setModalOpen] = useState(false);

    const [writes,setWrites]=useState([])
    const getWrites=async()=>{
        try{
            store.setWaiting(true);
            const response=await AuthService.getPsyWrites(store.user.email);
            setWrites(response.data);
            setTab(false)
        }catch(e){
            console.log(e);
        }finally{
          store.setWaiting(false)
        }
    }
    useEffect(() => {
        let ignore = false;

        if (!ignore){ 
            getWrites()
            ignore=true;}
},[]);

  
    // ref to control input element
    const inputRef = useRef(null);
  
    // handle Click
    const handleInputClick = (e) => {
      e.preventDefault();
      inputRef.current.click();
    };
    // handle Change
    const handleImgChange = (e) => {
      setSrc(URL.createObjectURL(e.target.files[0]));
      setModalOpen(true);
    };


    const change=async ()=>{

        await store.updatePsychologistInfo(firstName, lastName, middleName, exp, contact, achive)
        window.location.reload();
    }

    const addDate=async ()=>{
      const date=startDate.toLocaleDateString();
      const time=startTime.toLocaleTimeString([],{
        hour: '2-digit',
        minute: '2-digit'});
      const minute=startTime.getMinutes();
      if(filterDay(startDate)&&minute%15===0){
      await store.addDate(date,time)
      window.location.reload()
      }
  }

  const dateTab=async ()=>{
    const response=await UserService.fetchDates(store.user.email);
    setPsyDates(response.data);
    setTab(true);
}

const filterDay=(date)=>{
  const currentDate = new Date();
  return (currentDate.getMonth() < date.getMonth())||(currentDate.getDate()<date.getDate()&&currentDate.getMonth() <= date.getMonth())||(currentDate.getFullYear()<date.getFullYear());
  //const d=date.toLocaleDateString();
   //return Array.from(freeDates).indexOf(d)!=-1;

}


    return(
        <div className='PsyAccount'>
            <div className="UserInfo">
            <div className="user_row">
                <div className="user_avatar">
                    <div className="user_img">
                    <CropperModal
            modalOpen={modalOpen}
            src={src}
            setPreview={setPreview}
            setModalOpen={setModalOpen}
          />
          
          
          <div className="img-container">

          <div className='loadimg-container'>
                <a href="/" onClick={handleInputClick}>
                <FcAddImage className="add-icon" />
                </a>
                <input className='img_input'
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={handleImgChange}
              />
          </div>

            <img
              src={avatar}
              alt=""
              width="275"
              height="350"
            />
          </div>
                    </div>
                    <div className='user_tabs'>
                    <div className={tab?'tab_writes':'tab_writes_act'} onClick={()=>setTab(false)}>
                            <p>Запись</p>
                    </div>
                    <div className={tab?'tab_addDate_act':'tab_addDate'} onClick={()=>dateTab()}>
                      <p>Время</p>
                    </div>
                    
                    </div>
                    <button onClick={() => store.logout()} className='exit_btn'><Link to={PATHS.MAIN}>Выйти</Link></button>
                </div>
                <div className="user_text">
                    <div className="user_title">
                        <p>Личный кабинет</p>
                        <div className="user_change" onClick={()=>setUpdate(!update)}>
                    <img src='edit_btn.png' alt=""></img>
                        </div>
                        </div>
                    <div className="user_name" style={{display:update?'none':'block'}}>{store.user.lastName+' '+store.user.firstName+' '+store.user.middleName}</div>
                    <div className="user_info" style={{display:update?'none':'block'}}>
                        <p>Опыт работы: {store.user.experience}</p>
                        <p>Контактная информация: {store.user.contactInfo}</p>
                        <p>Почта: {store.user.email}</p>
                        <div>Достижения : {store.user.achievements}</div>
                        
                    </div>
                    <div className='user_change_info' style={{display:update? 'flex':'none'} }>
                    <div  className='user_change_inputs'>
                        <input placeholder="Имя" onChange={(e) => setFirstName(e.target.value)}></input>
                        <input placeholder="Фамилия" onChange={(e) => setLastName(e.target.value)}></input>
                        <input placeholder="Отчество" onChange={(e) => setMiddleName(e.target.value)}></input>
                        <input placeholder="Опыт работы" onChange={(e)=>setExp(e.target.value)}></input>
                        <input placeholder="Контактные данные" onChange={(e)=>setContact(e.target.value)}></input>
                        <input placeholder="Достижения" onChange={(e) => setAchive(e.target.value)}></input>

                        <div className='change_btns'>
                            <button onClick={()=>change()}>Подтвердить</button>
                        </div>
                        
                    </div>
                </div>
                </div>
               
            </div>
            </div>
            

           
            <div className='Writes'style={{display:tab?'none':'block'}}>
                {writes.map(e=>
              <WriteCard write={e}/>
                )}
            </div>

            <div className="Dates" style={{display:tab?'block':'none'}}>
              <div className="addDate">
                <div className="chooseDate">

                <p>Выбрать день приема</p>
                 <div className='customDatePickerWidth'> <DatePicker 
                  locale="ru" 
                  selected={startDate} 
                  onChange={(date) => date&&setStartDate(date)}
                  filterDate={filterDay} /></div>
                </div>
               <div className="chooseTime">
               <p>Выбрать время приема</p>
               <div className='customDatePickerWidth'>
                <DatePicker
                      locale="ru"
                      selected={startTime}
                      onChange={(date) =>date&& setStartTime(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Время"
                      dateFormat="h:mm"
                      />
               </div>
               </div>
              </div>
              <div className="setDate">
              <div className="set_date_btn" onClick={()=>addDate()}>Подтвердить</div>
              </div>
              
              <div className="DateCollections">
              {psyDates.map(date=>
                  <PsyDate DateI={date}/> )}
              </div>
            </div>
        </div>
    )
}

export default observer(PsyAccount);
