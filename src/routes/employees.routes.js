const express = require("express");
const passport = require("passport");

const EmployeeService = require("../services/employee.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createEmployeeSchema,
  updateEmployeeSchema,
  getEmployeeSchema,
  getEmployeeByEmailSchema,
  getEmployeeByIdentificationSchema,
  getEmployeeByStatusSchema,
  deleteEmployeeSchema,
} = require("../schemas/employee.dto");

const router = express.Router();
const service = new EmployeeService();


router.get("/", async (req, res, next) => {
  try {
    const employees = await service.find();
    res.json(employees);
  } catch (error) {
    next(error);
  }
});


router.get(
  "/:id",
  validatorHandler(getEmployeeSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const employee = await service.findOne(id);
      res.json(employee);
    } catch (error) {
      next(error);
    }
  }
);


router.get(
  "/email/:email",
  validatorHandler(getEmployeeByEmailSchema, "params"),
  async (req, res, next) => {
    try {
      const { email } = req.params;
      const employee = await service.findByEmail(email);
      res.json(employee);
    } catch (error) {
      next(error);
    }
  }
);


router.get(
  "/identification/:identification",
  validatorHandler(getEmployeeByIdentificationSchema, "params"),
  async (req, res, next) => {
    try {
      const { identification } = req.params;
      const employee = await service.findByIdentification(identification);
      res.json(employee);
    } catch (error) {
      next(error);
    }
  }
);


router.get(
  "/status/:status",
  validatorHandler(getEmployeeByStatusSchema, "params"),
  async (req, res, next) => {
    try {
      const { status } = req.params;
      const employee = await service.findByStatus(status);
      res.json(employee);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  //protegemos la ruta con JWT auth
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createEmployeeSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newEmployee = await service.create(body);
      res.status(201).json(newEmployee);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  //protegemos la ruta con JWT auth
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getEmployeeSchema, "params"),
  validatorHandler(updateEmployeeSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const employee = await service.update(id, body);
      res.json(employee);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  //protegemos la ruta con JWT auth
  passport.authenticate("jwt", { session: false }),
  validatorHandler(deleteEmployeeSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.json(`Employee ${id} deleted`);
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
 *    Employee:
 *      type: object
 *      properties:
 *        firstName:
 *          type: string
 *          description: the Employee firstName
 *        middleName:
 *          type: string
 *          description: the Employee middleName
 *        lasttName:
 *          type: string
 *          description: the Employee lastName
 *        motherLastName:
 *          type: string
 *          description: the Employee motherLastName
 *        email:
 *          type: string
 *          description: the Employee mail adress
 *        phone:
 *          type: string
 *          description: the Employee phone, it must be maximun 13 digits
 *        identification:
 *          type: string
 *          description: Employee identification (ID), it must be maximun 30 caracters
 *        status:
 *          type: string
 *          description: the employee status could be active or inactive, by deafult it is active
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
 * /api/v1/employees:
 *  get:
 *    summary: return all employees
 *    tags: [Employee]
 *    responses:
 *      200:
 *        description: returns all employees
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Employee'
 */

/**
 * @swagger
 * /api/v1/employees/{id}:
 *  get:
 *    summary: return one specific employee according with the id
 *    tags: [Employee]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: employee id
 *    responses:
 *      200:
 *        description: returns one employee
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Employee'
 *      404:
 *        description: Employee not found
 */
/**
 * @swagger
 * /api/v1/employees/email/{email}:
 *  get:
 *    summary: return the specific Employee according with the email
 *    tags: [Employee]
 *    parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *        required: true
 *        description: Employee mail
 *    responses:
 *      200:
 *        description: returns one Employee
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Employee'
 *      404:
 *        description: We can not find any email coincidence, please try again or check your email info
 */
/**
 * @swagger
 * /api/v1/employees/{id}:
 *  delete:
 *    summary: delete one speciffic Employee according to the id
 *    tags: [Employee]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Employee id
 *    responses:
 *      200:
 *        description: Employee deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Employee'
 *      404:
 *        description: Employee not found
 */
/**
 * @swagger
 * /api/v1/employees/identification/{identification}:
 *  get:
 *    summary: return the specific Employee according with the identification
 *    tags: [Employee]
 *    parameters:
 *      - in: path
 *        name: identification
 *        schema:
 *          type: string
 *        required: true
 *        description: employee identification
 *    responses:
 *      200:
 *        description: returns one Employee
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Employee'
 *      404:
 *        description: Employee not found
 */
/**
 * /**
 * @swagger
 * /api/v1/employees/status/{status}:
 *  get:
 *    summary: return a list of Employees according with the status
 *    tags: [Employee]
 *    parameters:
 *      - in: path
 *        name: status
 *        schema:
 *          type: string
 *        required: true
 *        description: employee status
 *    responses:
 *      200:
 *        description: returns a list of Employees
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Employee'
 *      404:
 *        description: Sorry, we can not find any employee with that specific status, please check the sended information
 */
/**
 * @swagger
 * /api/v1/employees/{id}:
 *  patch:
 *    summary: update one speciffic Employee according to the id
 *    tags: [Employee]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Employee'
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Employee id
 *    responses:
 *      200:
 *        description: returns the Employee info updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Employee'
 *      404:
 *        description: Employee not found
 */

/**
 * @swagger
 * /api/v1/employees:
 *  post:
 *    summary: this is the endpoint to create an Employee
 *    tags: [Employee]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Employee'
 *    responses:
 *      200:
 *        description: returns the new Employee data
 */
