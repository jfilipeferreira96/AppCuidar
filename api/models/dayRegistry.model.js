const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const dayRegistrySchema = new Schema({
    patient: String,
    registryDate: Date,
    bath: String,
    bloodPressure: String,
    temperature: String,
    dayClassification: String,
    description: String,
    breakfast: String,
    lunch: String,
    coffee: String,
    dinner: String
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.dayRegistry, dayRegistrySchema);