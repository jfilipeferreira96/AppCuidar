const Patient = require("../models/patient.model");
const { validationResult } = require("express-validator");
const PatientMessages = require("../messages/patient.messages");

exports.get = (req, res) => {
  Patient.find(req.query)
    .populate("users")
    .exec((error, patients) => {
      if (error) throw error;
      let message = PatientMessages.success.s2;

      if (patients.length < 0) message = PatientMessages.success.s5;

      message.body = patients;
      return res.status(message.http).send(message);
    });
};

exports.create = (req, res) => {
  const errors = validationResult(req).array();

  if (errors.length > 0) return res.status(406).send(errors);

  new Patient({
    name: req.body.name,
    birth_date: req.body.birth_date,
    sex: req.body.sex,
    users: req.body.users,
  }).save((error, patient) => {
    if (error) throw error;
    patient.populate("users", (error) => {
      if (error) throw error;
      let message = PatientMessages.success.s0;
      message.body = patient;
      return res
        .header("location", "/patients/" + patient._id)
        .status(message.http)
        .send(message);
    });
  });
};

exports.update = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Patient.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    },
    {
      new: true,
    },
    (error, patient) => {
      if (error) throw error;
      if (!patient) return res.status(PatientMessages.error.e0.http).send(PatientMessages.error.e0);
      patient.populate("users", (error) => {
        if (error) throw error;
        let message = PatientMessages.success.s1;
        message.body = patient;
        return res.status(message.http).send(message);
      });
    }
  );
};

exports.delete = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Patient.deleteOne(
    {
      _id: req.params.id,
    },
    (error, result) => {
      if (error) throw error;
      if (result.deletedCount <= 0) return res.status(PatientMessages.error.e0.http).send(PatientMessages.error.e0);
      return res.status(PatientMessages.success.s3.http).send(PatientMessages.success.s3);
    }
  );
};

exports.getOne = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Patient.findOne({
    _id: req.params.id,
  })
    .populate("users")
    .exec((error, patient) => {
      if (error) throw error;
      if (!patient) return res.status(PatientMessages.error.e0.http).send(PatientMessages.error.e0);
      let message = PatientMessages.success.s2;
      message.body = patient;
      return res.status(message.http).send(message);
    });
};

exports.activate = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Patient.updateOne(
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

      if (result.n <= 0) return res.status(PatientMessages.error.e0.http).send(PatientMessages.error.e0);
      return res.status(PatientMessages.success.s6.http).send(PatientMessages.success.s6);
    }
  );
};

exports.deactivate = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Patient.updateOne(
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

      if (result.n <= 0) return res.status(PatientMessages.error.e0.http).send(PatientMessages.error.e0);
      return res.status(PatientMessages.success.s4.http).send(PatientMessages.success.s4);
    }
  );
};
