const mongoose = require("mongoose");
const { Schema } = mongoose;

const PartnerSchema = new Schema({
  email: String,
  password: String,
  cid: String,
  name: String
});

const Partner = mongoose.model("info", PartnerSchema);

module.exports = Partner;
