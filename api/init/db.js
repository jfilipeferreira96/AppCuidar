module.exports = (app, callback) => {
  const CONFIG = require("../config/config");
  //Connect to DB
  const mongoose = require("mongoose");

  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);

  let settings = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  global.mongoConnection = mongoose.createConnection(CONFIG.mongodb.uri, settings, (error) => {
    if (error) throw error;
    console.log("--------------Connected to DB----------------------------");
    return callback();
  });
};
