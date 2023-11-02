const express = require("express");
const passport = require("passport");

const ReservationService = require("../services/reservation.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createReservationSchema,
  updateReservationSchema,
  getReservationSchema,
  getReservationByCheckInSchema,
  getReservationByRoomSchema,
  getReservationByGuestIdSchema,
  deleteReservationSchema,
} = require("../schemas/reservation.dto");

const router = express.Router();
const service = new ReservationService();

router.get("/", async (req, res, next) => {
  try {
    const reservations = await service.find();
    res.json(reservations);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getReservationSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const reservation = await service.findOne(id);
      res.json(reservation);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * this param must be like 12-25-03
 */
router.get(
  "/checkIn/:checkIn",
  validatorHandler(getReservationByCheckInSchema, "params"),
  async (req, res, next) => {
    try {
      const { checkIn } = req.params;
      const reservation = await service.findByCheckIn(checkIn);
      res.json(reservation);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/room/:room",
  validatorHandler(getReservationByRoomSchema, "params"),
  async (req, res, next) => {
    try {
      const { room } = req.params;
      const reservation = await service.findByRoom(room);
      res.json(reservation);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/guestId/:guestId",
  validatorHandler(getReservationByGuestIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { guestId } = req.params;
      const reservation = await service.findByGuestId(guestId);
      res.json(reservation);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  //protegemos la ruta con JWT auth
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createReservationSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newReservation = await service.create(body);
      res.status(201).json(newReservation);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  //protegemos la ruta con JWT auth
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getReservationSchema, "params"),
  validatorHandler(updateReservationSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const reservation = await service.update(id, body);
      res.json(reservation);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  //protegemos la ruta con JWT auth
  passport.authenticate("jwt", { session: false }),
  validatorHandler(deleteReservationSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.json(`Reservation ${id} deleted`);
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
 *    Reservation:
 *      type: object
 *      properties:
 *        checkIn:
 *          type: date
 *          description: the reservation checkIn date
 *        checkOut:
 *          type: date
 *          description: the reservation checkOut date
 *        roomId:
 *          type: integer
 *          description: the reservation's room id
 *        guestId:
 *          type: integer
 *          description: the reservation's guest id
 *        totalAmount:
 *          type: integer
 *          description: it os the reservation total amount
 *      required:
 *        - checkIn
 *        - checkOut
 *        - roomId
 *        - guestId
 *        - totalAmount
 *      example:
 *        checkIn: 01-15-2023
 *        checkOut: 01-17-2023
 *        roomId: 1001
 *        guestId: 10
 *        totalAmount: 65
 */

/**
 * @swagger
 * /api/v1/reservations:
 *  get:
 *    summary: return all reservations with guest and room information
 *    tags: [Reservation]
 *    responses:
 *      200:
 *        description: returns all reservations
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Reservation'
 */

/**
 * @swagger
 * /api/v1/reservations/{id}:
 *  get:
 *    summary: return the specific reservation according with the id
 *    tags: [Reservation]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: reservation id
 *    responses:
 *      200:
 *        description: returns one reservation
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Reservation'
 *      404:
 *        description: Reservation not found
 */
/**
 * @swagger
 * /api/v1/users/checkin/{checkIn}:
 *  get:
 *    summary: return a list of reservations with that checkIn date
 *    tags: [Reservation]
 *    parameters:
 *      - in: path
 *        name: checkIn
 *        schema:
 *          type: date
 *        required: true
 *        description: Reservation checkIn date
 *    responses:
 *      200:
 *        description: returns a list of reservations
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Reservation'
 *      404:
 *        description: Reservation not found
 */
/**
 * @swagger
 * /api/v1/reservations/{id}:
 *  delete:
 *    summary: delete one speciffic reservation according to the id
 *    tags: [Reservation]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Reservation id
 *    responses:
 *      200:
 *        description: Reservation deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Reservation'
 *      404:
 *        description: Reservation not found
 */
/**
 * @swagger
 * /api/v1/reservations/room/{room}:
 *  get:
 *    summary: return all the reservations with a speciffic room, this endpoint gets a room id
 *    tags: [Reservation]
 *    parameters:
 *      - in: path
 *        name: room
 *        schema:
 *          type: integer
 *        required: true
 *        description: room id
 *    responses:
 *      200:
 *        description: returns all the reservations found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Reservation'
 *      404:
 *        description: Sorry we can not found any reservation linked to that room
 */
/**
 * @swagger
 * /api/v1/reservations/guestId/{guestId}:
 *  get:
 *    summary: return all the reservations linked with a speciffic gest
 *    tags: [Reservation]
 *    parameters:
 *      - in: path
 *        name: guestId
 *        schema:
 *          type: integer
 *        required: true
 *        description: this is the guest id
 *    responses:
 *      200:
 *        description: returns all the reservations found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Reservation'
 *      404:
 *        description: Sorry we can not found any reservation linked to that guest
 */

/**
 * @swagger
 * /api/v1/reservations/{id}:
 *  patch:
 *    summary: update one speciffic reservation according to the id
 *    tags: [Reservation]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Reservation'
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: reservation id
 *    responses:
 *      200:
 *        description: returns the reservation info updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Reservation'
 *      404:
 *        description: reservation not found
 */

/**
 * @swagger
 * /api/v1/reservations:
 *  post:
 *    summary: this is the endpoint to create a reservation
 *    tags: [Reservation]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Reservation'
 *    responses:
 *      200:
 *        description: returns the new reservation data
 */
