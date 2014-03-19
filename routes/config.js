Routes = {};
Routes.Root = function(req, res) {
  res.render('index', { skipHeader: true });
};
Routes.Tasks = require('./tasks');

module.exports = Routes;