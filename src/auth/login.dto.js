const Joi = require('joi');

const email = joi.string().email();
const password = joi.string().max(8);

const loginSchema = Joi.object({

    email: email.required(),
    password: password.required(),

});

module.exports = {
    loginSchema
}