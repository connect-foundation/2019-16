const Payment = require("./Payment");

require("dotenv").config();
const { PAYMENT_NAME, PAYMENT_HOST, PAYMENT_PORT } = process.env;
const payment = new Payment(PAYMENT_NAME, PAYMENT_HOST, PAYMENT_PORT);

let tryConnect = setInterval(() => {
  connectToService.bind(payment)("reservation");
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

payment.connectToAppListManager();
