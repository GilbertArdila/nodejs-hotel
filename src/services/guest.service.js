const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');


class GuestService{
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
        const guest = await models.Guest.findByPk(id,{
            include:['reservation']
        });
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
            throw boom.notFound('Guest not found, Please check the email information');
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
            throw boom.notFound('Please check the identification, we could not find any coincidence');
        }
        return guest;
    }
    

    async update(id, changes){
        const guestFound = await models.Guest.findByPk(id);
        if(!guestFound){
            throw boom.notFound('Guest not found');
        }
        const response = await  models.Guest.update(changes,{
            where:{
                id:id
            }
        });
        console.log(response)
        return response;
    }

    async delete(id){
        const guestFound = await models.Guest.findByPk(id);
        if(!guestFound){
            throw boom.notFound('Guest not found');
        }
        await guestFound.destroy();
        return {message: `The guest with id ${id} was deleted`};
    }
}

module.exports = GuestService;