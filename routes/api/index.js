//Rutas API
const router = require("express").Router();

router.use("/trips", require("./trips"));

module.exports = router;
