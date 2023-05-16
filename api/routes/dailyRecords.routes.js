const express = require("express");
let router = express.Router();
const DayRecordsController = require("../controllers/dailyRecords.controller");
const { body, param, sanitizeBody } = require("express-validator");
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router
  .route("/")
  .get(AuthController.checkAuth, DayRecordsController.get)
  .post(
    AuthController.checkAuth,
    [
      body("patient").isString(),
      body("dayClassification").isNumeric(),
      body("bath").isBoolean(),
      body("breakfast").isBoolean(),
      body("lunch").isBoolean(),
      body("dinner").isBoolean(),
      body("extra").isString(),
      sanitizeBody("extra").whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
    ],
    DayRecordsController.create
  );

router
  .route("/:id")
  .get(AuthController.checkAuth, [param("id").isMongoId()], DayRecordsController.getOne)
  .put(AuthController.checkAuth, [param("id").isMongoId()], DayRecordsController.update)
  .delete(AuthController.checkAuth, [param("id").isMongoId()], DayRecordsController.delete);

module.exports = router;
