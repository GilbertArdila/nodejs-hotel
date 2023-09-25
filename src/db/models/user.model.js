const {Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';
const UserSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
    },
    recoveryToken: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'recovery_token'
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

class User extends Model {
    static associate() {
        
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: true
        }
    }
}

module.exports = { UserSchema, User, USER_TABLE };