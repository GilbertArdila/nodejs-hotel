const Joi = require('joi');

const email = Joi.string().email();


const recoverySchema = Joi.object({

    email: email.required()
    

});

module.exports = {
    recoverySchema
}