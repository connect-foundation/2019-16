const mongoose = require("mongoose");
const { Schema } = mongoose;

const PartnerSchema = new Schema(
  {
    email: String,
    password: String,
    cid: String,
    name: String
  },
  {
    collection: "partner"
  }
);

const Partner = mongoose.model("Partner", PartnerSchema);

module.exports = Partner;
