var mongoose = require('mongoose');
var TaskList = require('../models/task_list');

var TaskLists = {
  Create: function(req, res) {
    taskList = new TaskList({ name: req.body.list_name });
    taskList.save(function() {
      res.redirect('/task_lists/' + taskList.id + '/tasks');
    });

  }
};

module.exports = TaskLists