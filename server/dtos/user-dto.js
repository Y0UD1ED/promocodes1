module.exports = class UserDto {
    email;
    id;
    isActivated;
    isSubscribed;
    sessionCount;
    firstName;
    lastName;
    middleName;
    code;
    role;
    experience;
    contactInfo;
    achievements;
    aboutMe;
    avatar;
   

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.isSubscribed=model.isSubscribed;
        this.sessionCount=model.sessionCount;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.middleName = model.middleName;
        this.code = model.code;
        this.role = model.role;
        this.experience = model.experience;
        this.contactInfo = model.contactInfo;
        this.achievements = model.achievements;
        this.aboutMe = model.aboutMe;
        this.avatar = model.avatar;
        
    }
}