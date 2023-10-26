const{Schema, model} = require('mongoose');

const DateSchema = new Schema({
    date:{type:String},
    time:{type:String},
    isFree:{type:Boolean,default:true},
    email:{type:String},
})

module.exports = model('Date', DateSchema);