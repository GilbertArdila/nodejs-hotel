const { RoomSchema, Room } = require("./room.model");
const { UserSchema, User } = require("./user.model");
const { ReservationSchema, Reservation } = require("./reservation.model");
const { GuestSchema, Guest } = require("./guest.model");
const { EmployeeSchema, Employee } = require("./employee.model");

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Employee.init(EmployeeSchema, Employee.config(sequelize));
  Room.init(RoomSchema, Room.config(sequelize));
  Reservation.init(ReservationSchema, Reservation.config(sequelize));
  Guest.init(GuestSchema, Guest.config(sequelize));

  //ejecutando las relaciones
  Room.associate(sequelize.models);
  Guest.associate(sequelize.models);
  Reservation.associate(sequelize.models);
}

module.exports =  setupModels ;