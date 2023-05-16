module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    collections: {
      user: "users",
      patient: "patients",
      dailyRecords: "dailyRecords",
    },
  },
  auth: {
    expiration_time: 15000,
    issuer: "FCA",
  },
  sanitize: {
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzŠŒŽšœžŸ¥µÀÁÂÃÄÅÆÇÈÉÊËẼÌÍÎÏĨÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëẽìíîïĩðñòóôõöøùúûüýÿ\\ ",
    numerical: "0123456789",
  },
  email: {
    service: "Gmail",
    auth: {
      user: "mailserverpw@gmail.com",
      pass: "ttxirdxzkafhcuel",
    },
  },
};
