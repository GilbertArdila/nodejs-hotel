const express = require("express");

const GuestService = require("../services/guest.service");
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

//get all guests
router.get("/", async (req, res, next) => {
  try {
    const guests = await service.find();
    res.json(guests);
  } catch (error) {
    next(error);
  }
});

// get one guest by id
router.get(
  "/:id",
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

//get one guest by email
router.get(
  "/email/:email",

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

//get one guest by identification
router.get(
  "/identification/:identification",

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


// create a new guest
router.post(
  "/",
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

// update a guest
router.patch(
  "/:id",
  validatorHandler(getGuestSchema, "params"),
  validatorHandler(updateGuestSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const guest = await service.update(id, body);
      res.json(guest);
    } catch (error) {
      next(error);
    }
  }
);

// delete a guest
router.delete(
  "/:id",
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
