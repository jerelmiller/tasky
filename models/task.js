var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '',
    required: true
  },
  body: {
    type: String,
    default: ''
  },
  done: {
    type: Boolean,
    default: false
  }
}, { strict: true });

TaskSchema.methods.finished = function() {
  return this.done;
}

var Task = mongoose.model('Task', TaskSchema);

module.exports = Task