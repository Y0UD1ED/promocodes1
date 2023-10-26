const{Schema, model} = require('mongoose');

const infoSchema = new Schema({
    from:{type:String},
    to:{type:String},
    name: {type:String },
    contact: {type:String},
    date:{type:String},
    time:[{type:String}],
    process:{type:Number,default:0}
})

module.exports = model('PsychoInfo', infoSchema);