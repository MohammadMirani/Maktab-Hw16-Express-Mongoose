const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const essentialSchema = {
  required: true,
  trim: true,
  lowercase: true,
  type: String,
};

const personnelSchema = new Schema({
  firstName: {
    ...essentialSchema,
  },
  lastName: {
    ...essentialSchema,
  },
  birthDate: {
    ...essentialSchema,
  },
  isManager: {
    type: Boolean,
    default: false,
  },
  nationalCode: {
    ...essentialSchema,
    unique: true,
  },
  gender: {
    ...essentialSchema,
    enum: ["male", "female", "none"],
    default: "male"
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "company",
  },
});

module.exports = mongoose.model("personnel", personnelSchema);
