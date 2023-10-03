const express = require("express");

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

//get all reservations
router.get("/", async (req, res, next) => {
  try {
    const reservations = await service.find();
    res.json(reservations);
  } catch (error) {
    next(error);
  }
});

// get one reservation by id
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

//get one reservation by checkIn
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

//get one reservation by room
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

//get one reservation by guestId
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

//create a new reservation
router.post(
  "/",
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

//update a reservation
router.put(
  "/:id",
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

//delete a reservation
router.delete(
  "/:id",
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
