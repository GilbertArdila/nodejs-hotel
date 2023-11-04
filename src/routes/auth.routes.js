const express = require("express");
const passport = require("passport");

const validatorHandler = require("../middlewares/validator.handler");
const { loginSchema,recoverySchema,changePasswordAuthSchema } = require("../schemas/auth");


const AuthService = require("../services/auth.service");

const router = express.Router();
const service = new AuthService();

router.post(
  "/login",
  validatorHandler(loginSchema, "body"),
  passport.authenticate("local", { session: false }),

  async (req, res, next) => {
    try {
      const user = req.user;
      
      
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post("/recovery", 
validatorHandler(recoverySchema, "body"),
async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await service.sendRecoveryPassword(email);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

router.post("/change-password",
validatorHandler(changePasswordAuthSchema, "body"),
async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const rta = await service.changePassword(token, newPassword);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

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

/**
 * @swagger
 * /api/v1/auth/change-password:
 *  post:
 *    summary: this is the endpoint to recover the password
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
 *        description: receive the token and the new password
 */

/**
 * @swagger
 * /api/v1/auth/recovery:
 *  post:
 *    summary: here you can send your email adress to recover your account password
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
 *        description: returns a link to  recover the password
 */


