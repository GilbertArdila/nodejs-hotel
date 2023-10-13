const Joi = require('joi');


const id = Joi.number().integer();
const nickname = Joi.string().max(50);
const email = Joi.string().email();
const password = Joi.string().max(8);
const role = Joi.string().max(5);
const recoveryToken = Joi.string().max(255);
const createdAt = Joi.date();
const updatedAt = Joi.date();


const createUserSchema = Joi.object({
    nickname: nickname.required(),
    email: email.required(),
    password: password.required(),
    role: role, 
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
