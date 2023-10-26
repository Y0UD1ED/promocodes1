const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const CodeModel = require('../models/code-model');
const fs = require('fs');
const PC = require('../promo_codes/codes');
const formidable = require("formidable");


const multer = require('multer');
const userModel = require('../models/user-model');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'pic')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
            }
            const { email, password, firstName, lastName, role } = req.body; // Добавьте middleName и aboutMe
            const userData = await userService.registration(email, password, firstName, lastName, role); // Передайте middleName и aboutMe
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);

        } catch (e) {
            next(e);
        }
    }

    async updateUserInfo(req, res, next) {
        try {
            const { email, firstName, lastName, middleName, aboutMe } = req.body; // Добавьте middleName и aboutMe
            const UserData=await userService.updateUserInfo(email, firstName, lastName, middleName, aboutMe); // Передайте middleName и aboutMe
            return res.json(UserData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async updatePsychologistInfo(req, res, next) {
        try {
            const { email, firstName, lastName, middleName, experience, contactInfo, achievements } = req.body;
            const userData=await userService.updatePsychologistInfo(email,firstName, lastName, middleName, experience, contactInfo, achievements);
            console.log('Информация о пcихологе успешно обнавлена!')
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    /*async SaveData(req,res,next){
        try{
            let data = '';
            req.on('data', (chunk) => {
                data += chunk;
            });

            req.on('end', () => {
                appendDataToFile(data);
                res.sendStatus(200);
            });
        }catch(e){
            next(e);
        }
    }

    async UpdateTimetabel(req,res,next){
        try{
            let data = '';
            req.on('data', (chunk) => {
            data += chunk;});
            req.on('end', () => {
            const jsonData = JSON.parse(data);
            const selectedDay = jsonData.day;
            const selectedTime = jsonData.time;
            fs.readFile('TimetableTXT.txt', 'utf8');
            

            const lines = fileData.split('\n');

      // Поиск строки, начинающейся с указанного дня
      let updatedFileData = lines.map(line => {
        if (line.startsWith(selectedDay)) {
          // Замена выбранного времени на "занято"
          const updatedLine = line.replace(selectedTime, 'занято');
          return updatedLine;
        } else {
          return line;
        }
      }).join('\n');
      fs.writeFile('TimetableTXT.txt', updatedFileData, 'utf8', (err) => {
        if (err) {
          console.error('Ошибка при записи в файл', err);
          res.sendStatus(500);
          return;
        }

        console.log('Данные успешно обновлены');
        res.sendStatus(200);
      });
    });}catch(e){
        next(e);
        }
    }*/

    async getDates(req,res,next){
        try{
            const{email}=req.body;
            const dates=await userService.getDates(email);
            return res.json(dates)
        }catch(e){
            next(e)
        }
    }



    async addWrite(req,res,next){
        try{
            const{from,nameUser,namePsy,to,contact,date,time}=req.body;
            await userService.addWrite(from,to,nameUser,namePsy,contact,date,time)
            await userService.changeDateStatus(to,date,time,false)
            return res.json('ok');
            
        }catch(e){
            next(e);
        }
    }


    async addDate(req,res,next){
        try{
            console.log('hi')
            const{email,date,time}=req.body;
            const dateData=await userService.addDate(email,date,time);
        }catch(e){
            next(e);
        }
    }

    async deleteDate(req,res,next){
        try{
            const {email,date,time}=req.body;
            await userService.deleteDate(email,date,time);
        }catch(e){
            next(e)
        }
    }

    async deleteWrite(req,res,next){
        try{
   
            const {from,to,date,time}=req.body;
            await userService.deleteWrite(from,to,date,time);
        }catch(e){
            next(e)
        }
    }

    async getFreeDate(req,res,next){
        try{
           
            const {name}=req.body;
            const dates=await userService.getFreeDate(name);
            return res.json(dates);
        }catch(e){

            next(e);
        }
    }


    async getFreeTime(req,res,next){
        try{
            console.log('he')
            const {name,date}=req.body;
            const times =await userService.getFreeTime(name,date);
            return res.json(times);

        }catch(e){
            next(e)
        }
    }

    async getPsyWrites(req,res,next){
        try{
            const {email}=req.body;
            const writes=await userService.getPsyWrites(email);
            return res.json(writes)

        }catch(e){
            next(e)
        }
    }

    async getClientWrites(req,res,next){
        try{
            const {email}=req.body;
            console.log(email)
            const writes=await userService.getClientWrites(email);
            return res.json(writes)

        }catch(e){
            next(e)
        }
    }

    async getPsychologists(req,res,next) {
        try {
        const psychologists = await userService.getPsychologists();
        return res.json(psychologists);
    } catch (e) {
        next(e);
    }
    }

    async updateAvatar(req,res,next){
        try{
              const {name}=req.body+'.jpg';
              const myFile = req.files;
              console.log(req.files);
             
              // метод mv() помещает файл в папку public
              myFile.mv(`${__dirname}/pic/${myFile.name}`,
                function (err) {
                  if (err) {
                    console.log(err)
                    return res.status(500).send({ msg: "Error occurred" });
                  }
                  // возвращаем ответ с именем файла и его расположением
                  return res.send({name: myFile.name, path: `/${myFile.name}`});
              });
              const user =  await userModel.findById(req.params.id);
              user.avatar=true;
              await user.save();
            
        }catch(e){
            console.log('err');
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);

        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(`${process.env.CLIENT_URL}/account`); // Изменено на путь к личному кабинету
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async createCode(req, res, next) {
        try {
            const promoCodes = await userService.readPromoCodes();
            const promoCode = await userService.generatePromoCode(12);

            const name = promoCode;
            const count = "100"
            const all = "10"
            const field = await CodeModel.create({
                name,
                count,
                all
            });
            console.log(promoCode)

            promoCodes[promoCode] = 0;
            await userService.writePromoCodes(promoCodes, promoCode);
            return res.json(promoCode);
        } catch (e) {
            next(e);
        }
    }
    async checkCode(req, res) {
        try {
            const promoCode = req.body.code;
            const {email}=req.body;
            const name = promoCode
            const may = await CodeModel.findOne({ name })
            console.log(req.body);
            //if (promoCode in promoCodes && promoCodes[promoCode] < 5) 
            //{
            //  promoCodes[promoCode]++;
            // await userService.writePromoCodes(promoCodes);
            //return res.json('Промокод принят');
            //} else 
            // {
            //return res.json('Промокод не действителен или уже использован максимальное количество раз');
            //}
            if (may&&may.all!=0) {
                console.log("Yes");
                const user= await userModel.findOne({email});
                user.isSubscribed=true;
                user.sessionCount=may.count;
                await user.save();
                may.all-=1;
                await may.save();
                return res.json('Промокод принят');
            } else {
                console.log("No")
                return res.json('Промокод не действителен или уже использован максимальное количество раз');
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    async forgotPassword(req, res,next) {
        try {
            const { email } = req.body;
            const strNum= await userService.forgotPassword(email); // передача параметра next
            return res.json(strNum);
        } catch (e) {
            next(e);
        }
    }
    
    async resetPassword(req, res,next) {
        try {
          const { email, password } = req.body;
          console.log(email)
          console.log(password)
          await userService.resetPassword(email,password);
          const rezult='Пароль успешно изменен'
          return res.json(rezult);
        } catch (e) {
            next(e);
        }
      }

       //
    async clientsTimes(req, res,next){ 
        try {
            const email=req.query.email; 
           // const collectionName = req.query.collectionName || 'ClientsTimes'; // Имя коллекции по умолчанию - 'ClientsTimes'
            const collectionName = await userService.findName('EmailName',email)||'ClientsTime';
            const times = await userService.clientsTimes(collectionName); 
            return res.json(times); 
        } catch(e) { 
            next(e); 
        } 
      }
      
      async clientsDays(req, res, next) {
        try {
            const email=req.query.email; 
           // const collectionName = req.query.collectionName || 'ClientsTime';
            const collectionName = await userService.findName('EmailName',email)||'ClientsTime';
            const days = await userService.clientsDays(collectionName);
            const sortedDays = userService.sortDatesAscending(days);
            return res.json(sortedDays);
        } catch (e) {
          next(e);
        }
      }
      async getName(req, res, next) {
        try {
          const collectionName = 'EmailName';
          const email = req.query.email;
      
          if (!email) {
            res.status(400).send('Еmail-адрес отсутствует');
            return;
          }
      
          const name = await userService.findName(collectionName, email);
          res.send(`Название для ${email}: ${name}`);
        } catch (error) {
          next(error);
        }
    }
      async getAvailableTimes(req, res, next) {
        try {
            const email=req.query.email; 
            //const collectionName = req.query.collectionName || 'ClientsTime';
            const collectionName = await userService.findName('EmailName',email)||'ClientsTime';
            const Day = req.query.Day;
            console.log(collectionName)
            console.log(Day)
            console.log('df')
            const record = await userService.findClientsTimeByDate(collectionName, Day);
          
          if (record) {
            const availableTimes = record.Time.filter(time => time !== 'занято');
            return res.status(200).json(availableTimes);
          } else {
            return res.status(404).json({ message: 'Record not found' });
          }
        } catch (e) {
          next(e);
        }
      }

      async updateDatabase1(req, res, next) {
        try {
            const email=req.query.email; 
            //const collectionName = req.query.collectionName || 'ClientsTime';
            const collectionName = await userService.findName('EmailName',email)||'ClientsTime';
            const { Day, Time } = req.body;
            await userService.updateClientsTime(collectionName, Day, Time);
            res.status(200).send('Данные успешно обновлены');
        } catch (e) {
          next(e);
        }
      }

      async createPsychoInfo(req, res, next) {
        try {
            const email=req.query.to;
            const {from,to,contact,name,date,time}=req.body;
            console.log(from)
            //const collectionName = req.body.collectionName || 'PsychoInfo';
            const collectionName = await userService.findName('EmailName',email)|| 'PsychoInfo';
            if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Empty request body' });
          }
          const result = await userService.insertInfo(collectionName, from,to,contact,name,date,time);
          res.json(result);
        } catch (e) {
          next(e);
        }
      }

      async getPsychoInfos(req, res, next) {
        try {
            const email=req.query.email; 
            //const collectionName = req.query.collectionName || 'PsychoInfo';
            const collectionName = await userService.findName('EmailName',email)|| 'PsychoInfo';
            const PsychoInfos = await userService.findPsychoInfos(collectionName);
            res.status(200).json(PsychoInfos);
        } catch (e) {
          next(e);
        }
      }
}

module.exports = new UserController();