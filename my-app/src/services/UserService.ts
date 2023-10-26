import $api from "../http";
import {AxiosResponse} from 'axios'
import { IUser } from "../models/response/IUser";
import { IDate } from "../models/response/IDate";

export default class UserService{
    static fetchUser(): Promise<AxiosResponse<IUser[]>>{
        return $api.get<IUser[]>('/users')
    }
    static fetchPsys():Promise<AxiosResponse<IUser[]>>{
        return $api.get<IUser[]>('/psychologists')
    }
    static fetchDates(email:string):Promise<AxiosResponse<IDate[]>>{
        return $api.post<IDate[]>('/getDates',{email})
    }
}