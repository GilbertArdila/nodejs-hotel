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
            const rooms = await models.Room.findAll({
                include:['reservation']
            });
            return rooms;
        }
    
        async findOne(id){
            const room = await models.Room.findByPk(id,{
                include:['reservation']
            }
                );
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
            if (room.length < 1){
                throw boom.notFound('Sorry we could not find a room with this specific type, please check your request again');
            }
            return room;
        }

        async findByStatus(status){
            const room = await models.Room.findAll({
                where: {
                    status: status
                }
            });
            if (room.length < 1 ){
                throw boom.notFound('Sorry we could not find a room with that specific status, please check again your request');
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
                throw boom.notFound('We are sorry, could not find that number of room');
            }
            return room;
        }
    
        async update(id, changes){
            const roomFound = await models.Room.findByPk(id);
            if(!roomFound){
                throw boom.notFound('Room not found');
            }
            const response = await roomFound.update(changes);
            return response;
        }
    
        async delete(id){
            const roomFound = await models.Room.findByPk(id);
            if(!roomFound){
                throw boom.notFound('Room not found');
            }
            await roomFound.destroy();
            return {message: `The room with the id ${id} was deleted`};
        }
    }

module.exports = RoomService;