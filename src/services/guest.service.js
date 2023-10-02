const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');


class GuestSrvice{
    constructor(){

    }

    async create(guest){
        const newGuest = await models.Guest.create({
            ...guest
        });
        return newGuest;
    }

    async find(){
        const guests = await models.Guest.findAll({
            include:['reservation']
        });
        return guests;
    }

    async findOne(id){
        const guest = await models.Guest.findByPk(id);
        if (!guest){
            throw boom.notFound('Guest not found');
        }
        return guest;
    }

    async findByEmail(email){
        const guest = await models.Guest.findOne({
            where: {
                email: email
            }
        });
        if (!guest){
            throw boom.notFound('Guest not found');
        }
        return guest;
    }

    async findByIdentification(identification){
        const guest = await models.Guest.findOne({
            where: {
                identification: identification
            }
        });
        if (!guest){
            throw boom.notFound('Guest not found');
        }
        return guest;
    }
    async findByReservationId(reservationId){
        const guest = await models.Guest.findOne({
            where: {
                reservationId: reservationId
            }
        });
        if (!guest){
            throw boom.notFound('Guest not found');
        }
        return guest;
    }

    async update(id, changes){
        const guestFound = await this.findByPk(id);
        if(!guestFound){
            throw boom.notFound('Guest not found');
        }
        const response = await guestFound.update(changes);
        return response;
    }

    async delete(id){
        const guestFound = await this.findByPk(id);
        if(!guestFound){
            throw boom.notFound('Guest not found');
        }
        await guestFound.destroy();
        return {message: 'Guest deleted'};
    }
}

module.exports = GuestSrvice;