var PhoneNumber = require('../models/phone_number');

module.exports = {
  Index: function(req, res) {
    res.render('phone_numbers/index', { skipHeader: true });
  },

  Create: function(req, res) {
    new PhoneNumber(req.body).save(function(err, task) {
      if (err) {
        console.log(err);
        res.redirect('/phone_numbers');
      } else {
        res.redirect('/tasks');
      }
    });
  }
}