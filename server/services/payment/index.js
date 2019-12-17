const path = require("path");
const Payment = require("./Payment");

require("dotenv").config({ path: path.join(__dirname, "/../../.env") });
const { PAYMENT_NAME, PAYMENT_HOST, PAYMENT_PORT } = process.env;
const payment = new Payment(PAYMENT_NAME, PAYMENT_HOST, PAYMENT_PORT);

payment.connectToAppListManager();
