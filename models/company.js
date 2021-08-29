const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const essentialSchema = {
  required: true,
  trim: true,
  lowercase: true,
  type: String,
};

const companySchema = new Schema({
  name: {
    ...essentialSchema,
    unique: true,
  },
  registrationId: {
    ...essentialSchema,
    unique: true,
  },
  city: {
    ...essentialSchema,
  },
  state: {
    ...essentialSchema,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  phoneNumber: {
    ...essentialSchema,
  },
  staffs: {
    ...essentialSchema,
    default: "null"
  }
});

module.exports = mongoose.model("company", companySchema);
