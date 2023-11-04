const Joi = require('joi');

const email = Joi.string().email();
const password = Joi.string().max(8);
const newPassword = Joi.string().max(8);
token = Joi.string().regex(
    /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
  );

const loginSchema = Joi.object({

    email: email.required(),
    password: password.required(),

});

const recoverySchema = Joi.object({

    email: email.required()
    

});

const changePasswordAuthSchema = Joi.object({
    token: token.required(),
    newPassword: newPassword.required(),
  });

module.exports = {
    loginSchema,
    recoverySchema,
    changePasswordAuthSchema
}