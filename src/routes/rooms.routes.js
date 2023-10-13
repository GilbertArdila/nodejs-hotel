const express = require("express");

const RoomService = require("../services/room.service");
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

//get all rooms
router.get("/", async (req, res, next) => {
  try {
    const rooms = await service.find();
    res.json(rooms);
  } catch (error) {
    next(error);
  }
});

// get one room by id
router.get(
  "/:id",
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

//get one room by type
router.get(
  "/type/:type",
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

//get one room by status
router.get(
  "/status/:status",
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
//get one room by number
router.get(
  "/number/:number",
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

//create a new room
router.post(
  "/",
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

//update a room
router.patch(
  "/:id",
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

//delete a room
router.delete(
  "/:id",
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
