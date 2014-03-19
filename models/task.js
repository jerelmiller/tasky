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
  },
  taskList: {
    type: ObjectId,
    ref: 'TaskList'
  }
}, { strict: true });

TaskSchema.methods.finished = function() {
  return this.done;
}

var Task = mongoose.model('Task', TaskSchema);
Task.schema.path('title').validate(function(value) { return String(value).length > 0; }, 'Title must not be blank');

module.exports = Task

// var utils = require('../lib/utils');

// var Task = function(name, body) {
//   this.attributes = {
//     name: name,
//     body: body,
//     done: false
//   }
// }

// Task.prototype.get = function(attribute) {
//   return this.attributes[attribute];
// }

// Task.prototype.set = function(attribute, value) {
//   this.attributes[attribute] = value;
// }

// Task.prototype.finishTask = function() {
//   this.set('done', true);
// }

// Task.prototype.finished = function() {
//   return this.get('done');
// }

// Task.prototype.toJSON = function() {
//   return utils.extend({}, this.attributes);
// }

// module.exports = Task