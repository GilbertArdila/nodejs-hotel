const express = require("express");
const passport = require("passport");

const RoomService = require("../services/room.service");
const { checkRole } = require("../middlewares/auth.handler");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createRoomSchema,
  updateRoomSchema,
  getRoomSchema,
  getRoomByTypeSchema,
  getRoomByStatusSchema,
  getRoomByNumberSchema,
  deleteRoomSchema,
} = require("../schemas/room.dto");

const router = express.Router();
const service = new RoomService();

router.get(
  "/",
  //protegemos la ruta con JWT auth
  passport.authenticate("jwt", { session: false }),
  checkRole("admin", "user"),
  async (req, res, next) => {
    try {
      const rooms = await service.find();
      res.json(rooms);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  //protegemos la ruta con JWT auth
  passport.authenticate("jwt", { session: false }),
  checkRole("admin", "user"),
  validatorHandler(getRoomSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const room = await service.findOne(id);
      res.json(room);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/type/:type",
  //protegemos la ruta con JWT auth
  passport.authenticate("jwt", { session: false }),
  checkRole("admin", "user"),
  validatorHandler(getRoomByTypeSchema, "params"),
  async (req, res, next) => {
    try {
      const { type } = req.params;
      const room = await service.findByType(type);
      res.json(room);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/status/:status",
  //protegemos la ruta con JWT auth
  passport.authenticate("jwt", { session: false }),
  checkRole("admin", "user"),
  validatorHandler(getRoomByStatusSchema, "params"),
  async (req, res, next) => {
    try {
      const { status } = req.params;
      const room = await service.findByStatus(status);
      res.json(room);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/number/:number",
  //protegemos la ruta con JWT auth
  passport.authenticate("jwt", { session: false }),
  checkRole("admin", "user"),
  validatorHandler(getRoomByNumberSchema, "params"),
  async (req, res, next) => {
    try {
      const { number } = req.params;
      const room = await service.findByNumber(number);
      res.json(room);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  //protegemos la ruta con JWT auth
  passport.authenticate("jwt", { session: false }),
  checkRole("admin"),
  validatorHandler(createRoomSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRoom = await service.create(body);
      res.status(201).json(newRoom);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  //protegemos la ruta con JWT auth
  passport.authenticate("jwt", { session: false }),
  checkRole("admin"),
  validatorHandler(getRoomSchema, "params"),
  validatorHandler(updateRoomSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const room = await service.update(id, body);
      res.json(room);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  //protegemos la ruta con JWT auth
  passport.authenticate("jwt", { session: false }),
  checkRole("admin"),
  validatorHandler(deleteRoomSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const room = await service.delete(id);
      res.json(room);
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
 *    Room:
 *      type: object
 *      properties:
 *        number:
 *          type: integer
 *          description: the number of the room
 *        type:
 *          type: string
 *          description: the room type could be single, double, triple or  suite
 *        price:
 *          type: decimal
 *          description: the price of the room for each night
 *        status:
 *          type: string
 *          description: the actual room status could available, occupied or maintenance
 *      required:
 *        - number
 *        - type
 *        - price
 *      example:
 *        number: 1001
 *        type: triple
 *        price: 26.53
 */

/**
 * @swagger
 * /api/v1/rooms:
 *  get:
 *    summary: return all rooms
 *    tags: [Room]
 *    responses:
 *      200:
 *        description: returns all rooms
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Room'
 */

/**
 * @swagger
 * /api/v1/rooms/{id}:
 *  get:
 *    summary: return one specific room according with the id
 *    tags: [Room]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: room id
 *    responses:
 *      200:
 *        description: returns one room
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Room'
 *      404:
 *        description: Room not found
 */
/**
 * @swagger
 * /api/v1/rooms/type/{type}:
 *  get:
 *    summary: return the rooms  with the speciffic type
 *    tags: [Room]
 *    parameters:
 *      - in: path
 *        name: type
 *        schema:
 *          type: string
 *        required: true
 *        description: room type
 *    responses:
 *      200:
 *        description: returns a list of rooms
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Room'
 *      404:
 *        description: Sorry we can not find a room with this specific type, please check your request again
 */
/**
 * @swagger
 * /api/v1/rooms/{id}:
 *  delete:
 *    summary: delete one speciffic room according to the id
 *    tags: [Room]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: room id
 *    responses:
 *      200:
 *        description: Room deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Room'
 *      404:
 *        description: Room not found
 */
/**
 * @swagger
 * /api/v1/rooms/status/{status}:
 *  get:
 *    summary: return a list of rooms according with the status
 *    tags: [Room]
 *    parameters:
 *      - in: path
 *        name: status
 *        schema:
 *          type: string
 *        required: true
 *        description: room status
 *    responses:
 *      200:
 *        description: returns all the rooms with that specific status
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Room'
 *      404:
 *        description: Sorry we can not find a room with that specific status, please check again your request
 */
/**
 * @swagger
 * /api/v1/rooms/number/{number}:
 *  get:
 *    summary: return a rooms according with the number
 *    tags: [Room]
 *    parameters:
 *      - in: path
 *        name: number
 *        schema:
 *          type: integer
 *        required: true
 *        description: room number
 *    responses:
 *      200:
 *        description: returns one the rooms with the number received
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Room'
 *      404:
 *        description: We are sorry, can not find that number of room
 */

/**
 * @swagger
 * /api/v1/rooms/{id}:
 *  patch:
 *    summary: update one speciffic room according to the id
 *    tags: [Room]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Room'
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: room id
 *    responses:
 *      200:
 *        description: returns the room info updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Room'
 *      404:
 *        description: Room not found
 */

/**
 * @swagger
 * /api/v1/rooms:
 *  post:
 *    summary: this is the endpoint to create a room
 *    tags: [Room]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Room'
 *    responses:
 *      200:
 *        description: returns the new room data
 */
