//= require callback

// this module function is called with com.jivatechnology.Upper as 'this'
(function(){

  var scope = this;

  var CallbackList = com.jivatechnology.CallbackList;

  this.Result = (function(){

    // Private class level objects
    var merge_options = function(obj1,obj2){
      obj1 = obj1 || {};
      obj2 = obj2 || {};
      var obj3 = {};
      for (var attr1 in obj1) {
        if( obj1.hasOwnProperty(attr1) ){ obj3[attr1] = obj1[attr1]; }
      }
      for (var attr2 in obj2) {
        if( obj2.hasOwnProperty(attr2) ){ obj3[attr2] = obj2[attr2]; }
      }
      return obj3;
    };

    var create_getter_setter = function(options,name){
      return function(){
        if( arguments.length == 1 ){
          // Setter
          options[name] = arguments[0];
          return options[name];
        } else {
          // Getter
          return options[name];
        }
      };
    };

    var i = 0;
    var generateID = function(){ return i++; };

    var metricPrefixes = ['B','KB','MB','GB','TB'];
    var humanizeSize = function(size){
      // Figure out best unit
      var base = 1024;
      var exponent = parseInt(Math.log(size) / Math.log(base),10);
      var maxExponent = metricPrefixes.length - 1;
      exponent = exponent > maxExponent ? maxExponent : exponent;

      // Round it
      var number = size / Math.pow(base,exponent);
      var decimalPlaces = 2;
      var multiplier = Math.pow(10,decimalPlaces);
      var rounded = Math.round(number * multiplier) / multiplier;

      // Stringify
      return rounded + " " + metricPrefixes[exponent];
    };

    // Return the constructor
    return function(opts){

      var that = this;

      // Private
      var defaults = {
        sizeTotal:    0,
        sizeUploaded: 0,
        state:        'started',
        createdAt:    new Date(),
        onUpdate:     []
      };

      var options = merge_options(defaults,opts);

      var id = generateID();

      // Privileged
      this.response     = create_getter_setter(options,"response");
      this.errorMessage = create_getter_setter(options,"errorMessage");
      this.createdAt    = create_getter_setter(options,"createdAt");
      this.sizeUploaded = create_getter_setter(options,"sizeUploaded");
      this.sizeTotal    = create_getter_setter(options,"sizeTotal");
      this.onUpdate     = new CallbackList(options.onUpdate, {must_keep: true});

      this.id = function(){ return id; };

      this.progress = function(){
        var v = that.sizeUploaded() / that.sizeTotal();
        v = v >= 0 ? v : 0;
        v = v <= 1 ? v : 1;
        return v;
      };

      this.humanSizeUploaded = function(){
        return humanizeSize(that.sizeUploaded());
      };

      this.humanSizeTotal = function(){
        return humanizeSize(that.sizeTotal());
      };

      this.humanProgress = function(){
        return Math.round(that.progress() * 100) + "%";
      };

      this.file = function(){
        if( arguments.length == 1 ){
          // Setter
          options.file = new scope.File(arguments[0]);
          return options.file;
        } else {
          // Getter
          return options.file;
        }
      };

      // State machine

      //// Reading state
      this.state = function(){ return options.state; };
      this.hasStarted   = function(){ return that.state() == "started";   };
      this.hasUploaded  = function(){ return that.state() == "uploaded";  };
      this.hasCompleted = function(){ return that.state() == "completed"; };
      this.hasErrored   = function(){ return that.state() == "errored";   };
      this.hasCancelled = function(){ return that.state() == "errored";   };

      this.hasEnded = function(){
        return that.hasCancelled()|| that.hasErrored() || that.hasCompleted;
      };

      //// Control state
      var setState = function(s){
        options.state = s;
        that.onUpdate.handle(that);
      };

      this.canStart = function(){ return that.hasStarted(); };
      this.uploading = function(){
        if(that.canStart()){ setState("started"); }
      };

      this.canUpload = function(){ return that.hasStarted(); };
      this.uploaded = function(){
        if(that.canUpload()){ setState("uploaded"); }
      };

      this.canComplete = function(){ return that.hasStarted()||that.hasUploaded(); };
      this.completed = function(response){
        if(that.canComplete()){
          that.response(response);
          setState("completed");
        }
      };

      this.canError = function(){ return that.hasStarted()||that.hasUploaded(); };
      this.errored = function(message){
        if(that.canError()){
          that.errorMessage(message);
          setState("errored");
        }
      };

      this.canCancel = function(){ return that.hasStarted(); };
      this.cancelled = function(){
        if(that.canCancel()){ setState("cancelled"); }
      };

    };


  })();

}).call(com.jivatechnology.Upper);
