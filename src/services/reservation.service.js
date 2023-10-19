const boom = require("@hapi/boom");
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
      throw boom.notFound("Reservation not found");
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
      throw boom.notFound("Reservation not found");
    }
    return reservation;
  }

  async findByRoom(room) {
    const reservation = await models.Reservation.findAll({
      where: {
        room: room,
      },
    });
    if (!reservation) {
      throw boom.notFound("Reservation not found");
    }
    return reservation;
  }

  async findByGuestId(guestId) {
    const reservation = await models.Reservation.findAll({
      where: {
        guestId: guestId,
      },
    });
    if (!reservation) {
      throw boom.notFound("Reservation not found");
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
