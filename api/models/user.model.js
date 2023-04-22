const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CONFIG = require("../config/config");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: String,
  type: String,
  auth: {
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
  },
  registration_date: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre("save", function (callback) {
  this.auth.password = bcrypt.hashSync(escape(this.auth.password), bcrypt.genSaltSync(2));

  callback();
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.user, userSchema);
