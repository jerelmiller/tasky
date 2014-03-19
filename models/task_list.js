var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskListSchema = new Schema({
  name: {
    type: String,
    default: ''
  }
}, { strict: true });

var TaskList = mongoose.model('TaskList', TaskListSchema);

module.exports = TaskList