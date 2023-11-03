const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const { config } = require("../config/config");
const validatorHandler = require("../middlewares/validator.handler");
const { loginSchema } = require("../schemas/login.dto");

const router = express.Router();

router.post(
  "/login",
  validatorHandler(loginSchema, "body"),
  passport.authenticate("local", { session: false }),

  async (req, res, next) => {
    try {
      //got the user from local strategy
      const user = req.user;

      //do the payload
      const payload = {
        sub: user.id,
        role: user.role,
      };

      //do token, only send rol and user´s id
      const token = jwt.sign(payload, config.jwtSecret,{expiresIn: '15m'});

      //delete data from before answer
      delete user.dataValues.createdAt;
      delete user.dataValues.updatedAt;

      //return user and token
      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

/** --------------------------- Swagger documentation --------------------------- */

/**
 * @swagger
 * components:
 *  schemas:
 *    Auth:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: user´s email adress
 *        password:
 *          type: string
 *          description: user´s password
 *      required:
 *        - email
 *        - password
 *      example:
 *        email: superadmin@gmail.com
 *        password: "123456"
 *       
 */


/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: get the user´s credentials to return a token, this will last for 15 minutes
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Auth'
 *    responses:
 *      200:
 *        description: returns the necessary acces token
 */

