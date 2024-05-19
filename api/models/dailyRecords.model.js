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
  breakfast: Boolean,
  dinner: Boolean,
  bathStatus: String,
  mealDinner: String,
  mealLunch: String,
  mealBreakfast: String,
  toilet: String,
  medicines: [{
    medicamento: {type: String},
    horario: {type: String},
  }],
  physicalActivity: String,
  weight: String,
  glucose: String,
  bloodPreassure: String,
  heartRate: String,
  respiratoryRate: String,
  dayClassification: Number,
  extra: String,
  caretaker: String,
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.dailyRecords, dailyRecordsSchema);
