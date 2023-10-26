import { makeAutoObservable } from "mobx";
import { IUser } from "../models/response/IUser";
import AuthService from "../services/AuthService";
import axios from 'axios'
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    isWaiting=false;
    code="aaa";
    check="";
    message="";
    errorMessage="";
    error= false;
    helpCode="";

    constructor() {
        makeAutoObservable(this);
    }


    setWaiting(bool: boolean){
        this.isWaiting=bool;
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setHelpcode(str:string){
        this.helpCode=str;
    }

    setCode(str: string) {
        this.code = str;
    }
    setMessage(str: string) {
        this.message = str;
    }
    setErrorMessage(str: string) {
        this.errorMessage = str;
    }
    setUser(user: IUser) {
        this.user = user;
    }
    setCheck(str: string){
        this.check=str;
    }
    setLoading(bool: boolean) {
        this.isLoading = bool;
    }
    setError(bool: boolean) {
        this.error = bool;
    }

    
    async login(email: string, password: string) {
        try {
            this.setWaiting(true);
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser({
                ...response.data.user,
                firstName: response.data.user.firstName, // Убедитесь, что значения правильно сохраняются
                lastName: response.data.user.lastName
            });
        } catch (e:any) {
            this.setErrorMessage(e.response?.data?.message);
            this.setError(true);
        }
        finally{
            this.setWaiting(false);
        }
    }

    async forgotPassword(email:string){
        try{
            this.setWaiting(true);
            const response=await AuthService.forgotPassword(email);
            this.setHelpcode(response.data);
        }
        catch(e:any){
            this.setErrorMessage(e.response?.data?.message);
            this.setError(true);
        }finally{
            this.setWaiting(false);
        }
    } 

    async resetPassword(email:string,password:string){
        try{
        this.setWaiting(true);
        const response=await AuthService.resetPassword(email,password);
        this.setErrorMessage(response.data);
        }
        catch(e:any){
            console.log(e)
        }finally{
            this.setWaiting(false);
        }
    }

    async registration(email: string, password: string, firstName: string, lastName: string,role:string) {
        try {
            this.setWaiting(true);
            const response = await AuthService.registration(email, password, firstName, lastName,role);
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e:any) {
            this.setErrorMessage(e.response?.data?.message);
            this.setError(true);
        }finally{
            this.setWaiting(false);
        }
    }


    async updatePhoto(photo:File){
        try{
            this.setWaiting(true);
           
        }catch(e:any){
            console.log(e);
        }finally{
            this.setWaiting(false);
        }
    }

    async logout() {
        try {
            this.setWaiting(true);
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            console.log(e);
        }finally{
            this.setWaiting(false);
        }
        
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        } finally {
            this.setLoading(false);
        }
    }
    async creatCode(){
        try{
            const response=await AuthService.createCode();
            this.setCode(response.data);
        }
        catch(e){
            console.log(e);
        }
    }

    async checkCode(code:string){
        try{
            this.setWaiting(true);
            const response=await AuthService.checkCode(code,this.user.email);
            return response.data;
        }
        catch(e){
            console.log(e);
        }finally{
            this.setWaiting(false)
        }
    }

    async updateUserInfo(firstName: string, lastName: string,middleName: string, aboutMe:string) {
        try {
            this.setWaiting(true);
            if(firstName==='')
                firstName=this.user.firstName

            if(lastName==='')
                lastName=this.user.lastName

            if(middleName==='')
                middleName=this.user.middleName

            if(aboutMe==='')
                aboutMe=this.user.aboutMe
            const response = await AuthService.updateUserInfo(this.user.email, firstName, lastName, middleName, aboutMe);
            this.setUser({
                ...response.data.user,
                firstName: response.data.user.firstName, // Убедитесь, что значения правильно сохраняются
                lastName: response.data.user.lastName,
                middleName: response.data.user.middleName,
                aboutMe: response.data.user.aboutMe,
            });
        } catch (e) {
            console.log(e);
        }finally{
            this.setWaiting(false);
        }
    }

    async updateAvatar(file:FormData) {
        try {
            await axios.post(`http://localhost:8000/upload${this.user.id}`, file)
        } catch (e) {
            console.log(e);
        }finally{
            this.setWaiting(false);
        }
    }

    async updatePsychologistInfo(firstName: string, lastName: string,middleName: string, experience:string,contactInfo:string,achievements:string) {
        try {
            this.setWaiting(true);
            if(firstName==='')
                firstName=this.user.firstName

            if(lastName==='')
                lastName=this.user.lastName

            if(middleName==='')
                middleName=this.user.middleName

            if(experience==='')
                experience=this.user.experience
            if(contactInfo==='')
                contactInfo=this.user.contactInfo
            if(achievements==='')
            achievements=this.user.achievements
            const response = await AuthService.updatePsychologistInfo(this.user.email, firstName, lastName, middleName, experience, contactInfo, achievements);
            this.setUser({
                ...response.data.user,
                firstName: response.data.user.firstName, // Убедитесь, что значения правильно сохраняются
                lastName: response.data.user.lastName,
                middleName: response.data.user.middleName,
                experience: response.data.user.aboutMe,
                contactInfo: response.data.user.contactInfo,
                achievements: response.data.user.achievements,
            });
        } catch (e) {
            console.log(e);
        }finally{
            this.setWaiting(false);
        }
    }
    

    async addDate(date:string,time:string){
        try{
            this.setWaiting(true);
            const response=await AuthService.addDate(this.user.email,date,time);
        }catch(e){
            console.log(e);
        }finally{
            this.setWaiting(false);
        }
    }

    async deleteDate(date:string,time:string){
        try{
            this.setWaiting(true);
            const response=await AuthService.deleteDate(this.user.email,date,time);
        }catch(e){
            console.log(e);
        }finally{
            this.setWaiting(false);
        }
    }

    async addWrite(to:string,namePsy:string,date:string,time:string,contact:string){
        try{
            this.setWaiting(true);
            const nameUser=this.user.lastName+' '+this.user.firstName;
            const response =await AuthService.addWrite(this.user.email,nameUser,namePsy,to,contact,date,time)
        }catch(e){
            console.log(e);
        }finally{
            this.setWaiting(false);
        }
    }

    async getFreeDates(email:string){
        try{
            const response=await AuthService.getFreeDates(email);
            return response;
        }catch(e){
            console.log(e);
        }
    }


}

