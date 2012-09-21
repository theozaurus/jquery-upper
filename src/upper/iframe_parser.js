//= require jquery

// Used to parse the result loaded from the frame. This expects output
// to be in [JSend](http://labs.omniti.com/labs/jsend) format

// this module function is called with com.jivatechnology.Upper as 'this'
(function(){

  var scope = this;

  this.IFrameParser = (function(){

    // Return the constructor
    return function(response){

      var that = this;

      decoded = function(){
        var r;
        try {
          r = JSON.parse(that.response());
        } catch(e) {
          if(e instanceof SyntaxError){
            r = null;
          } else {
            throw e;
          }
        }

        decoded = function(){ return r; };
        return r;
      };

      this.response  = function(){ return response; };
      this.isSuccess = function(){ return that.status() == "success"; };
      this.isFail    = function(){ return that.status() == "fail"; };
      this.isError   = function(){ return !that.isSuccess() && !that.isFail(); };

      this.status = function(){
        var r = decoded();
        return r ? r.status : "error";
      };

      this.message = function(){
        var r = decoded();
        if(r){
          return r.message || null;
        } else {
          return jQuery(response).text();
        }
      };

      this.code = function(){
        var r = decoded();
        return r ? r.code || null : null;
      };

      this.data = function(){
        var r = decoded();
        return r ? r.data || null : null;
      };

    };


  })();

}).call(com.jivatechnology.Upper);
