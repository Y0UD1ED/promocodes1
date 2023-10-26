import React, { FC, useState,useContext, useRef, useEffect } from 'react';
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
import { observer } from 'mobx-react-lite';
import AuthService from '../services/AuthService';




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
        console.log(file)
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

const UserAccount=()=>{
    const [tab,setTab]=useState(false)
    const sub=false
    const { store } = useContext(Context);
    const [update,setUpdate]=useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName]=useState('');
    const [aboutMe, setAboutMe]=useState('');
    const [code,setCode]=useState('');
    const [message,setMessage]=useState('')
    const avatar=store.user.avatar!==''?`http://www.crewimposter.ru:8000/${store.user.avatar}`:'spec.jpg'; 

    const [writes,setWrites]=useState([])
    const getWrites=async()=>{
        try{
            const response=await AuthService.getClientWrites(store.user.email);
            setWrites(response.data);
            console.log(writes)
            setTab(false)
        }catch(e){
            console.log(e);
        }
    }
    useEffect(() => {
        let ignore = false;

        if (!ignore){ 
            getWrites()
            ignore=true;}
},[]);



    const checkCode= async()=>{
      setMessage(await store.checkCode(code));
      if(message==="Промокод принят"){
        window.location.reload();
      }
    }

    const [src, setSrc] = useState(null);

    // preview
    const [preview, setPreview] = useState(null);
  
    // modal state
    const [modalOpen, setModalOpen] = useState(false);
  
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

        await store.updateUserInfo(firstName, lastName, middleName, aboutMe)
        window.location.reload();
    }



  

    return(
        <div className="UserAccount">
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
                            <div className={tab?'tab_writes':'tab_writes_act'} onClick={()=>getWrites()}>
                                <p>Запись</p>
                            </div>
                            <div className={tab?'tab_subs_act':'tab_subs'} onClick={()=>setTab(true)}>
                                <p>Подписка</p>
                            </div>

                            <div className='change_mobile_btn' onClick={()=>setUpdate(!update)}>
                                <button>Изменить данные</button>
                            </div>

                            <button onClick={() => store.logout()} className='exit_btn'><Link to={PATHS.MAIN}>Выйти</Link></button>
                </div>

                

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
                    <p>О себе: {store.user.aboutMe}</p>
                </div>
                <div className='user_change_info' style={{display:update? 'flex':'none'} }>
               
               <div  className='user_change_inputs'>
               <input placeholder="Имя" onChange={(e) => setFirstName(e.target.value)}></input>
               <input placeholder="Фамилия" onChange={(e) => setLastName(e.target.value)}></input>
               <input placeholder="Отчество" onChange={(e) => setMiddleName(e.target.value)}></input>
               <input placeholder="О себе" onChange={(e)=>setAboutMe(e.target.value)}></input>
               <div className='change_btns'>
                    <button onClick={()=>change()}>Подтвердить</button>
               </div>
          
               </div>
           </div>
           
            </div>
            
           
                
            </div>
            </div>
       
        
        <div className='Writes' style={{display:tab?'none':'block'}}>
          {writes.map(e=>
           <WriteCard write={e}/>
            )}
           
        </div>
        <div className="Sub" style={{display:tab?'block':'none'}}>
        <div className="sub_text" style={{display:store.user.isSubscribed?'none':'block'}}>
            У вас не подключена подписка. Обратитесь к работадателю для ее получения.
        </div>
        <div className="sub_text" style={{display:store.user.isSubscribed?'block':'none'}}>
            У вас подключена подписка. 
        </div>
        <div className="sub_text" style={{display:store.user.isSubscribed?'block':'none'}}>
            Осталось сеансов: {store.user.sessionCount}.
        </div>
        {/* <div className="sub_code" style={{display:store.user.isSubscribed?'none':'flex'}}>
            <input onChange={(e)=>setCode(e.target.value)}></input>
            <div className="code_btn" onClick={()=>checkCode()}>
                <p>Ввести промокод</p>
            </div>
           
        </div> */}
        <div style={{display:message!=''?'block':'none'}}>{message}</div>
    </div>
    </div>
    )
}

export default observer(UserAccount)
