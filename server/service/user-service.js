const UserModel = require('../models/user-model');
const WrtiteModel=require('../models/write-model');
const clientsTimeModel = require('../models/record-model');//
const infoModel = require('../models/recInfo-model');//
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const CodeModel=require('../models/code-model');
const UserDto = require('../dtos/user-dto');
const fs = require('fs');
const ApiError = require('../exceptions/api-error');
const writeModel = require('../models/write-model');
const DateModel = require('../models/date-model');
const emailNameModel = require('../models/emailName-model');
const { model } = require('mongoose');
const userModel = require('../models/user-model');

class UserService {
    async registration(email, password, firstName, lastName,role) {//
        const candidate = await UserModel.findOne({email});
        if (candidate) {
            throw ApiError.BadRequest('Пользователь с почтовым адресом ' + email + ' уже существует');
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await UserModel.create({ 
            email, 
            password: hashPassword, 
            activationLink,
            firstName,
            lastName,
            role,
        });
        
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        
        return {...tokens, user:userDto};
    }

    async updateUserInfo(email, firstName, lastName, middleName, aboutMe) {//обнавление информации о пользователе 
        const user = await UserModel.findOne({email});
        if (!user) {
            throw ApiError.NotFound('Пользователь не найден');
        }
        user.firstName = firstName;
        user.lastName = lastName;
        user.middleName = middleName;
        user.aboutMe = aboutMe;
        await user.save();
        return user
    }

    async updatePsychologistInfo(email,firstName, lastName, middleName, experience, contactInfo, achievements) {
        try {
        const user = await UserModel.findOne({email});
        if (!user) {
            throw ApiError.NotFound('Пользователь не найден');
        }
        user.firstName = firstName;
        user.lastName = lastName;
        user.middleName = middleName;
        user.experience=experience;
        user.contactInfo=contactInfo;
        user.achievements=achievements;
        await user.save();
        return user
        } catch (e) {
            throw ApiError.InternalServerError('Произошла ошибка при обновлении информации о психологе');
        }
    }

    async activate(activationLink){
        const user = await UserModel.findOne({activationLink})
        if(!user){
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password){
        const user = await UserModel.findOne({email})
        if (!user){
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals){
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user:userDto}
    }
    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }


    async forgotPassword(email) {
          const user = await UserModel.findOne({ email });
      
          if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не существует');
          }

      
          //const resetToken = await tokenService.generateToken({ userId: user._id });
          const strNum=await this.generateRandomString();
          console.log(strNum);
          // Отправка письма со ссылкой для восстановления пароля
          await mailService.sendResetPasswordEmail(
            email,
            strNum
          );
    
          return strNum;
      }
      async resetPassword(email, newPassword) {
        try {
          //const decodedToken = await tokenService.verifyToken(token);
          //if (!decodedToken || !decodedToken.userId) {
           // throw ApiError.BadRequest('Некорректный токен');
          //}
          //const userId = decodedToken.userId;
          const user = await UserModel.findOne({email})
          const hashedPassword = await bcrypt.hash(newPassword, 3);
          user.password=hashedPassword;
         // await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });
            await user.save();
        } catch (e) {
          throw e;
        }
      }

      /*async readTimetable(){
        const fileContents = fs.readFileSync('TimetableTXT.txt', 'utf-8');
        const lines = fileContents.split('\n');
        const result = [];

        lines.forEach((line) => {
            const slashIndex = line.indexOf('/');
            if (slashIndex !== -1) {
            const textBeforeSlash = line.substring(0, slashIndex);
            result.push(textBeforeSlash);
            } else {
            result.push(line);
            }
        });

        return result;
    }
    async appendDataToFile(data){//заменить
        fs.appendFileSync('RecordDB.txt', data, 'utf-8');
    }

    async readTimetableArray(){
        const fileContentsTxt = fs.readFileSync('TimetableTXT.txt', 'utf-8');
        const fileLines = fileContentsTxt.split('\n');
        const resultArray = [];

        fileLines.forEach((fileLine) => {
        const slashIndex = fileLine.indexOf('/');
        if (slashIndex !== -1) {
        const words = fileLine.split('/');
        resultArray.push(...words);
        } else {
        resultArray.push(fileLine);
        }
    });

    return resultArray;

    }*/

    async addWrite(from,to,nameUser,namePsy,contact,date,time){
        const write=await WrtiteModel.create({from,to,nameUser,namePsy,contact,date,time});
        console.log(write)

    }

    async changeDateStatus(email,date,time,status){
        console.log(email,date,time)
        const bd=await DateModel.find();
       // console.log(bd)
        const BDdate=await DateModel.findOne({email,date,time});
        if(BDdate){
        BDdate.isFree=status
        console.log(BDdate)
        await BDdate.save();
        }
    }

    async addDate(email,date,time){
        const timeData=await DateModel.create({date,time,email});
        console.log(email,date,time);
    }

    async deleteDate(email,date,time){
        console.log('dfdfdf')
        const result=await DateModel.deleteOne({email,date,time});
    }

    async deleteWrite(from,to,date,time){
        const email=to;
        const bdDate=await DateModel.findOne({email,date,time});
        bdDate.isFree=true;
        await bdDate.save()
        const result=await writeModel.deleteOne({from,to,date,time});
    }

    async getFreeDate(email){
        const all=await DateModel.find();
        console.log(email)
        const writes=await DateModel.find({email,isFree:true});
       
       const dates=writes.map(e=>{
        return e.date
       }
        )
        console.log(dates)
        return dates;

    }

    async getPsyWrites(to){
        const writes=await writeModel.find({to});
        return writes;
    }

    async getClientWrites(from){
        const writes=await writeModel.find({from});
        console.log(writes)
        return writes;
    }

    async getDates(email){
        const dates=await DateModel.find({email,isFree:true});
        return dates;
    }

    async getFreeTime(email,date){

        const writes=await DateModel.find({email,date,isFree:true});
        const dates=writes.map(e=>{
            return e.time
           }
            )
        console.log(dates)
        return dates;
        
    }

    async createWrite(from,to,contact,name,date,time,email){
        const write=writeModel.create({from,date,to,name,contact,time})
       
    }

    async getPsychologists() {//
        const psychologists = await UserModel.find({role:'psychologist'});
        return psychologists;
    }


    async refresh(refreshToken){
        if(!refreshToken){
             throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user:userDto}
    }

    async getAllUsers(){
        const users = await UserModel.find();
        return users;
    }

    async writePromoCodes(promoCodes,promoCode) 
    {
        fs.writeFileSync('promoCodes.txt', JSON.stringify(promoCodes));
       
    }

    async readPromoCodes() {
    const promoCodesData = fs.readFileSync('promoCodes.txt', 'utf8');

    return JSON.parse(promoCodesData);
}

    


    async generatePromoCode(length){
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                let result = '';
                for (let i = 0; i < length; i++) 
                {
                    result += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                return result;
   
}

async generateRandomString() {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i<4; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


//
async clientsTimes(collectionName){ 
    const ClientsTimeModel = model('ClientsTime', clientsTimeModel.clientsTimeSchema, collectionName);
    const times = await ClientsTimeModel.find().sort({ title: 1 }); 
    return times; 
}

async clientsDays(collectionName) {
    const ClientsTimeModel = model('ClientsTime', clientsTimeModel.clientsTimeSchema, collectionName);
    const days = await ClientsTimeModel.distinct('Day');
    return days;
  }

async findClientsTimeByDate(collectionName, date) {
    const ClientsTimeModel = model('ClientsTime', clientsTimeModel.clientsTimeSchema, collectionName);
    const record = await ClientsTimeModel.findOne({ Day: date });
    return record;
}

async updateClientsTime(collectionName, Day, Time) {
    const ClientsTimeModel = model('ClientsTime', clientsTimeModel.clientsTimeSchema, collectionName);
    await ClientsTimeModel.findOneAndUpdate(
      { Day: Day, Time: { $elemMatch: { $eq: Time } } },
      { $set: { 'Time.$': 'занято' } }
    );
  }

async insertInfo(collectionName, from,to,contact,name,date,time) {
    console.log(collectionName);
    const ClientsTimeModel = model('PsychoInfo', infoModel.infoSchema, collectionName);
    return await ClientsTimeModel.updateMany({from,to,contact,name,date,time});
}

async findPsychoInfos(collectionName) {
    const ClientsTimeModel = model('PsychoInfo', infoModel.infoSchema, collectionName);
    try {
      const psychoInfos = await ClientsTimeModel.find().sort({ title: 1 }).exec();
      return psychoInfos;
    } catch (error) {
      console.error(error);
      throw new Error("Something went wrong...");
    }
  }

  async sortDatesAscending(dates) {
      return dates.sort((a, b) => {
      const dateA = new Date(a.split('.').reverse().join('-'));
      const dateB = new Date(b.split('.').reverse().join('-'));
      return dateA - dateB;
    });
  }

  async findName(collectionName, email) {
    const EmailNameModel = model('EmailName', emailNameModel.emailNameSchema, collectionName);
    try {
      const result = await EmailNameModel.findOne({ Email: email });
      if (result) {
        return result.Name;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error(error);
      throw new Error('Что-то пошло не так...');
    }
  }

}

module.exports = new UserService();