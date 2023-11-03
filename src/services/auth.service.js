const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');


const {models} = require('../libs/sequelize');

class AuthService{

constructor(){}

async findByEmail(email){
    const user = await models.User.findOne({
        where: {
            email: email
        }
    });
    if(!user){
        throw boom.notFound('wrong user or password');
    }
    
    return user;
}

}

module.exports = AuthService;