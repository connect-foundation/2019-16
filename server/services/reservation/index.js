require("dotenv").config();

const { RESERVATION_NAME, RESERVATION_HOST, RESERVATION_PORT } = process.env;

const Reservation = require("./Reservation");

const reservation = new Reservation(
  RESERVATION_NAME,
  RESERVATION_HOST,
  RESERVATION_PORT
);

reservation.connectToAppListManager();
