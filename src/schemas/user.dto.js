const Joi = require('joi');


const id = joi.number().integer();
const nickname = joi.string().max(50);
const email = joi.string().email();
const password = joi.string().max(8);
const role = joi.string().max(5);
const recoveryToken = joi.string().max(255);
const createdAt = joi.date();
const updatedAt = joi.date();


const createUserSchema = Joi.object({
    nickname: nickname.required(),
    email: email.required(),
    password: password.required(),
    role: role.required(), 
    createdAt: createdAt,
    updatedAt: updatedAt
});

const updateUserSchema = Joi.object({
    nickname: nickname,
    email: email,
    password: password,
    role: role, 
    createdAt: createdAt,
    updatedAt: updatedAt,
    recoveryToken: recoveryToken
});

const getUserSchema = Joi.object({
    id: id.required()
});

const getUserByEmailSchema = Joi.object({
    email: email.required()
});

const getUserByRoleSchema = Joi.object({
    role: role.required()
});

const deleteUserSchema = Joi.object({
    id: id.required()
});

module.exports = {
    createUserSchema,
    updateUserSchema,
    getUserSchema,
    getUserByEmailSchema,
    getUserByRoleSchema,
    deleteUserSchema
}
