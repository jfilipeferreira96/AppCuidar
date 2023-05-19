const express = require("express");
let router = express.Router();
const PatientController = require("../controllers/patient.controller");
const { body, param, sanitizeBody } = require("express-validator");
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router
  .route("/")
  .get(AuthController.checkAuth, PatientController.get)
  .post(AuthController.checkAuth, [body("name").isString(), body("birth_date").isISO8601(), body("sex").isString(), body("users.*").isMongoId()], PatientController.create);

router.route("/deactivate/:id").put(AuthController.checkAuth, [param("id").isMongoId()], PatientController.deactivate);

router.route("/activate/:id").put(AuthController.checkAuth, [param("id").isMongoId()], PatientController.activate);

router
  .route("/:id")
  .get(AuthController.checkAuth, [param("id").isMongoId()], PatientController.getOne)
  .put(AuthController.checkAuth, [param("id").isMongoId()], PatientController.update)
  .delete(AuthController.checkAuth, [param("id").isMongoId()], PatientController.delete);

router.route("/user/:userId").get(AuthController.checkAuth, [param("userId").isMongoId()], PatientController.getPatientsByUser);

module.exports = router;
