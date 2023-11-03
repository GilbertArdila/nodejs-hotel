const express = require("express");
const passport = require("passport");

const GuestService = require("../services/guest.service");
const { checkRole } = require("../middlewares/auth.handler");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createGuestSchema,
  updateGuestSchema,
  getGuestSchema,
  getGuestByEmailSchema,
  getGuestByIdentificationSchema,
  deleteGuestSchema,
} = require("../schemas/guest.dto");

const router = express.Router();
const service = new GuestService();

router.get(
  "/",
  //JWT auth
  passport.authenticate("jwt", { session: false }),
  checkRole("admin", "user"),
  async (req, res, next) => {
    try {
      const guests = await service.find();
      res.json(guests);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  //JWT auth
  passport.authenticate("jwt", { session: false }),
  checkRole("admin", "user"),
  validatorHandler(getGuestSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const guest = await service.findOne(id);
      res.json(guest);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/email/:email",
  //JWT auth
  passport.authenticate("jwt", { session: false }),
  checkRole("admin", "user"),
  validatorHandler(getGuestByEmailSchema, "params"),
  async (req, res, next) => {
    try {
      const { email } = req.params;
      const guest = await service.findByEmail(email);
      res.json(guest);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/identification/:identification",
  //WT auth
  passport.authenticate("jwt", { session: false }),
  checkRole("admin", "user"),
  validatorHandler(getGuestByIdentificationSchema, "params"),
  async (req, res, next) => {
    try {
      const { identification } = req.params;
      const guest = await service.findByIdentification(identification);
      res.json(guest);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  //JWT auth
  passport.authenticate("jwt", { session: false }),
  checkRole("admin"),
  validatorHandler(createGuestSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const guest = await service.create(body);
      res.status(201).json(guest);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  //JWT auth
  passport.authenticate("jwt", { session: false }),
  checkRole("admin"),
  validatorHandler(getGuestSchema, "params"),
  validatorHandler(updateGuestSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const guest = await service.update(id, body);
      console.log('route: ', guest)
      res.json(guest);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  //JWT auth
  passport.authenticate("jwt", { session: false }),
  checkRole("admin"),
  validatorHandler(deleteGuestSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.json(`Guest ${id} deleted`);
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
 *    Guest:
 *      type: object
 *      properties:
 *        firstName:
 *          type: string
 *          description: the guest firstName
 *        middleName:
 *          type: string
 *          description: the guest middleName
 *        lasttName:
 *          type: string
 *          description: the guest lastName
 *        motherLastName:
 *          type: string
 *          description: the guest motherLastName
 *        email:
 *          type: string
 *          description: the guest mail adress
 *        phone:
 *          type: string
 *          description: the guest phone, it must be maximun 13 digits
 *        identification:
 *          type: string
 *          description: guest identification (ID), it must be maximun 30 caracters
 *      required:
 *        - firstName
 *        - lastName
 *        - email
 *        - phone
 *        - identification
 *      example:
 *        firstName: mario
 *        lastName: menendez
 *        email: mariogmail.com
 *        phone: +513102259987
 *        identification: EC45962
 */

/**
 * @swagger
 * /api/v1/guests:
 *  get:
 *    summary: return all guests
 *    tags: [Guest]
 *    responses:
 *      200:
 *        description: returns all guests
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Guest'
 */

/**
 * @swagger
 * /api/v1/guests/{id}:
 *  get:
 *    summary: return the specific guest according with the id
 *    tags: [Guest]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: guest id
 *    responses:
 *      200:
 *        description: returns one guest
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Guest'
 *      404:
 *        description: Guest not found
 */
/**
 * @swagger
 * /api/v1/guests/email/{email}:
 *  get:
 *    summary: return the specific guest according with the email
 *    tags: [Guest]
 *    parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *        required: true
 *        description: guest mail
 *    responses:
 *      200:
 *        description: returns one guest
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Guest'
 *      404:
 *        description: Guest not found
 */
/**
 * @swagger
 * /api/v1/guests/{id}:
 *  delete:
 *    summary: delete one speciffic guest according to the id
 *    tags: [Guest]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: guest id
 *    responses:
 *      200:
 *        description: Guest deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Guest'
 *      404:
 *        description: Guest not found
 */
/**
 * @swagger
 * /api/v1/guests/identification/{identification}:
 *  get:
 *    summary: return the specific guest according with the identification
 *    tags: [Guest]
 *    parameters:
 *      - in: path
 *        name: identification
 *        schema:
 *          type: string
 *        required: true
 *        description: user role
 *    responses:
 *      200:
 *        description: returns one guest
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Guest'
 *      404:
 *        description: Guest not found
 */
/**
 * @swagger
 * /api/v1/guests/{id}:
 *  patch:
 *    summary: update one speciffic guest according to the id
 *    tags: [Guest]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Guest'
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: guest id
 *    responses:
 *      200:
 *        description: returns the guest info updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Guest'
 *      404:
 *        description: Guest not found
 */

/**
 * @swagger
 * /api/v1/users:
 *  post:
 *    summary: this is the endpoint to create a guest
 *    tags: [Guest]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Guest'
 *    responses:
 *      200:
 *        description: returns the new guest data
 */
