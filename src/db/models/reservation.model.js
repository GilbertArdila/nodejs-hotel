const {Model, DataTypes, Sequelize } = require('sequelize');

const RESERVATION_TABLE = 'reservations';
const ReservationSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    checkIn: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'check_in'
    },
    checkOut: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'check_out'
    },
    roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'room_id'
    },
    guestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'guest_id'
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        field: 'total_amount'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at'
    }
};

class Reservation extends Model {
    //one reservation has one room
    //one reservation has many guests
    static associate(models) {
        this.belongsTo(models.Room, {foreignKey: 'roomId', as: 'room'});
        this.hasMany(models.Guest, {foreignKey: 'guestId', as: 'guests'});
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: RESERVATION_TABLE,
            modelName: 'Reservation',
            timestamps: true
        }
    }
}

module.exports = {
    ReservationSchema,
    Reservation,
    RESERVATION_TABLE
};
