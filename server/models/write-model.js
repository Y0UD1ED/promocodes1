const{Schema, model} = require('mongoose');

const WriteSchema = new Schema({
    from:{type:String},
    to:{type:String},
    namePsy: { type: String },
    nameUser: { type: String },
    contact: {type:String},
    date:{type:String},
    time:{type:String},
    process:{type:Number,default:0}
})

module.exports = model('Write', WriteSchema);