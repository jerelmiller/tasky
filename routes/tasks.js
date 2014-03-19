var Task = require('../models/task');

module.exports = {
  Index: function(req, res) {
    Task.find({}, function(err, tasks) {
      res.render('tasks/index', {
        listName: 'Jerels List',
        tasks: tasks || []
      });
    });
  },

  Create: function(req, res) {
    new Task(req.body).save(function(err, task) {
      res.redirect('/tasks');
    });
  },

  Update: function(req, res) {
    Task.update({ _id: req.params.id }, req.body, { multi: false }, function(err, count) {
      res.status(200).json({ count: count });
    });
  },

  Finish: function(req, res) {
    Task.update({ _id: req.params.id }, { done: true }, { multi: false }, function(err, task) {
      if (err) {
        res.send(422);
      } else {
        res.send(200);
      }
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