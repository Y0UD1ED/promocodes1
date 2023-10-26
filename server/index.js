require('dotenv').config()
const express = require('express');
const cors =  require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware');
const fileUpload = require('express-fileupload');
const userModel = require('./models/user-model');




const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin: process.env.CLIENT_URL
}));
app.use(fileUpload());
app.use('/api', router);
app.use('/personal-cabinet', router); // Замените на роутер вашего личного кабинета(переход на лк)

app.use(express.static(__dirname + '/pic'));

app.use(errorMiddleware);//должен быть последним

app.post('/upload:id', async (req, res) => {
    if (!req.files) {
      console.log("file is not found")
    }


    const name=req.params.id+'.jpg';
    const myFile = req.files.file;
    myFile.name=name;
   
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
    user.avatar=name;
    await user.save();
  })

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log('Server started on PORT ' + PORT))
    } catch(e){
        console.log(e);
    }
}
start()