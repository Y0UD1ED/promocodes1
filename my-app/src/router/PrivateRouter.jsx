import React from 'react';
import ReactDOM from 'react-dom';
import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Account from "../pages/Account";
import { Context } from "..";


export const PrivateRoute = () => {
  const { store } = useContext(Context);
  const auth=localStorage.getItem('token')
    // Получаем значение isAuthenticated из пользовательского хука useAuth
    // Получаем текущий маршрут из хука useLocation
    const location = useLocation()
  
    // Возвращаем условный оператор для рендеринга компонентов на основе состояния isAuthenticated
    return (

      // Если пользователь авторизован, то рендерим дочерние элементы текущего маршрута, используя компонент Outlet
        auth!==null?
        <Account />
        // Если пользователь не авторизован, то перенаправляем его на маршрут /login с помощью компонента Navigate.
        // Свойство replace указывает, что текущий маршрут будет заменен на новый, чтобы пользователь не мог вернуться обратно, используя кнопку "назад" в браузере.
        :
        <Navigate to="/" state={{ from: location }} replace />
    )
  };