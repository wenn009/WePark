const request = require("supertest");
const app = require("../../app");

describe("Test GET TIMESHEET path", () => {
    test("It should response the GET ONE method", () => {
        let id = 1;
        return request(app)
          .get("/timesheet" + id)
          .then(response => {
            expect(response.statusCode).toBe(200);
          });
      });
})


describe("Test CREATE TIMESHEET path", () => {
    test("It should response the CREATE TIMESHEET method", () => {
        let garageId = 1;
        return request(app).post("/timesheet" + garageId).then(response => {
            expect(response.statusCode).toBe(200);
        })
    })
})


describe("Test CREATE TIMESLOT path", () => {
    test("It should response the CREATE TIMESLOT method", () => {
        let timesheetId = 1;
        return request(app).post("/timesheet" + timesheetId + "/timeSlots")
        .send(JSON.stringify({
            StartTime: "",
            EndTime: ""
        }))
        .then(response => {
            expect(response.statusCode).toBe(200);
        })
    })
})


describe("Test UPDATE TIMESLOT path", () => {
    test("It should response the UPDATE TIMESLOT method", () => {
        let timesheetId = 1;
        let timeSlotId = 1;
        return request(app).put("/timesheet" + timesheetId + "/timeSlots/" + timeSlotId)
        .send(JSON.stringify({
            StartTime: "",
            EndTime: ""
        }))
        .then(response => {
            expect(response.statusCode).toBe(200);
        })
    })
})


describe("Test DELETE TIMESLOT path", () => {
    test("It should response the DELETE TIMESLOT method", () => {
        let timesheetId = 1;
        let timeSlotId = 1;
        return request(app).delete("/timesheet" + timesheetId + "/timeSlots" + timeSlotId)
        .then(response => {
            expect(response.statusCode).toBe(200);
        })
    })
})


describe("Test DELETE TIMESHEET path", () => {
    test("It should response the DELETE TIMESHEET method", () => {
        let timesheetId = 2;
        return request(app).delete("/timesheet" + timesheetId)
        .then(response => {
            expect(response.statusCode).toBe(200);
        })
    })
})