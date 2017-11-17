const request = require("supertest");
const app = require("../../app");

describe("Test the garage GET ALL path", () => {
  test("It should response the GET ALL method", () => {
    return request(app)
      .get("/garages")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("Test the garage GET ONE path", () => {
  test("It should response the GET ONE method", () => {
    let id = 7;
    return request(app)
      .get("/garages/" + id)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("Test the garage CREATE path", () => {
  test("It should response the CREATE ONE method", () => {
    return request(app)
      .post("/garages")
      .send(
        JSON.stringify({
          Address: "1720 79th Street, Brooklyn, NY, 11214",
          Renting_Price: 5.25,
          Size: "90 x 90"
        })
      )
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("Test the geolocation path", () => {
  test("It should response the latitude and longtitude", () => {
    return request(app)
      .post("/garages/geolocation")
      .send(
        JSON.stringify({
          zip: "11220"
        })
      )
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("Test the garage PUT path", () => {
  test("It should response the PUT ONE method", () => {
    return request(app)
      .put("/garages")
      .send(
        JSON.stringify({
          Address: "hehe",
          Renting_Price: 5.255,
          Size: "car"
        })
      )
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("Test the garage DELETE path", () => {
  test("It should response the DELETE one method", () => {
    let id = 6;
    beforeEach(() => {
      request
        .post(app)
        .send(
          JSON.stringify({
            Address: "4921 8th Avenue 11220",
            Renting_Price: 305.9,
            Size: "car"
          })
        )
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
    return request(app)
      .delete("/garages/" + id)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});
