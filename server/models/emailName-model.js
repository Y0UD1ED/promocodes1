const { Schema, model } = require('mongoose');

const emailNameSchema = new Schema({
    Email: {
        type: String,
        required: true,
    },
    Name: {type: String},
});

module.exports = model('EmailName', emailNameSchema);
