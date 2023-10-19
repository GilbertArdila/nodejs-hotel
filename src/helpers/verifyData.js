function compareDates(checkIn, checkOut) {
  const checkInDate = new Date(`20${checkIn}`); // Convert checkIn to a Date object
  const checkOutDate = new Date(`20${checkOut}`); // Convert checkOut to a Date object

  if (checkInDate > checkOutDate) {
    return false;
  }

  return true; // Check-in is before or on the same day as check-out
}

function isCheckInToday(checkIn) {
  const today = new Date(); // getting actual date

  // split  check-in in month, year, day
  const checkInParts = checkIn.split("-");
  const checkInMonth = parseInt(checkInParts[0], 10) - 1; // Resta 1 al mes, ya que en JavaScript los meses son 0-indexados
  const checkInDay = parseInt(checkInParts[1], 10);
  const checkInYear = parseInt(`20${checkInParts[2]}`, 10);

  // Crear un objeto Date para la fecha de check-in
  const checkInDate = new Date(checkInYear, checkInMonth, checkInDay);

  // comparing dates
  return (
    checkInDate.getFullYear() === today.getFullYear() &&
    checkInDate.getMonth() === today.getMonth() &&
    checkInDate.getDate() === today.getDate()
  );
}
module.exports = { compareDates, isCheckInToday };
