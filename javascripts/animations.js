window.Animations = (function() {
  var animations, noop, animateCallback;
  noop = function() {};

  iterateAnimations = function(callback, el) {
    el = el || '[data-animate]';
    $(el).each(function(index, el) {
      var $el, options;
      $el = $(el)
      options = $el.data('animate');

      callback($el, options);
    });
  };

  animations = {
    animateIn: function(callback, el) {
      callback = callback || noop;

      iterateAnimations(function($el, options) {
        options.delay = options.delay || 0;

        setTimeout(function() {
          $el.addClass('in');
          callback($el);
        }, options.delay);
      }, el);
    },
    animateOut: function(callback, el) {
      callback = callback || noop;

      iterateAnimations(function($el, options) {
        $el.removeClass('in');
      }, el);
    },
    listen: function() {
      var that = this;
      iterateAnimations(function($el, options) {
        if (options.onEvent) {
          $el.on('animateIn', function() { that.animateIn(noop, $el); });
          $el.on('animateOut', function() { that.animateOut(noop, $el); });
        }
      });
    }
  };

  return animations;
})();