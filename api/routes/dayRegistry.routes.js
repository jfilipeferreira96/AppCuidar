const express = require('express');
let router = express.Router();
const DayRegistryController = require('../controllers/dayRegistry.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, DayRegistryController.get)
    .post(AuthController.checkAuth, [
        body('patient').isString(),
        body('registryDate').isISO8601(),
        body('bath').isString(),
        body('bloodPressure').isString(),
        body('temperature').isString(),
        body('dayClassification').isString(),
        body('description').isString(),
        body('breakfast').isString(),
        body('lunch').isString(),
        body('coffee').isString(),
        body('dinner').isString(),
        sanitizeBody('description').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], DayRegistryController.create);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], DayRegistryController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], DayRegistryController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], DayRegistryController.delete);

module.exports = router;