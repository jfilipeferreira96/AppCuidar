const DayRecords = require("../models/dayRecords.model");
const { validationResult } = require("express-validator");
const DayRecordsMessages = require("../messages/dayRecords.messages");

exports.get = (req, res) => {
  DayRecords.find(req.query)
    .populate("comments.user", "name")
    .exec((error, dayRecords) => {
      if (error) throw error;

      let message = DayRecordsMessages.success.s2;

      if (dayRecords.length < 0) message = DayRecordsMessages.success.s5;

      message.body = dayRecords;
      return res.status(message.http).send(message);
    });
};

exports.create = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  new DayRecords({
    patient: req.body.patient,
    registryDate: req.body.registryDate,
    bath: req.body.bath,
    bloodPressure: req.body.bloodPressure,
    temperature: req.body.temperature,
    dayClassification: req.body.dayClassification,
    breakfast: req.body.breakfast,
    lunch: req.body.lunch,
    coffee: req.body.coffee,
    dinner: req.body.dinner,
    description: req.body.description,
  }).save((error, dayRecords) => {
    if (error) throw error;
    let message = DayRecordsMessages.success.s0;
    message.body = dayRecords;
    return res
      .header("location", "/dailyRecord/" + dayRecords._id)
      .status(message.http)
      .send(message);
  });
};

exports.update = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  DayRecords.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    },
    {
      new: true,
    },
    (error, dayRecords) => {
      if (error) throw error;
      if (!dayRecords) return res.status(DayRecordsMessages.error.e0.http).send(DayRecordsMessages.error.e0);

      let message = DayRecordsMessages.success.s1;
      message.body = dayRecords;
      return res.status(message.http).send(message);
    }
  );
};

exports.delete = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  DayRecords.deleteOne(
    {
      _id: req.params.id,
    },
    (error, result) => {
      if (error) throw error;
      if (result.deletedCount <= 0) return res.status(DayRecordsMessages.error.e0.http).send(DayRecordsMessages.error.e0);
      return res.status(DayRecordsMessages.success.s3.http).send(DayRecordsMessages.success.s3);
    }
  );
};

exports.getOne = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  DayRecords.findOne({
    _id: req.params.id,
  })
    .populate("comments.user", "name")
    .exec((error, dayRecords) => {
      if (error) throw error;
      if (!dayRecords) return res.status(DayRecordsMessages.error.e0.http).send(DayRecordsMessages.error.e0);
      let message = DayRecordsMessages.success.s2;
      message.body = dayRecords;
      return res.status(message.http).send(message);
    });
};

exports.activate = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  DayRecords.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        active: true,
      },
    },
    (error, result) => {
      if (error) throw error;

      if (result.n <= 0) return res.status(DayRecordsMessages.error.e0.http).send(DayRecordsMessages.error.e0);
      return res.status(DayRecordsMessages.success.s6.http).send(DayRecordsMessages.success.s6);
    }
  );
};

exports.deactivate = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  DayRecords.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        active: false,
      },
    },
    (error, result) => {
      if (error) throw error;

      if (result.n <= 0) return res.status(DayRecordsMessages.error.e0.http).send(DayRecordsMessages.error.e0);
      return res.status(DayRecordsMessages.success.s4.http).send(DayRecordsMessages.success.s4);
    }
  );
};
