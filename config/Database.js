require("dotenv").config();
const { MONGODB_URI } = process.env;
const mongoose = require("mongoose");

const connection = (async () => {
  await mongoose.connect(`${MONGODB_URI}`);
})();

module.exports = connection;
