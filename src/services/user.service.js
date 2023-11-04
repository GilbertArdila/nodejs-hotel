const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');


const {models} = require('../libs/sequelize');


class UserService{
  constructor(){
    
  }

    async create(user){
        //encript the password
        const hashedPassword = await bcrypt.hash(user.password, 10);

        //update the password information
        const newUser = await models.User.create({
            ...user,
            password: hashedPassword
        });
        //delete the password before the answer
        delete newUser.dataValues.password;
        return newUser;
    }

    async find(){
        const users = await models.User.findAll();

        users.forEach(user =>{
            delete user.dataValues.password;
        })
        return users;
    }

    async findByEmail(email){
        const user = await models.User.findOne({
            where: {
                email: email
            }
        });
        if(!user){
            throw boom.notFound('sorry, please check your email again, we could not find any coincidence');
        }
        
        return user;
    }

    async findByRole(role){
        const users = await models.User.findAll({
            where: {
                role: role
            }
        });
        if(!users){
            throw boom.notFound('Sorry we could not find any user with that specific role, please check it again');
        }
        users.forEach(user =>{
            delete user.dataValues.password;
        })
        return users;
    }

    async findOne(id){
        const user = await models.User.findByPk(id);
        if (!user){
            throw boom.notFound('User not found');
        }
        delete user.dataValues.password;
        return user;
    }

    async update(id, changes){
        const userFound = await models.User.findByPk(id);
       
        if(!userFound){
            throw boom.notFound('User not found');
        }
        // if password exist, encript it
        if(changes.password){
            const hashedPassword = await bcrypt.hash(changes.password, 10);
            changes.password = hashedPassword;
        }
        
        
        const response = await userFound.update(changes);
        
        
         
        return response;
        
       
    }

    async delete(id){
        const userFound = await models.User.findByPk(id);
        if(!userFound){
            throw boom.notFound('User not found');
        }
        await userFound.destroy();
        return {message: `User with id ${id} deleted`};
    }

}

module.exports = UserService;