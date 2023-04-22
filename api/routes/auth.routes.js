const express = require("express");
let router = express.Router();
const AuthController = require("../controllers/auth.controller");
const { body } = require("express-validator");

router
  .route("/")
  .post([body("username").isAlphanumeric(), body("password").isString()], AuthController.login)
  .get(AuthController.checkAuth, AuthController.getInfo);

// Rota responsável por Criar um novo 'User': (POST): localhost:8000/auth/register
router.post("/register", AuthController.register);

module.exports = router;
