const boom = require('@hapi/boom');

function checkRole(req, res, next){
    console.log(req.user);
    const user = req.user;
    if(user.role === 'admin'){
        next();
    }else{
        next(boom.unauthorized('you deon not have the authorized role to do this action'))
    }
}
    
    module.exports = {checkRole}