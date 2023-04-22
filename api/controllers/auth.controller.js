const User = require("../models/user.model");
const { validationResult } = require("express-validator");
const AuthMessages = require("../messages/auth.messages");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const CONFIG = require("../config/config");

exports.getInfo = (req, res) => {
  let message = AuthMessages.success.s1;
  message.body = req.user;
  return res.status(message.http).send(message);
};

exports.login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  User.findOne(
    {
      "auth.email": email,
    },
    async (error, user) => {
      if (error) throw error;

      const isPasswordValid = await bcrypt.compare(password.toString(), user.auth.password.toString());

      if (!user || !isPasswordValid) {
        return res.header("Authorization", null).status(AuthMessages.error.e0.http).send(AuthMessages.error.e0);
      }

      let payload = {
        pk: user.auth.public_key,
      };

      let options = {
        expiresIn: CONFIG.auth.expiration_time,
        issuer: CONFIG.auth.issuer,
      };

      let token = JWT.sign(payload, user.auth.private_key, options);

      let message = AuthMessages.success.s0;
      message.body = user;
      return res.header("Authorization", token).status(message.http).send(message);
    }
  );
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, name, option, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      auth: {
        email: email,
        password: hashedPassword,
      },
      name: name,
      type: option.value,
    });

    return res.json({ status: true, user: { _id: user._id, email: user.auth.email, name: user.name, type: user.type } });
  } catch (ex) {
    next(ex);
  }
};

exports.checkAuth = (req, res, callback) => {
  let token = req.headers.authorization;
  if (!token) return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);

  let payload = JWT.decode(token);

  User.findOne(
    {
      "auth.public_key": payload.pk,
    },
    (error, user) => {
      if (error) throw error;
      if (!user) return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);

      JWT.verify(token, user.auth.private_key, (error) => {
        if (error) return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);

        req.user = user;
        return callback();
      });
    }
  );
};
