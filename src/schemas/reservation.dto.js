const Joi = require('joi');

const id = Joi.number().integer();
const checkIn = Joi.date();
const checkOut = Joi.date();
const roomId = Joi.number().integer();
const guestId = Joi.number().integer();
const totalAmount = Joi.number();
const createdAt = Joi.date();
const updatedAt = Joi.date();

const createReservationSchema = Joi.object({
    checkIn: checkIn.required(),
    checkOut: checkOut.required(),
    roomId: roomId.required(),
    guestId: guestId.required(),
    totalAmount: totalAmount.required(),
    createdAt: createdAt,
    updatedAt: updatedAt
});

const updateReservationSchema = Joi.object({
    checkIn: checkIn,
    checkOut: checkOut,
    totalAmount: totalAmount,
});

const getReservationSchema = Joi.object({
    id: id.required()
});

const getReservationByCheckInSchema = Joi.object({
    checkIn: checkIn.required()
});

const getReservationByGuestSchema = Joi.object({
    guestId: guestId.required()
});

const getReservationByRoomSchema = Joi.object({
    roomId: roomId.required()
});

const deleteReservationSchema = Joi.object({
    id: id.required()
});

module.exports = {
    createReservationSchema,
    updateReservationSchema,
    getReservationSchema,
    getReservationByCheckInSchema,
    getReservationByGuestSchema,
    getReservationByRoomSchema,
    deleteReservationSchema
}
