const express = require("express");
const models = require("../models");

const TimeSheetController = {
  registerRouter() {
    const router = express.Router();

    router.get("/:id", this.index); // Fetch particular timesheet
    router.post("/", this.createTimeSheet); // Create a time sheet
    router.post("/:id/timeSlots", this.scheduleTimeSlot); // Create new time slot under a timesheet
    router.put("/:id/timeSlots/:timeSlotid", this.updateTimeSlot); // Update a time slot under a time sheet
    router.delete("/:id/timeSlots/:timeSlotid", this.deleteTimeSlot); // Delete a particular time slot by id

    return router;
  },
  index(req, res) {
    models.timeSheet
      .findById(req.params.id, {
        include: [
          {
            model: models.timeSlot
          }
        ]
      })
      .then(timesheet => {
        res.json(timesheet).send("Received all time slots");
      })
      .catch(() => {
        res.status(404).send("Get timesheet successfully");
      });
  },
  createTimeSheet(req, res) {
    models.timeSheet
      .create({})
      .then(timeSheet => {
        res.json(timeSheet).send("Create timessheet successfully");
      })
      .catch(err => {
        console.log(err);
        res.status(404).send("Can't create timesheet");
      });
  },
  scheduleTimeSlot(req, res) {
    models.timeSheet.findById(req.params.id).then(timeSheet => {
      models.timeSlot
        .create({
          StartTime: req.body.StartTime,
          EndTime: req.body.EndTime,
          timeSheetId: timeSheet.id
        })
        .then(timeslot => {
          res.json(timeslot).send("Create successfully");
        })
        .catch(error => {
          console.log(error);
          res.status(404);
        });
    });
  },
  updateTimeSlot(req, res) {
    models.timeSheet.findById(req.params.id).then(timeSheet => {
      models.timeSlot
        .update(
          {
            StartTime: req.body.StartTime,
            EndTime: req.body.EndTime
          },
          {
            where: {
              id: req.params.timeSlotid
            }
          }
        )
        .then(timeslot => {
          res.json(timeslot).send("Update Successfully");
        })
        .catch(() => {
          res.status(404);
        });
    });
  },
  deleteTimeSlot(req, res) {
    models.timeSheet.findById(req.params.id).then(timeSheet => {
      models.timeSlot
        .destroy({
          where: {
            id: req.params.timeSlotid
          }
        })
        .then(timeSlot => {
          res.json(timeSlot).send("Delete Successfully");
        })
        .catch(() => {
          res.status(404);
        });
    });
  }
};

module.exports = TimeSheetController.registerRouter();