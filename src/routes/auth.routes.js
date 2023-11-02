const express = require("express");
const passport = require('passport');
const jwt = require('jsonwebtoken');

const {config} = require('../config/config'); 
const validatorHandler = require("../middlewares/validator.handler");
const {loginSchema} = require('../schemas/login.dto');

const router = express.Router();



router.post('/login',
validatorHandler(loginSchema, "body"),
passport.authenticate('local',{session:false}),

async(req, res, next) => {
    try {
        //recuperamos el usuario del request desde el local strategy
        const user = req.user

        //creamos el payload
        const payload ={
           sub: user.id,
           role:user.role
        }

        //creamos el token en el cual por seguridad solo enviamos el rol y el id del usuario
        const token = jwt.sign(payload,config.jwtSecret)

        //borramos estos datos de la respuesta
        delete user.dataValues.createdAt
        delete user.dataValues.updatedAt

        //retornamos el ususario y el token
        res.json(
            {user,
             token
            }
        )
    } catch (error) {
        next(error)
    }
})


module.exports = router;