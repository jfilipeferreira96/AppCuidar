const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CONFIG = require("../config/config");

const patientSchema = new Schema({
  name: String,
  birth_date: Date,
  sex: String,
  users: [
    {
      type: String,
      ref: CONFIG.mongodb.collections.user,
    },
  ],
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.patient, patientSchema);
