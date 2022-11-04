const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tripSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    destination: { type: String, required: true, maxLength: 20 },
    category: { type: String, enum: ["family", "friends", "work"] },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

const trips = model("trip", tripSchema);
module.exports = trips;
