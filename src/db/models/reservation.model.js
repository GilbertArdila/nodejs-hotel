const {Model, DataTypes} = require('sequelize');
const {GUEST_TABLE} = require('./guest.model')
const {ROOM_TABLE} = require('./room.model')

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
        field: 'room_id',
        references:{
            model:ROOM_TABLE,
            key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete:'SET NULL'
    },
    guestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'guest_id',
        references:{
            model:GUEST_TABLE,
            key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete:'SET NULL'
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
    //one reservation has one guests
    static associate(models) {
        this.belongsTo(models.Room, { as: 'room'});
        this.belongsTo(models.Guest, { as: 'guest'});
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
