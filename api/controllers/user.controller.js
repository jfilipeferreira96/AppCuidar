const User = require("../models/user.model");
const { validationResult } = require("express-validator");
const UserMessages = require("../messages/user.messages");
const bcrypt = require("bcryptjs");

exports.get = (req, res) => {
  User.find(req.query, (error, users) => {
    if (error) throw error;

    let message = UserMessages.success.s2;

    if (users.length < 0) message = UserMessages.success.s5;

    message.body = users.length < 0 ? [] : users;
    return res.status(message.http).send(message);
  });
};

exports.getOne = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  User.findOne(
    {
      _id: req.params.id,
    },
    (error, user) => {
      if (error) throw error;
      if (!user) return res.status(UserMessages.error.e1.http).send(UserMessages.error.e1);
      let message = UserMessages.success.s2;
      message.body = user;
      return res.status(message.http).send(message);
    }
  );
};


exports.update = async (req, res) => {

  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  if (req.body.auth.password.length >= 1) {
    const rounds = bcrypt.getRounds(req.body.auth.password);
    if (isNaN(rounds)) {
      req.body.auth.password = await bcrypt.hash(req.body.auth.password, 10);
    }
  }
  req.body.auth.public_key = Math.random().toString(36).substring(2) + req.params.id;
  req.body.auth.private_key = Math.random().toString(36).substring(2) + req.params.id;

  User.findOneAndUpdate({
      _id: req.params.id
  }, {
      $set: req.body
  }, {
      new: true
  }, (error, user) => {
      if (error) throw error;
      if (!user) return res.status(UserMessages.error.e1.http).send(UserMessages.error.e1);

      let message = UserMessages.success.s1;
      message.body = user;
      return res.status(message.http).send(message);

  });

}

exports.delete = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  User.deleteOne(
    {
      _id: req.params.id,
    },
    (error, result) => {
      if (error) throw error;
      if (result.deletedCount <= 0) return res.status(UserMessages.error.e0.http).send(UserMessages.error.e0);
      return res.status(UserMessages.success.s3.http).send(UserMessages.success.s3);
    }
  );
};