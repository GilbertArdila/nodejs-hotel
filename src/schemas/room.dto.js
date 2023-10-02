const   Joi = require('joi')

const id = Joi.number().integer()
const number = Joi.number().integer()
const type = Joi.string().max(6)
const price = Joi.number()
const status = Joi.string().max(11)
const createdAt = Joi.date()
const updatedAt = Joi.date()

const createRoomSchema = Joi.object({
    number: number.required(),
    type: type.required(),
    price: price.required(),
    status: status.required(),
    createdAt: createdAt,
    updatedAt: updatedAt
})

const updateRoomSchema = Joi.object({
    price: price,
    status: status, createdAt: createdAt,
    updatedAt: updatedAt
})

const getRoomSchema = Joi.object({
    id: id.required()
})

const getRoomByTypeSchema = Joi.object({
    type: type.required()
})

const getRoomByStatusSchema = Joi.object({
    status: status.required()
})

const deleteRoomSchema = Joi.object({
    id: id.required()
})

module.exports = {
    createRoomSchema,
    updateRoomSchema,
    getRoomSchema,
    getRoomByTypeSchema,
    getRoomByStatusSchema,
    deleteRoomSchema
}


