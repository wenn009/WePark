const request = require("supertest");
const app = require("../../app");

describe("Test the user GET ALL path", () => {
  test("It should response the GET ALL method", () => {
    return request(app)
      .get("/user")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("Test the user GET ONE path", () => {
  test("It should repsonse the GET ONE method", () => {
    let id = 1;
    beforeEach(() => {
      request(app)
        .post("/user")
        .send(
          JSON.stringify({
            FirstName: "Xiaowen",
            LastName: "Huang",
            UserType: "owner",
            PhoneNumber: "9172378273",
            Address: "4921 8th Avenue 11220",
            email: "nimei@gmail.com"
          })
        );
    });
    return request(app)
      .get("/user/" + id)
      .then(response => {
        expect(response.statusCodee).toBe(200);
      });
  });
});

describe("Test the user CREATE ONE path", () => {
  test("It should response the POST ONE method", () => {
    return request(app)
      .post("/user")
      .send(
        JSON.stringify({
          FirstName: "Xiaowen",
          LastName: "Huang",
          UserType: "owner",
          PhoneNumber: "9172378273",
          Address: "4921 8th Avenue 11220",
          email: "nimei@gmail.com"
        })
      )
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("Test the user UPDATE ONE path", () => {
  test("It should response the PUT ONE method", () => {
    let id = 1;
    return request(app)
      .put("/user/" + id)
      .send(
        JSON.stringify({
          FirstName: "HEHE",
          LastName: "HAHA",
          UserType: "other",
          PhoneNumber: "9173473473",
          Address: "5720 7th Avenue 11220",
          email: "hehehe@gmail.com"
        })
      )
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});
