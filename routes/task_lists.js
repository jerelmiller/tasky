var utils = require('../lib/utils')

TaskLists = {
  Create: function(req, res) {
    res.redirect('/task_lists/' + utils.dasherize(req.body.list_name) + '/tasks');
  }
};

module.exports = TaskLists