var mongoose = require('mongoose');

var PhoneNumberSchema = new mongoose.Schema({
  number: {
    type: String,
    default: '',
    match: /^\d{10}$/,
    required: true
  },
}, { strict: true });

var PhoneNumber = mongoose.model('PhoneNumber', PhoneNumberSchema);

module.exports = PhoneNumber