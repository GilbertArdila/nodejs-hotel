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

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        nickname:
 *          type: string
 *          description: the user nickname
 *        email:
 *          type: string
 *          description: the user mail adress
 *        password:
 *          type: string
 *          description: the user password must be maximum 8 digits
 *        role:
 *          type: string
 *          description: it could be or admin or user, it will be user by default
 *        recoveryToken:
 *          type: string
 *          description: null by default
 *      required:
 *        - nickname
 *        - email
 *        - password
 *      example:
 *        nickname: chepe
 *        email: chepe@gmail.com
 *        password: chepe123
 */


/**
 * @swagger
 * /api/v1/users:
 *  get:
 *    summary: return all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: returns all users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */

router.get("/", async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/users/{id}:
 *  get:
 *    summary: return the specific user according with the id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: user id
 *    responses:
 *      200:
 *        description: returns one user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: User not found
 */

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

/**
 * @swagger
 * /api/v1/users/email/{email}:
 *  get:
 *    summary: return the specific user according with the email
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *        required: true
 *        description: user mail
 *    responses:
 *      200:
 *        description: returns one user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: Sorry we can not find any email coincidence in our data base, please check your email again
 */
router.get("/email/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await service.findByEmail(email);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/users/role/{role}:
 *  get:
 *    summary: return the specific user according with the role
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: role
 *        schema:
 *          type: string
 *        required: true
 *        description: user role
 *    responses:
 *      200:
 *        description: returns all users with that specific role
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: Sorry we can not find any user with that specific role, please check it again
 */
router.get("/role/:role", async (req, res, next) => {
  try {
    const { role } = req.params;
    const users = await service.findByRole(role);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/users:
 *  post:
 *    summary: this is the endpoint to create a user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: returns the new user data
 */
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

/**
 * @swagger
 * /api/v1/users/{id}:
 *  patch:
 *    summary: update one speciffic user according to the id
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: user id
 *    responses:
 *      200:
 *        description: returns the user info updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: User not found
 */

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

/**
 * @swagger
 * /api/v1/users/{id}:
 *  delete:
 *    summary: delete one speciffic user according to the id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: user id
 *    responses:
 *      200:
 *        description: User with id ${id} deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: User not found
 */
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
