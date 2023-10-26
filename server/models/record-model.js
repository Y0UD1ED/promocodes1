const { Schema, model } = require('mongoose');

const clientsTimeSchema = new Schema({
    Day: {
        type: String,
        required: true,
    },
    Time: [{type: String}],
});

module.exports = model('ClientsTime', clientsTimeSchema);