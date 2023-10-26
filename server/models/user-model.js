const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    isSubscribed: {type: Boolean,default: false},
    sessionCount: {type: Number},
    activationLink: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    middleName: { type: String,default: '' },
    role: { type: String },
    experience: { type: String, default: '' },//опыт работы
    contactInfo: { type: String, default: '' },
    achievements: { type: String, default: '' },//достижения
    aboutMe: { type: String, default: '' },
    avatar: { type: String, default: '' },
});

module.exports = model('User', UserSchema);