const {Strategy} = require('passport-local')
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const UserService = require('../../services/user.service')

const service = new UserService();

const localStrategy = new Strategy({
   usernameField:'email',
   passwordField:'password'
},
   async(email, password, done) => {
   try {
    //buscamos el usuario por su email
     const user = await service.findByEmail(email);
     //si no existe el usuario enviamos unauthorized
     if(!user){
        done(boom.unauthorized('wrong user or password'), false)
     }
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
      throw(boom.unauthorized('wrong user or password'));
    }
     //quitamos el password para no retornarlo
     delete user.dataValues.password;
     //si pasa las verificaciones retornamos el usuario
     done(null,user);
   } catch (error) {
    done(error, false)
   }
});

module.exports = localStrategy;