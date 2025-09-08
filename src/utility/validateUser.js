const validator = require('validator')

const validateUser = (data) => {

    const mandatoryFields = ['firstName' , 'emailId' , 'password'];
    const isAllowed = mandatoryFields.every((k) => Object.keys(data).includes(k));

    if(!isAllowed){
        throw new Error("Manatory field is missing");
    }

    if(!validator.isEmail(data.emailId)){
        throw new Error("Invalid email id");
    }
    if(!validator.isStrongPassword(data.password)){
        throw new Error("Week Password");
    }
    if(!(data.firstName.length >= 3 && data.firstName.length <= 20)){
        throw new Error("Name should be atleast 3 char and atmost 20 char");
    }
};

module.exports = validateUser;