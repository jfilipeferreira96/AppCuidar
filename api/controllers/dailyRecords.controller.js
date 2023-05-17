const DailyRecords = require("../models/dailyRecords.model");
const { validationResult } = require("express-validator");
const DailyRecordsMessages = require("../messages/dailyRecords.messages");
const Patients = require("../models/patient.model");

exports.get = (req, res) => {
  DailyRecords.find()
    .populate("patient") // preenche os detalhes do paciente
    .exec((error, dailyRecords) => {
      if (error) throw error;
      console.log("teste", dailyRecords);
      let message = DailyRecordsMessages.success.s2;

      if (dailyRecords.length < 0) message = DailyRecordsMessages.success.s5;

      message.body = dailyRecords;
      return res.status(message.http).send(message);
    });
};

exports.create = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);
  console.log(req.body);
  new DailyRecords({
    patient: req.body.patient,
    registryDate: Date.now(),
    bath: req.body.bath,
    dayClassification: req.body.dayClassification,
    breakfast: req.body.breakfast,
    lunch: req.body.lunch,
    dinner: req.body.dinner,
    extra: req.body.extra,
  }).save((error, dailyRecords) => {
    if (error) throw error;
    let message = DailyRecordsMessages.success.s0;
    message.body = dailyRecords;
    return res.status(message.http).send(message);
  });
};

exports.update = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  DailyRecords.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    },
    {
      new: true,
    },
    (error, dailyRecords) => {
      if (error) throw error;
      if (!dailyRecords) return res.status(DailyRecordsMessages.error.e0.http).send(DailyRecordsMessages.error.e0);

      let message = DailyRecordsMessages.success.s1;
      message.body = dailyRecords;
      return res.status(message.http).send(message);
    }
  );
};

exports.delete = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  DailyRecords.deleteOne(
    {
      _id: req.params.id,
    },
    (error, result) => {
      if (error) throw error;
      if (result.deletedCount <= 0) return res.status(DailyRecordsMessages.error.e0.http).send(DailyRecordsMessages.error.e0);
      return res.status(DailyRecordsMessages.success.s3.http).send(DailyRecordsMessages.success.s3);
    }
  );
};

exports.getOne = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  DailyRecords.findOne({
    _id: req.params.id,
  })
    .populate("comments.user", "name")
    .exec((error, dailyRecords) => {
      if (error) throw error;
      if (!dailyRecords) return res.status(DailyRecordsMessages.error.e0.http).send(DailyRecordsMessages.error.e0);
      let message = DailyRecordsMessages.success.s2;
      message.body = dailyRecords;
      return res.status(message.http).send(message);
    });
};

exports.activate = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  DailyRecords.updateOne(
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

      if (result.n <= 0) return res.status(DailyRecordsMessages.error.e0.http).send(DailyRecordsMessages.error.e0);
      return res.status(DailyRecordsMessages.success.s6.http).send(DailyRecordsMessages.success.s6);
    }
  );
};

exports.deactivate = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  DailyRecords.updateOne(
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

      if (result.n <= 0) return res.status(DailyRecordsMessages.error.e0.http).send(DailyRecordsMessages.error.e0);
      return res.status(DailyRecordsMessages.success.s4.http).send(DailyRecordsMessages.success.s4);
    }
  );
};
