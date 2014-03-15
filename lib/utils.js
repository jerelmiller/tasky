Utils = (function() {
  utils = {
    dasherize: function(str) {
      return str.trim().replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
    },

    titleize: function(str) {
      if (str == null) {
        return '';
      }
      str = String(str).toLowerCase();
      return str.replace(/-/g, ' ').replace(/(?:^|\s|-)\S/g, function(c) { return c.toUpperCase(); });
    },

    extend: function(obj) {
      args = Array.prototype.slice.call(arguments, 1)
      args.forEach(function(source) {
        if (source) {
          for (var prop in source) {
            obj[prop] = source[prop];
          }
        }
      });
      return obj;
    }
  }

  return utils;
})();

module.exports = Utils