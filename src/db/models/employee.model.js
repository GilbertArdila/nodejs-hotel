const {Model, DataTypes, Sequelize } = require('sequelize');

const EMPLOYEE_TABLE = 'employees';
const EmployeeSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name'
    },
    middleName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'middle_name'
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
    },
    motherLastName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'mother_last_name'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    identification: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: 'updated_at'
    }
};

class Employee extends Model {
    static associate() {
        
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: EMPLOYEE_TABLE,
            modelName: 'Employee',
            timestamps: true
        }
    }
}

module.exports = { EmployeeSchema, Employee, EMPLOYEE_TABLE };