require("dotenv").config();
const { MONGODB_URI } = process.env;
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const trips = require("../../models/tripModel");

describe("Pruebas sobre la API rest de trips", () => {
  beforeAll(async () => {
    await mongoose.connect(`${MONGODB_URI}`);
  }); // Antes de todas las pruebas se conectara a la base de datos de mongodb.

  afterAll(async () => {
    await mongoose.disconnect();
  }); // Despues de todas las pruebas se desconectara a las base de datos de mongodb.
  describe("GET api/trips", () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get("/api/trips").send();
    }); // Esta funcion se va a ejecutar antes de los it's
    it("La ruta funciona", async () => {
      expect(response.status).toBe(200); // Me tiene que devolver un status 200
      expect(response.headers["content-type"]).toContain("json"); // Me tiene que devolver una respuesta tipo JSON
    });

    it("La peticion devuelve un arreglo de viajes", async () => {
      expect(response.body).toBeInstanceOf(Array); // Response me devuelve un arreglo
    });
  });

  describe("POST api/trips", () => {
    const newTrip = {
      name: "Test Trip",
      destination: "Mar del Plata",
      category: "family",
      startDate: "2022-07-09",
    };
    const wrongTrip = {
      nombre: "Test Trip",
    };

    afterAll(async () => {
      await trips.deleteMany({ name: "Test Trip" });
    });

    it("La ruta funciona", async () => {
      const response = await request(app).post("/api/trips").send(newTrip);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("Se inserta correctamente", async () => {
      const response = await request(app).post("/api/trips").send(newTrip);

      expect(response.body._id).toBeDefined();
      expect(response.body.name).toBe(newTrip.name);
    });

    it("Error en la insercion", async () => {
      const response = await request(app).post("/api/trips").send(wrongTrip);

      expect(response.status).toBe(500);
      expect(response.body.error).toBeDefined();
    });
  });

  describe("PUT /api/trips", () => {
    let trip;
    beforeEach(async () => {
      trip = await trips.create({
        name: "Test Trip",
        destination: "Mar del Plata",
        category: "family",
        startDate: "2022-07-09",
      });
    });

    afterEach(async () => {
      await trips.findByIdAndDelete(trip._id);
    });

    it("La ruta funciona", async () => {
      const response = await request(app).put(`/api/trips/${trip._id}`).send({
        name: "Trip updated",
      });

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("Se actualiza correctamente", async () => {
      const response = await request(app).put(`/api/trips/${trip._id}`).send({
        name: "Trip updated",
      });

      expect(response.body.name).toBe("Trip updated");
      expect(response.body._id).toBeDefined();
    });
  });

  describe("DELETE /api/trips", () => {
    let trip;
    let response;
    beforeEach(async () => {
      trip = await trips.create({
        name: "Test Trip",
        destination: "Mar del Plata",
        category: "family",
        startDate: "2022-07-09",
      });
      response = await request(app).delete(`/api/trips/${trip._id}`).send();
    });
    it("La ruta funciona", () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });
    it("Borra correctamente", async () => {
      expect(response.body._id).toBeDefined();

      const founfTrip = await trips.findById(trip._id);
      expect(founfTrip).toBeNull();
    });
  });
});
