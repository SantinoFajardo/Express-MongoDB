require("dotenv").config();
const { MONGODB_URI } = process.env;
const mongoose = require("mongoose");
const Trip = require("../models/tripModel");

(async () => {
  await mongoose.connect(`${MONGODB_URI}`);

  const newTrip = await Trip.create({
    name: "Prueba de viaje",
    description: "Prueba descripcion",
    destination: "Cordoba",
    category: "friends",
    startDate: "2022-05-02",
  });
  console.log(newTrip);
})();
