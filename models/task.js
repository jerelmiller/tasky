var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var TaskSchema = new Schema({
  title: {
    type: String,
    default: ''
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
Task.schema.path('title').validate(function(value) { return String(value).length > 0; }, 'Title must not be blank');

module.exports = Task