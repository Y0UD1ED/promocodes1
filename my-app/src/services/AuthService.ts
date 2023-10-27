import $api from "../http";
import { AxiosResponse } from 'axios'
import { AuthResponse } from "../models/response/AuthResponse";
import { WriteModel } from "../models/response/WriteModel";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/login',{ email, password });
    }

    static async registration(email: string, password: string, firstName: string, lastName: string, role:string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/registration', { email, password, firstName, lastName,role });
    }

    static async logout(): Promise<void> {
        return $api.post('/logout');
    }
    static async createCode(): Promise<AxiosResponse<string>>{
        return $api.get('/create');
    }
    static async checkCode(code: string,email:string):Promise<AxiosResponse<string>>{
        return $api.post('/check',{code,email});
    }

    static async updateUserInfo(email: string, firstName: string, lastName: string,middleName: string, aboutMe:string):Promise<AxiosResponse<AuthResponse>>{
        return $api.post('/users/update',{email, firstName, lastName, middleName, aboutMe});
    }

    static async updatePsychologistInfo(email: string, firstName: string, lastName: string,middleName: string, experience:string,contactInfo:string,achievements:string):Promise<AxiosResponse<AuthResponse>>{
        return $api.post('/psychologists/update',{email, firstName, lastName, middleName, experience, contactInfo, achievements});
    }
    static async forgotPassword(email: string): Promise<AxiosResponse<string>> {
        return $api.post('/forgot-password',{email});
    }
    static async resetPassword(email: string,password:string): Promise<AxiosResponse<string>> {
        return $api.post('/reset-password',{email,password});
    }
    static async updateAvatar(file:FormData,):Promise<void>{
        return $api.post('/update_avatar',{file});
    }

    static async addDate(email:string,date:string,time:string):Promise<string>{
        return $api.post('/addDate',{email,date,time});
    }

    static async addWrite(from:string,nameUser:string,namePsy:string,to:string,contact:string,date:string,time:string):Promise<AxiosResponse<string>>{
        return $api.post('/addWrite',{from,to,nameUser,namePsy,contact,date,time});//
    }


    static async getFreeDates(name:string):Promise<AxiosResponse<string[]>>{
        return $api.get(`/ClientsDays?email=${name}`);//
    }
    static async getFreeTime(name:string,date:string):Promise<AxiosResponse<string[]>>{
        return $api.post(`/getFreeTime`,{name,date});//
    }
    static async createWrite(from:string,name:string,to:string,contact:string,date:string,time:string):Promise<AxiosResponse<string[]>>{
        return $api.post(`/PsychoInfos?to=${to}`,{from,to,name,contact,date,time});//
    }

    static async deleteDate(email:string,date:string,time:string):Promise<string>{
        return $api.post('/deleteDate',{email,date,time});//
    }

    static async deleteWrite(from:string,to:string,date:string,time:string):Promise<string>{
        return $api.post('/deleteWrite',{from,to,date,time});//
    }

    static async getFreeDate(name:string):Promise<AxiosResponse<string[]>>{
        return $api.post('/getFreeDate',{name});//
    }

    static async getPsyWrites(email:string):Promise<AxiosResponse<WriteModel[]>>{
        return $api.post('/getPsyWrites',{email});//
    }

    static async getClientWrites(email:string):Promise<AxiosResponse<WriteModel[]>>{
        return $api.post('/getClientWrites',{email});//
    }
}