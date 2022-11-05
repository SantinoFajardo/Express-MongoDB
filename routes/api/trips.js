const router = require("express").Router();
const trips = require("../../models/tripModel");
const connection = require("../../config/Database");

router.get("/", async (req, res) => {
  try {
    const response = await trips.find();
    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: error,
      msg: "Hubo un error",
    });
  }
});

router.post("/", async (req, res) => {
  const { name, description, destination, category, startDate, endDate } =
    req.body;
  try {
    const newTrip = await trips.create(req.body);
    res.json(newTrip);
  } catch (error) {
    res.status(500).json({
      error: error,
      msg: "Hubo un error",
    });
  }
});

router.put("/:tripId", async (req, res) => {
  const { tripId } = req.params;
  try {
    const tripEdit = await trips.findByIdAndUpdate(tripId, req.body, {
      new: true, // Esto hace que nos devuelva el objeto actualizado y no el viejo
    });
    res.json(tripEdit);
  } catch (error) {
    res.status(500).json({
      error: error,
      msg: "Hubo un error",
    });
  }
});

router.delete("/:tripId", async (req, res) => {
  const { tripId } = req.params;
  try {
    const response = await trips.findByIdAndDelete(tripId);
    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: error,
      msg: "Hubo un error",
    });
  }
});

module.exports = router;
