const express = require("express");
let router = express.Router();
const UserController = require("../controllers/user.controller");
const { body, param, sanitizeBody } = require("express-validator");
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route("/").get(AuthController.checkAuth, UserController.get);

router.route('/:id')
    .delete(AuthController.checkAuth, [param("id").isMongoId()], UserController.delete);

module.exports = router;
