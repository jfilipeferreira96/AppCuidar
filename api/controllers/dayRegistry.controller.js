const DayRegistry = require('../models/dayRegistry.model');
const {
    validationResult
} = require('express-validator');
const DayRegistryMessages = require("../messages/dayRegistry.messages");

exports.get = (req, res) => {

    DayRegistry.find(req.query).populate("comments.user", "name").exec((error, dayRegistries) => {
        if (error) throw error;

        let message = DayRegistryMessages.success.s2;

        if (dayRegistries.length < 0)
            message = DayRegistryMessages.success.s5;

        message.body = dayRegistries;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new DayRegistry({
        patient: req.body.patient,
        registryDate: req.body.registryDate,
        bath: req.body.bath,
        bloodPressure: req.body.bloodPressure,
        temperature: req.body.temperature,
        dayClassification: req.body.dayClassification,
        breakfast: req.body.breakfast,
        lunch: req.body.lunch,
        coffee: req.body.coffee,
        dinner: req.body.dinner,
        description: req.body.description
    }).save((error, dayRegistry) => {
        if (error) throw error;
        let message = DayRegistryMessages.success.s0;
        message.body = dayRegistry;
        return res.header("location", "/dayRegistries/" + dayRegistry._id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    DayRegistry.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, dayRegistry) => {
        if (error) throw error;
        if (!dayRegistry) return res.status(DayRegistryMessages.error.e0.http).send(DayRegistryMessages.error.e0);

        let message = DayRegistryMessages.success.s1;
        message.body = dayRegistry;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    DayRegistry.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(DayRegistryMessages.error.e0.http).send(DayRegistryMessages.error.e0);
        return res.status(DayRegistryMessages.success.s3.http).send(DayRegistryMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    DayRegistry.findOne({
        _id: req.params.id
    }).populate("comments.user", "name").exec((error, dayRegistry) => {
        if (error) throw error;
        if (!dayRegistry) return res.status(DayRegistryMessages.error.e0.http).send(DayRegistryMessages.error.e0);
        let message = DayRegistryMessages.success.s2;
        message.body = dayRegistry;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    DayRegistry.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(DayRegistryMessages.error.e0.http).send(DayRegistryMessages.error.e0);
        return res.status(DayRegistryMessages.success.s6.http).send(DayRegistryMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    DayRegistry.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(DayRegistryMessages.error.e0.http).send(DayRegistryMessages.error.e0);
        return res.status(DayRegistryMessages.success.s4.http).send(DayRegistryMessages.success.s4);

    });
}