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
  CONFIG.mongodb.uri, settings;
  global.mongoConnection = mongoose.createConnection(CONFIG.mongodb.uri, settings, (error) => {
    if (error) console.log("Not Connected to Database ERROR! ", error);

    console.log("---------------------------- Connected to DB ----------------------------");
    return callback();
  });
};
