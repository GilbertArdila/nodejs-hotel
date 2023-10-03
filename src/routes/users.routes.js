const express = require("express");

const UserService = require("./../services/user.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  deleteUserSchema,
} = require("../schemas/user.dto");

const router = express.Router();
const service = new UserService();

//get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// get one user by id
router.get(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

//get one user by email
router.get("/email/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await service.findByEmail(email);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

//get users by role
router.get("/role/:role", async (req, res, next) => {
  try {
    const { role } = req.params;
    const users = await service.findByRole(role);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

//create a new user
router.post(
  "/",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

//update a user
router.patch(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const newDataUser = await service.update(id, body);
      res.json(newDataUser);
    } catch (error) {
      next(error);
    }
  }
);

//delete a user
router.delete(
  "/:id",
  validatorHandler(deleteUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.json(`User with id ${id} deleted`);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
