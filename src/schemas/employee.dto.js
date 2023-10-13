const Joi = require('joi'); 

const id = Joi.number().integer();
const firstName = Joi.string().max(50);
const middleName = Joi.string().max(50);
const lastName = Joi.string().max(50);
const motherLastName = Joi.string().max(50);
const email = Joi.string().email();
const phone = Joi.string().max(13);
const identification = Joi.string().max(30);
const status = Joi.string().max(8);
const createdAt = Joi.date();
const updatedAt = Joi.date();

const createEmployeeSchema = Joi.object({
    firstName: firstName.required(),
    middleName: middleName,
    lastName: lastName.required(),
    motherLastName: motherLastName,
    email: email.required(),
    phone: phone.required(),
    identification: identification.required(),
    status: status,
    createdAt: createdAt,
    updatedAt: updatedAt
});

const updateEmployeeSchema = Joi.object({
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    motherLastName: motherLastName,
    email: email,
    phone: phone,
    identification: identification,
    status: status,
});

const getEmployeeSchema = Joi.object({
    id: id.required()
});

const getEmployeeByEmailSchema = Joi.object({
    email: email.required()
});

const getEmployeeByIdentificationSchema = Joi.object({
    identification: identification.required()
});

const getEmployeeByStatusSchema = Joi.object({
    status: status.required()
});

const deleteEmployeeSchema = Joi.object({
    id: id.required()
});

module.exports = {
    createEmployeeSchema,
    updateEmployeeSchema,
    getEmployeeSchema,
    getEmployeeByEmailSchema,
    getEmployeeByIdentificationSchema,
    getEmployeeByStatusSchema,
    deleteEmployeeSchema
}