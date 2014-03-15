var utils = require('../lib/utils')
var Task = require('../models/task')

var tasks = [
  new Task('Clean the house', "It's a mess!"),
  new Task('Wash car', 'Too dirty'),
  new Task('Watch a movie', 'An old classic perhaps?')
]

tasks[1].finishTask()

Tasks = {
  Index: function(req, res) {
    theTasks = tasks.map(function(task) { return task.toJSON() });
    res.render('tasks/index', {
      listName: utils.titleize(req.params.name),
      tasks: theTasks
    });
  }
};

module.exports = Tasks;