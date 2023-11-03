const {Strategy} = require('passport-local')
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');


const AuthService = require('../../services/auth.service')

const service = new AuthService();

const localStrategy = new Strategy({
   usernameField:'email',
   passwordField:'password'
},
   async(email, password, done) => {
   try {
    
     const user = await service.findByEmail(email);
    
     if(!user){
        done(boom.unauthorized(), false);
     }
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
      throw(boom.unauthorized('wrong user or password'));
    }
     
     delete user.dataValues.password;
     
     done(null,user);
   } catch (error) {
    done(error, false);
   }
});

module.exports = localStrategy;