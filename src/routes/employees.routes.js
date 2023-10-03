const express = require("express");

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

//get all employees
router.get("/", async (req, res, next) => {
  try {
    const employees = await service.find();
    res.json(employees);
  } catch (error) {
    next(error);
  }
});

// get one employee by id
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

//get one employee by email
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

//get one employee by identification
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

//get one employee by status
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

//create one employee
router.post(
  "/",
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

//update one employee
router.patch(
  "/:id",
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

//delete one employee
router.delete(
  "/:id",
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
