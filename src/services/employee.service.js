const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class EmployeeService{
    constructor(){

    }

    async create(employee){
        const newEmployee = await models.Employee.create({
            ...employee
        });
        return newEmployee;
    }

    async find(){
        const employees = await models.Employee.findAll();
        return employees;
    }

    async findOne(id){
        const employee = await models.Employee.findByPk(id);
        if (!employee){
            throw boom.notFound('Employee not found');
        }
        return employee;
    }

    async findByEmail(email){
        const employee = await models.Employee.findOne({
            where: {
                email: email
            }
        });
        if (!employee){
            throw boom.notFound('We can not find any email coincidence, please try again or check your email info');
        }
        return employee;
    }

    async findByIdentification(identification){
        const employee = await models.Employee.findOne({
            where: {
                identification: identification
            }
        });
        if (!employee){
            throw boom.notFound('Employee not found');
        }
        return employee;
    }

    async findByStatus(status){
        const employee = await models.Employee.findAll({
            where: {
                status: status
            }
        });
        if (employee.length <1){
            throw boom.notFound('Sorry, we can not find any employee with that specific status, please check the sended information');
        }
        return employee;
    }

    async update(id, employee){
        const actualEmployee = await models.Employee.findByPk(id)
        if(!actualEmployee){
            throw boom.notFound('Sorry, we can not find any employee with that specific id, please check the sended information');
        }
        const updateEmployee = await models.Employee.update(employee,{
            where: {
                id: id
            }
        });
        return updateEmployee;
    }

    async delete(id){
        const employee = await models.Employee.findByPk(id);
        if(!employee){
            throw boom.notFound('Sorry, we can not find any employee with that specific id, please check the sended information');
        }
         await models.Employee.destroy({
            where: {
                id: id
            }
        });
        
        return id;
    }
}

module.exports = EmployeeService;