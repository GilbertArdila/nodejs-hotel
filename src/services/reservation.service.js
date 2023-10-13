const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class ReservationService{
    constructor(){

    }

    async create(reservation){
        const newReservation = await models.Reservation.create({
            ...reservation
        });
        return newReservation;
    }

    async find(){
        const reservations = await models.Reservation.findAll({
            include:['room','guest']
        });
        return reservations;
    }

    async findOne(id){
        const reservation = await models.Reservation.findByPk(id);
        if (!reservation){
            throw boom.notFound('Reservation not found');
        }
        return reservation;
    }

    async findByCheckIn(checkIn){
        const reservation = await models.Reservation.findAll({
            where: {
                checkIn: checkIn
            }
        });
        if (!reservation){
            throw boom.notFound('Reservation not found');
        }
        return reservation;
    }

    async findByRoom(room){
        const reservation = await models.Reservation.findAll({
            where: {
                room: room
            }
        });
        if (!reservation){
            throw boom.notFound('Reservation not found');
        }
        return reservation;
    }

    async findByGuestId(guestId){
        const reservation = await models.Reservation.findAll({
            where: {
                guestId: guestId
            }
        });
        if (!reservation){
            throw boom.notFound('Reservation not found');
        }
        return reservation;
    }

    async update(id, changes){
        const reservationFound = await models.Reservation.findByPk(id);
        if(!reservationFound){
            throw boom.notFound('Reservation not found');
        }
        const response = await  models.Reservation.update(changes,{
            where:{
                id:id
            }
        });
        return response;
    }

    async delete(id){
        const reservationFound = await  models.Reservation.findByPk(id);
        if(!reservationFound){
            throw boom.notFound('Reservation not found');
        }
        await  models.Reservation.destroy();
        return {message: 'Reservation deleted'};
    }
}

module.exports = ReservationService;