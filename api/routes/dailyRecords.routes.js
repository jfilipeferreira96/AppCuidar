const express = require("express");
let router = express.Router();
const DayRecordsController = require("../controllers/dayRecords.controller");
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
      body("registryDate").isISO8601(),
      body("bath").isString(),
      body("bloodPressure").isString(),
      body("temperature").isString(),
      body("dayClassification").isString(),
      body("description").isString(),
      body("breakfast").isString(),
      body("lunch").isString(),
      body("coffee").isString(),
      body("dinner").isString(),
      sanitizeBody("description").whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
    ],
    DayRecordsController.create
  );

router
  .route("/:id")
  .get(AuthController.checkAuth, [param("id").isMongoId()], DayRecordsController.getOne)
  .put(AuthController.checkAuth, [param("id").isMongoId()], DayRecordsController.update)
  .delete(AuthController.checkAuth, [param("id").isMongoId()], DayRecordsController.delete);

module.exports = router;
