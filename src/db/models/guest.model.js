const {Model, DataTypes, Sequelize } = require('sequelize');

const GUEST_TABLE = 'guests';
const GuestSchema = {
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
    reservationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'reservation_id'
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

class Guest extends Model {
    //one guest has many reservations
    static associate(models) {
        this.belongsTo(models.Reservation, {foreignKey: 'reservationId', as: 'reservation'});
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: GUEST_TABLE,
            modelName: 'Guest',
            timestamps: true
        }
    }
}

module.exports = {
    GuestSchema,
    Guest,
    GUEST_TABLE
};