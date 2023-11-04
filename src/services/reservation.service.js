const boom = require("@hapi/boom");
const cron = require('node-cron');


const { models } = require("../libs/sequelize");
const { compareDates, isCheckInToday } = require("../helpers/verifyData");

class ReservationService {
  constructor() {}

  async create(reservation) {
    const { roomId } = reservation;
    const { checkIn, checkOut } = reservation;

    const room = await models.Room.findByPk(roomId);

    if (!room) {
      throw new Error("Room not found");
    }
    //checking if the room' status is available
    if (room.status !== "available") {
      throw new Error("This room is not available now");
    }

    //checking if the checkIn is not later than checkOut
    if (!compareDates(checkIn, checkOut)) {
      throw boom.badRequest(
        "Check-in date cannot be later than check-out date"
      );
    }

    //checking if the reservation day is today
    if (isCheckInToday(checkIn)) {
      await room.update({ status: "occupied" });
    }

    
// checking if checkout date is as current day to change the status of room to maintenace and if maintenace status was set more tha 24 horas ago it chsnge to available
cron.schedule('0 15 * * *', async () => {
  const currentDate = new Date();

  // find all reservations whit checkout date is equal as today
  const reservations = await models.Reservation.findAll({
    where: {
      checkOut: currentDate,
    },
  });

  for (const reservation of reservations) {
    const room = await models.Room.findByPk(reservation.roomId);

    if (!room) {
      console.log("Room not found for reservation");
      continue;
    }

    // change the status to "maintenance"
    await room.update({ status: "maintenance" });
  }

  // find all rooms with "maintenance" status
  const maintenanceRooms = await models.Room.findAll({
    where: {
      status: "maintenance",
    },
  });

  for (const room of maintenanceRooms) {
    // if it is older than  24 hours since  "maintenance" status was set
    const maintenanceStartTime = new Date(room.updatedAt);
    maintenanceStartTime.setHours(maintenanceStartTime.getHours() + 24);

    if (currentDate >= maintenanceStartTime) {
      // change it to "available"
      await room.update({ status: "available" });
    }
  }
});

    

    const newReservation = await models.Reservation.create({
      ...reservation,
    });
    return newReservation;
  }

  async find() {
    const reservations = await models.Reservation.findAll({
      include: ["room", "guest"],
    });
    return reservations;
  }

  async findOne(id) {
    const reservation = await models.Reservation.findByPk(id);
    if (!reservation) {
      throw boom.notFound("Reservation id not found");
    }
    return reservation;
  }

  async findByCheckIn(checkIn) {
    const reservation = await models.Reservation.findAll({
      where: {
        checkIn: checkIn,
      },
    });
    if (!reservation) {
      throw boom.notFound("Sorry, we could not find any reservation´s coincidence");
    }
    return reservation;
  }

  async findByRoom(roomId) {
    const reservation = await models.Reservation.findAll({
      where: {
        roomId: roomId,
      },
    });
    if (!reservation) {
      throw boom.notFound("Sorry we could not find any reservation linked to that room");
    }
    return reservation;
  }

  async findByGuestId(guestId) {
    const reservation = await models.Reservation.findAll({
      include: ["room", "guest"],
      where: {
        guestId: guestId,
      },
    });
    if (!reservation) {
      throw boom.notFound("Sorry we could not find any reservation linked to that gest");
    }
    return reservation;
  }

  async update(id, changes) {
    const reservationFound = await models.Reservation.findByPk(id);
    if (!reservationFound) {
      throw boom.notFound("Reservation not found");
    }
    const response = await models.Reservation.update(changes, {
      where: {
        id: id,
      },
    });
    return response;
  }

  async delete(id) {
    const reservationFound = await models.Reservation.findByPk(id);
    if (!reservationFound) {
      throw boom.notFound("Reservation not found");
    }
    await reservationFound.destroy();
    return { message: "Reservation deleted" };
  }
}

module.exports = ReservationService;
