const express = require("express");
const passport = require('passport');
const validatorHandler = require("../middlewares/validator.handler");
const {loginSchema} = require('../schemas/login.dto');

const router = express.Router();



router.post('/login',
validatorHandler(loginSchema, "body"),
passport.authenticate('local',{session:false}),

async(req, res, next) => {
    try {
        res.json(req.user)
    } catch (error) {
        next(error)
    }
})


module.exports = router;