const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');


class RoomService{
    constructor(){
        
    }
    
        async create(room){
            const newRoom = await models.Room.create({
                ...room
            });
            return newRoom;
        }
    
        async find(){
            const rooms = await models.Room.findAll();
            return rooms;
        }
    
        async findOne(id){
            const room = await models.Room.findByPk(id);
            if (!room){
                throw boom.notFound('Room not found');
            }
            return room;
        }
        async findByType(type){
            const room = await models.Room.findAll({
                where: {
                    type: type
                }
            });
            if (!room){
                throw boom.notFound('Room not found');
            }
            return room;
        }

        async findByStatus(status){
            const room = await models.Room.findAll({
                where: {
                    status: status
                }
            });
            if (!room){
                throw boom.notFound('Room not found');
            }
            return room;
        }

        async findByNumber(number){
            const room = await models.Room.findOne({
                where: {
                    number: number
                }
            });
            if (!room){
                throw boom.notFound('Room not found');
            }
            return room;
        }
    
        async update(id, changes){
            const roomFound = await this.findByPk(id);
            if(!roomFound){
                throw boom.notFound('Room not found');
            }
            const response = await roomFound.update(changes);
            return response;
        }
    
        async delete(id){
            const roomFound = await this.findByPk(id);
            if(!roomFound){
                throw boom.notFound('Room not found');
            }
            await roomFound.destroy();
            return {message: 'Room deleted'};
        }
    }

module.exports = RoomService;