const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class UserService{
  constructor(){
    
  }

    async create(user){
        const hashedPassword = await bcrypt.hash(user.password, 10);

        
        const newUser = await models.User.create({
            ...user,
            password: hashedPassword
        });
        delete newUser.dataValues.password;
        return newUser;
    }

    async find(){
        const users = await models.User.findAll();
        return users;
    }

    async findByEmail(email){
        const user = await models.User.findOne({
            where: {
                email: email
            }
        });
        return user;
    }

    async findByRole(role){
        const users = await models.User.findAll({
            where: {
                role: role
            }
        });
        return users;
    }

    async findOne(id){
        const user = await models.User.findByPk(id);
        if (!user){
            throw boom.notFound('User not found');
        }
        return user;
    }

    async update(id, changes){
        const userFound = await this.findByPk(id);
        if(!userFound){
            throw boom.notFound('User not found');
        }
        const response = await userFound.update(changes);
        return response;
        
       
    }

    async delete(id){
        const userFound = await this.findByPk(id);
        if(!userFound){
            throw boom.notFound('User not found');
        }
        await userFound.destroy();
        return {message: `User with id ${id} deleted`};
    }

}

module.exports = UserService;