Routes = {};
Routes.Root = function(req, res) {
  res.render('index', { skipHeader: true });
};
Routes.Tasks = require('./tasks');
Routes.PhoneNumbers = require('./phone_numbers');

module.exports = Routes;