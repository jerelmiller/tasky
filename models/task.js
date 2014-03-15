var utils = require('../lib/utils');

var Task = function(name, body) {
  this.attributes = {
    name: name,
    body: body,
    done: false
  }
}

Task.prototype.get = function(attribute) {
  return this.attributes[attribute];
}

Task.prototype.set = function(attribute, value) {
  this.attributes[attribute] = value;
}

Task.prototype.finishTask = function() {
  this.set('done', true);
}

Task.prototype.finished = function() {
  return this.get('done');
}

Task.prototype.toJSON = function() {
  return utils.extend({}, this.attributes);
}

module.exports = Task