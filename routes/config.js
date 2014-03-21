module.exports = {
  Root: function(req, res) { res.render('index', { skipHeader: true }); },
  Tasks: require('./tasks'),
  PhoneNumbers: require('./phone_numbers')
};