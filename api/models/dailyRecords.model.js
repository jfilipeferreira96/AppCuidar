const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CONFIG = require("../config/config");

const dayRecordsSchema = new Schema({
  patient: String,
  registryDate: Date,
  bath: Boolean,
  lunch: Boolean,
  coffee: Boolean,
  dinner: Boolean,
  dayClassification: Number,
  extra: String,
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.dayRecords, dayRecordsSchema);
