beforeEach(function() {
  this.addMatchers({

    toTakeIntegerOptionFor: function(name) {
      var klass = this.actual;

      var value = 11;
      var options = {};
      options[name] = value;
      var instance = new klass(options);

      var result = instance[name]();
      return result == value;
    },

    toTakeStringOptionFor: function(name) {
      var klass = this.actual;

      var value = 'string';
      var options = {};
      options[name] = value;
      var instance = new klass(options);

      var result = instance[name]();
      return result == value;
    },

    toHaveDefaultFor: function(name, default_value){
      var klass = this.actual;

      var instance = new klass();
      var result = instance[name]();
      return result == default_value;
    },

    toBeNearEnough: function(time){
      time = time.valueOf();

      var within   = 1000; // 1 second
      var r        = this.actual.valueOf();
      var min_time = time - within;
      var max_time = time + within;

      return r >= min_time && r <= max_time;
    },

    toBeReadOnlyFor: function(name){
      var before = this.actual[name]();
      var after  = this.actual[name]("foo");
      return before == after;
    }

  });
});
