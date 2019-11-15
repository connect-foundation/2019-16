const mongoose = require("mongoose");
const { Schema } = mongoose;

const PartnerSchema = new Schema(
  {
    email: String,
    password: String,
    cid: String,
    name: String
  },
  { collection: "info" }
);

const Partner = mongoose.model("partners", PartnerSchema);

module.exports = Partner;
