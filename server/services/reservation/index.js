require("dotenv").config();

const { RESERVATION_NAME, RESERVATION_HOST, RESERVATION_PORT } = process.env;

const Reservation = require("./Reservation");

const reservation = new Reservation(
  RESERVATION_NAME,
  RESERVATION_HOST,
  RESERVATION_PORT
);

let tryConnect = setInterval(() => {
  connectToService.bind(reservation)("payment");
}, 1000);

async function connectToService(name) {
  try {
    let isServiceConnected = false;
    const service = await this.connectToApp(
      name,
      () => {
        isServiceConnected = true;
        console.log(`${name} service connect`);
      },
      () => {},
      () => {
        isServiceConnected = false;
        console.log(`${name} service end`);
      },
      () => {
        isServiceConnected = false;
        console.log(`${name} service error`);
      }
    );

    setInterval(() => {
      if (!isServiceConnected) {
        console.log(`try connect to ${name}`);
        service.connect();
      }
    }, 2000);

    clearInterval(tryConnect);
  } catch (e) {
    console.log(e);
  }
}

reservation.connectToAppListManager();
