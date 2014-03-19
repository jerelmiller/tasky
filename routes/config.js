Routes = {};
Routes.Root = function(req, res) {
  res.render('index', { skipHeader: true });
};
Routes.TaskList = require('./task_lists');
Routes.Tasks = require('./tasks');

module.exports = Routes;