const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CONFIG = require("../config/config");

const dailyRecordsSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: CONFIG.mongodb.collections.patient, // referência para a coleção patients
  },
  registryDate: Date,
  bath: Boolean,
  lunch: Boolean,
  coffee: Boolean,
  dinner: Boolean,
  dayClassification: Number,
  extra: String,
  caretaker: String,
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.dailyRecords, dailyRecordsSchema);
