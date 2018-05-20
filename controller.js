'use strict';
var mongoose        = require('mongoose');
const Questionnaire = mongoose.model('Questionnaire');
const logger        = require('../utils/utils').logger;

//list all questionnaire present in DB
exports.list_all_questionnaire = function (req, res) {
  Questionnaire.findOne({}, function (err, questionnaire) {
    if (err) {
      logger.error('error fetching successfully ', err);
      res.send(err);
    } else {
      logger.info('questionnaire fetched successfully');
      res.json(questionnaire);
    }
  });
};

//Create new questionnaire
exports.create = function (req, res) {
  var new_questionnaire = new Questionnaire(req.body);
  new_questionnaire.save(function (err, questionnaire) {
    if (err)
      res.send(err);
    res.json(questionnaire);
  });
};

//Get questionnaire based on _id
exports.read = function (req, res) {
  Questionnaire.findOne({ 'id': req.params.questionnaireId}, function (err, questionnaire) {
    if (err) {
      res.send(err);
    } else {
      res.json(questionnaire);
    }
  });
};

//Get questionnaire based on questionnaire id using post
exports.readByquestionnaireId = function (req, res) {
  Questionnaire.findOne({ 'id': req.body.questionnaireId }, function (err, questionnaire) {
    if (err) {
      res.send(err);
    } else {
      res.json(questionnaire);
    }
  });
};

//Update Existing questionnaire based on _id
exports.update = function (req, res) {
  Questionnaire.findOneAndUpdate({
    _id: req.params.questionnaireId
  }, req.body, {
    new: true
  }, function (err, questionnaire) {
    if (err)
      res.send(err);
    res.json(questionnaire);
  });
};

//Delete questionnaire if exists based on _id
exports.delete = function (req, res) {
  Questionnaire.remove({
    'id': req.params.questionnaireId
  }, function (err, questionnaire) {
    if (err)
      res.send(err);
    res.json({
      message: 'questionnaire successfully deleted'
    });
  });
};