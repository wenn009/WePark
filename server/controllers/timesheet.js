const express = require("express");
const models = require("../models");

const TimeSheetController = {
  registerRouter() {
    const router = express.Router();

    router.get("/:id", this.index); // Fetch particular timesheet
    router.post("/:id/timeSlots", this.scheduleTimeSlot); // Create new time slot under a timesheet
    router.put("/:id/timeSlots", this.updateTimeSlot);  // Update a time slot under a time sheet
    router.delete("/:id/timeSlots", this.deleteTimeSlot); // Delete a particular time slot by id

    return router;
  },
  index(req, res) {
    models.timeSheet.findById(req.params.id),
      {
        include: [
          {
            model: models.timeSlot
          }
        ]
      }
        .then(timesheet => {
          res.json(timesheet).send("Received all time slots");
        })
        .catch(() => {
          res.status(404).send("Get timesheet successfully");
        });
  },
  scheduleTimeSlot(req, res) {
    models.timeSheet
      .findById(req.params.id)
      .then(() => {
        models.timeSlot.create({
          StartTime: req.body.StartTime,
          EndTime: req.body.EndTime
        });
      })
      .then(timeslot => {
        res.json(timeslot).send("Create successfully");
      })
      .catch(error => {
        res.status(404).send("Can't create");
      });
  },
  updateTimeSlot(req, res) {
    models.timeSheet
      .findById(req.params.id)
      .then(timeslot => {
        models.timeSlot.update(
          {
            StartTime: req.body.StartTime,
            EndTime: req.body.EndTime
          },
          {
            where: {
              id: req.params.id
            }
          }
        );
      })
      .then(timeslot => {
        res.json(timeslot).send("Update Successfully");
      })
      .catch(() => {
        res.status(404).send("Can't update");
      });
  },
  deleteTimeSlot(req, res) {
    models.timeSheet.findById(req.params.id).then(timeSlot => {
      models.timeSheet
        .destroy({
          where: {
            id: timeSlot.id
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
