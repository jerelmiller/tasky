var Task = require('../models/task');
var PhoneNumber = require('../models/phone_number');
var api = require('../lib/api');
var twilio = require('twilio')(api.twilio.accountSid, api.twilio.authToken);

exports.index = function (req, res) {
  filter = req.query.q ? { title: new RegExp(req.query.q, 'i') } : {}

  Task.find(filters).sort('-_id').exec(function(err, tasks) {
    res.render('tasks/index', {
      tasks: tasks || [],
      query: req.query.q
    });
  });
};

module.exports = {
  Index: function(req, res) {
    filters = {}
    if (req.query.q) filters = { title: new RegExp(req.query.q, 'i') }
    Task.find(filters).sort('-_id').exec(function(err, tasks) {
      res.render('tasks/index', {
        tasks: tasks || [],
        query: req.query.q
      });
    });
  },

  Create: function(req, res) {
    new Task(req.body).save(function(err, task) {
      if (err) {
        res.json(400, err);
      } else {
        res.json(task);
      }
    });
  },

  Update: function(req, res) {
    Task.update({ _id: req.params.id }, req.body, { multi: false }, function(err, count) {
      res.status(200).json({ count: count });
    });
  },

  Finish: function(req, res) {
    PhoneNumber.findOne({}).sort('-_id').exec(function(err, phoneNumber) {
      Task.findById(req.params.id, function(err, task) {
        twilio.sendMessage({
          to: '+1' + phoneNumber.number,
          from: api.twilio.from,
          body: '"' + task.title + '" task has been marked as done'
        }, function(err, responseData) {
          if (err) {
            console.log(err);
          }
        });
      });
    })

    Task.update({ _id: req.params.id }, { done: true }, { multi: false }, function(err, task) {
      res.send(200);
    });
  },

  Unfinish: function(req, res) {
    Task.update({ _id: req.params.id }, { done: false }, { multi: false }, function(err, task) {
      res.send(200);
    });
  },

  Destroy: function(req, res) {
    Task.remove({ _id: req.params.id }, function(err, count) {
      res.send(200);
    });
  }
}