'use strict';
const { ReservationSchema, RESERVATION_TABLE } = require('../models/reservation.model')
const {UserSchema, USER_TABLE} = require('../models/user.model')
const {EmployeeSchema,EMPLOYEE_TABLE} = require('../models/employee.model')
const {GuestSchema,GUEST_TABLE} = require('../models/guest.model')
const {RoomSchema,ROOM_TABLE} = require('../models/room.model')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    
      
      await queryInterface.createTable(USER_TABLE,UserSchema);
      await queryInterface.createTable(EMPLOYEE_TABLE,EmployeeSchema);
      await queryInterface.createTable(GUEST_TABLE,GuestSchema);
      await queryInterface.createTable(ROOM_TABLE,RoomSchema);
     await queryInterface.createTable(RESERVATION_TABLE,ReservationSchema);
  },

  async down (queryInterface) {
    
     await queryInterface.dropTable(RESERVATION_TABLE);
     await queryInterface.dropTable(USER_TABLE);
     await queryInterface.dropTable(EMPLOYEE_TABLE);
     await queryInterface.dropTable(GUEST_TABLE);
     await queryInterface.dropTable(ROOM_TABLE);
     
  }
};
