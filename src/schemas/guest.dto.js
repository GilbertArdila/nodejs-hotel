const Joi = require('joi'); 

const id = Joi.number().integer();
const firstName = Joi.string().max(50);
const middleName = Joi.string().max(50);
const lastName = Joi.string().max(50);
const motherLastName = Joi.string().max(50);
const email = Joi.string().email();
const phone = Joi.string().max(10);
const identification = Joi.string().max(30);
const reservationId = Joi.number().integer();
const createdAt = Joi.date();
const updatedAt = Joi.date();

const createGuestSchema = Joi.object({
    firstName: firstName.required(),
    middleName: middleName,
    lastName: lastName.required(),
    motherLastName: motherLastName,
    email: email.required(),
    phone: phone.required(),
    identification: identification.required(),
    reservationId: reservationId,
    createdAt: createdAt,
    updatedAt: updatedAt
});

const updateGuestSchema = Joi.object({
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    motherLastName: motherLastName,
    email: email,
    phone: phone,
    identification: identification,
    reservationId: reservationId,
});

const getGuestSchema = Joi.object({
    id: id.required()
});

const getGuestByEmailSchema = Joi.object({
    email: email.required()
});

const getGuestByIdentificationSchema = Joi.object({
    identification: identification.required()
});

const deleteGuestSchema = Joi.object({
    id: id.required()
});

module.exports = {
    createGuestSchema,
    updateGuestSchema,
    getGuestSchema,
    getGuestByEmailSchema,
    getGuestByIdentificationSchema,
    deleteGuestSchema
}
