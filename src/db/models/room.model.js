const {Model , DataTypes, Sequelize} = require('sequelize');

const ROOM_TABLE = 'rooms';
const RoomSchema = {    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    type: {
        type: DataTypes.ENUM('single', 'double', 'triple',  'suite'),
        defaultValue: 'single'  
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('available', 'occupied', 'maintenance'),
        defaultValue: 'available'
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

class Room extends Model {
    //one room has many reservations
    
    static associate(models) {
        this.hasMany(models.Reservation, {foreignKey: 'roomId', as: 'reservation'});
        
    }
    


    static config(sequelize) {
        return {
            sequelize,
            tableName: ROOM_TABLE,
            modelName: 'Room',
            timestamps: true
        }
    }
}

module.exports = {
    RoomSchema,
    Room,
    ROOM_TABLE
};
