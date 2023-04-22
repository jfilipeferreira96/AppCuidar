const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CONFIG = require("../config/config");

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
      min: 4,
    },
    public_key: String,
    private_key: String,
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
  this.auth.public_key = Math.random().toString(36).substring(2) + this._id;
  this.auth.private_key = Math.random().toString(36).substring(2) + this._id;

  callback();
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.user, userSchema);
