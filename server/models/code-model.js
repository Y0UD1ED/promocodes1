const{Schema, model} = require('mongoose');

const CodeSchema = new Schema({
    name:{type: String, unique:true},
    count: {type: String},
    all: {type: String},
})

module.exports = model('Code', CodeSchema);